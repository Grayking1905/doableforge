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
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./doableforge.db")
    CORS_ORIGINS: list = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*",
    ]

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


