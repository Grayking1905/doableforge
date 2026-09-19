import os
from pathlib import Path

# Reload .env from project root or backend folder
def load_env_from_disk():
    for base in [Path("."), Path(__file__).resolve().parent, Path(__file__).resolve().parent.parent]:
        env_file = base / ".env"
        if env_file.is_file():
            try:
                with open(env_file, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#") and "=" in line:
                            k, v = line.split("=", 1)
                            k, v = k.strip(), v.strip().strip("'\"")
                            os.environ[k] = v
            except Exception:
                pass
            break

load_env_from_disk()

class Settings:
    PROJECT_NAME: str = "DoableForge Enterprise API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"

    # Server binding (Render dynamically assigns $PORT)
    @property
    def PORT(self) -> int:
        load_env_from_disk()
        try:
            return int(os.getenv("PORT", "8000"))
        except ValueError:
            return 8000

    @property
    def HOST(self) -> str:
        load_env_from_disk()
        return os.getenv("HOST", "0.0.0.0")

    @property
    def ENVIRONMENT(self) -> str:
        load_env_from_disk()
        if os.getenv("ENVIRONMENT"):
            return os.getenv("ENVIRONMENT")
        if os.getenv("RENDER"):
            return "production"
        return "development"

    # Keep-Alive / Render Self-Ping Settings
    @property
    def ENABLE_KEEP_ALIVE(self) -> bool:
        load_env_from_disk()
        return os.getenv("ENABLE_KEEP_ALIVE", "true").lower() in ("true", "1", "yes")

    @property
    def KEEP_ALIVE_INTERVAL(self) -> int:
        load_env_from_disk()
        try:
            # Default to 10 seconds (satisfies 5-10s requirement)
            val = int(os.getenv("KEEP_ALIVE_INTERVAL", "10"))
            return max(3, val)
        except ValueError:
            return 10

    @property
    def RENDER_EXTERNAL_URL(self) -> str:
        load_env_from_disk()
        # Automatically injected by Render (e.g. https://doableforge.onrender.com)
        return os.getenv("RENDER_EXTERNAL_URL", "").strip().rstrip("/")

    @property
    def SELF_PING_URL(self) -> str:
        load_env_from_disk()
        # Explicit override if specified by the operator
        explicit = os.getenv("SELF_PING_URL", "").strip()
        if explicit:
            return explicit
        if self.RENDER_EXTERNAL_URL:
            return f"{self.RENDER_EXTERNAL_URL}/api/health"
        # Fallback to localhost binding
        return f"http://127.0.0.1:{self.PORT}/api/health"

    # Database Configuration (Auto-normalizes postgres:// -> postgresql:// for SQLAlchemy 2.0+)
    @property
    def DATABASE_URL(self) -> str:
        load_env_from_disk()
        url = os.getenv("DATABASE_URL", "sqlite:///./doableforge.db").strip()
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        return url

    # CORS Origins (Allow override or extra frontend origins)
    @property
    def CORS_ORIGINS(self) -> list:
        load_env_from_disk()
        origins = [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:3000",
            "*",
        ]
        custom = os.getenv("CORS_ORIGINS", "")
        if custom:
            origins.extend([o.strip() for o in custom.split(",") if o.strip()])
        frontend_url = os.getenv("FRONTEND_URL", "")
        if frontend_url and frontend_url not in origins:
            origins.append(frontend_url.strip())
        return list(dict.fromkeys(origins))

    # --- Gmail / SMTP Configuration (Dynamic) ---
    @property
    def SMTP_HOST(self) -> str:
        load_env_from_disk()
        return os.getenv("SMTP_HOST", "smtp.gmail.com").strip()

    @property
    def SMTP_PORT(self) -> int:
        load_env_from_disk()
        try:
            return int(os.getenv("SMTP_PORT", "587"))
        except ValueError:
            return 587

    @property
    def SMTP_USER(self) -> str:
        load_env_from_disk()
        return os.getenv("SMTP_USER", os.getenv("GMAIL_USER", "")).strip()

    @property
    def SMTP_PASSWORD(self) -> str:
        load_env_from_disk()
        # Clean any spaces from Google 16-character App Password (e.g. 'abcd efgh ijkl mnop' -> 'abcdefghijklmnop')
        raw = os.getenv("SMTP_PASSWORD", os.getenv("GMAIL_APP_PASSWORD", ""))
        return raw.strip().replace(" ", "")

    @property
    def SMTP_USE_TLS(self) -> bool:
        load_env_from_disk()
        return os.getenv("SMTP_USE_TLS", "true").lower() in ("true", "1", "yes")

    @property
    def SMTP_USE_SSL(self) -> bool:
        load_env_from_disk()
        return os.getenv("SMTP_USE_SSL", "false").lower() in ("true", "1", "yes")

    # Recipient for all inbound platform inquiries
    @property
    def CONTACT_RECIPIENT_EMAIL(self) -> str:
        load_env_from_disk()
        return os.getenv("CONTACT_RECIPIENT_EMAIL", "contact@doableforge.com").strip()
    
    # Auto-reply acknowledgment to client / freelancer
    @property
    def SEND_CLIENT_CONFIRMATION(self) -> bool:
        load_env_from_disk()
        return os.getenv("SEND_CLIENT_CONFIRMATION", "true").lower() in ("true", "1", "yes")

settings = Settings()


