import sys
from pathlib import Path

_backend_dir = Path(__file__).resolve().parent
_project_root = _backend_dir.parent
for _p in [str(_project_root), str(_backend_dir)]:
    if _p not in sys.path:
        sys.path.insert(0, _p)

import asyncio
import logging
import time
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from sqlalchemy import text
from backend.config import settings

logger = logging.getLogger("doableforge.keepalive")
if not logger.handlers:
    logging.basicConfig(level=logging.INFO)

class KeepAliveManager:
    """
    Manages automated self-pinging keep-alive cycles to prevent Render free-tier
    services from spinning down during inactive periods, and tracks system health metrics.
    """

    def __init__(self):
        self.start_time: float = time.time()
        self.ping_count: int = 0
        self.successful_pings: int = 0
        self.failed_pings: int = 0
        self.last_ping_time: Optional[str] = None
        self.last_status_code: Optional[int] = None
        self.last_error: Optional[str] = None
        self.is_running: bool = False
        self._task: Optional[asyncio.Task] = None

    def start(self):
        """Start the background keep-alive loop if enabled."""
        if not settings.ENABLE_KEEP_ALIVE:
            logger.info("[KEEP-ALIVE] Keep-alive worker is disabled by configuration.")
            return

        if self.is_running:
            return

        self.is_running = True
        self._task = asyncio.create_task(self._run_loop())
        logger.info(
            f"[KEEP-ALIVE] Service initiated. Interval: {settings.KEEP_ALIVE_INTERVAL}s. "
            f"Target: {settings.SELF_PING_URL}"
        )

    async def stop(self):
        """Gracefully stop the background keep-alive loop."""
        self.is_running = False
        if self._task and not self._task.done():
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass
        logger.info("[KEEP-ALIVE] Service cleanly stopped.")

    async def _run_loop(self):
        """Asynchronous execution loop pinging the health endpoint."""
        # Initial grace period: wait 3 seconds for uvicorn server socket bind
        await asyncio.sleep(3)

        # Lazy import of httpx
        try:
            import httpx
        except ImportError:
            logger.error("[KEEP-ALIVE] httpx is not installed. Keep-alive worker cannot run.")
            return

        while self.is_running:
            target_url = settings.SELF_PING_URL
            try:
                # Use a lightweight GET request with short timeout and custom header
                async with httpx.AsyncClient(timeout=5.0, verify=False) as client:
                    headers = {
                        "User-Agent": "DoableForge-KeepAlive/1.0",
                        "X-Keep-Alive-Ping": "true"
                    }
                    resp = await client.get(target_url, headers=headers)
                    self.last_status_code = resp.status_code
                    self.last_ping_time = datetime.now(timezone.utc).isoformat()
                    self.ping_count += 1

                    if resp.status_code == 200:
                        self.successful_pings += 1
                        self.last_error = None
                        # Log every 15 pings to keep logs clean while providing heartbeat visibility
                        if self.ping_count == 1 or self.ping_count % 15 == 0:
                            logger.info(
                                f"[KEEP-ALIVE HEARTBEAT] Ping #{self.ping_count} to {target_url} succeeded (HTTP {resp.status_code})"
                            )
                    else:
                        self.failed_pings += 1
                        self.last_error = f"Unexpected status code: {resp.status_code}"
                        logger.warning(
                            f"[KEEP-ALIVE WARNING] Ping returned HTTP {resp.status_code} from {target_url}"
                        )

            except asyncio.CancelledError:
                break
            except Exception as exc:
                self.ping_count += 1
                self.failed_pings += 1
                self.last_error = str(exc)
                self.last_ping_time = datetime.now(timezone.utc).isoformat()
                # Log on first error or intermittently
                if self.failed_pings == 1 or self.failed_pings % 10 == 0:
                    logger.warning(f"[KEEP-ALIVE ATTEMPT] Ping to {target_url} failed: {exc}")

            try:
                # Sleep for configured interval (typically 5-10s)
                interval = max(3, settings.KEEP_ALIVE_INTERVAL)
                await asyncio.sleep(interval)
            except asyncio.CancelledError:
                break

    def get_health_status(self, db_session = None) -> Dict[str, Any]:
        """
        Produce comprehensive real-time system and keep-alive health metrics.
        """
        now = time.time()
        uptime_sec = round(now - self.start_time, 2)
        days, rem = divmod(int(uptime_sec), 86400)
        hours, rem = divmod(rem, 3600)
        mins, secs = divmod(rem, 60)
        
        uptime_human_parts = []
        if days > 0:
            uptime_human_parts.append(f"{days}d")
        if hours > 0 or days > 0:
            uptime_human_parts.append(f"{hours}h")
        if mins > 0 or hours > 0 or days > 0:
            uptime_human_parts.append(f"{mins}m")
        uptime_human_parts.append(f"{secs}s")
        uptime_human = " ".join(uptime_human_parts)

        # Check DB connectivity
        db_status = "unknown"
        db_dialect = "unknown"
        try:
            from backend.database import SessionLocal, engine
            db_dialect = engine.dialect.name
            session = db_session if db_session is not None else SessionLocal()
            try:
                session.execute(text("SELECT 1"))
                db_status = "connected"
            finally:
                if db_session is None:
                    session.close()
        except Exception as e:
            db_status = f"error: {str(e)}"

        return {
            "status": "online",
            "health": "healthy" if db_status == "connected" else "degraded",
            "service": settings.PROJECT_NAME,
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "uptime_seconds": uptime_sec,
            "uptime_human": uptime_human,
            "database": {
                "status": db_status,
                "dialect": db_dialect
            },
            "keep_alive": {
                "enabled": settings.ENABLE_KEEP_ALIVE,
                "interval_seconds": settings.KEEP_ALIVE_INTERVAL,
                "target_url": settings.SELF_PING_URL,
                "ping_count": self.ping_count,
                "successful_pings": self.successful_pings,
                "failed_pings": self.failed_pings,
                "last_ping_time": self.last_ping_time,
                "last_status_code": self.last_status_code,
                "last_error": self.last_error
            },
            "escrow_vault": "active",
            "protocol": "Mainnet Escrow v2.4",
            "zero_resume_bias": True
        }

# Global singleton instance
keep_alive_manager = KeepAliveManager()
