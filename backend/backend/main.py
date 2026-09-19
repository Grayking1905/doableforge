import sys
from pathlib import Path

# Add the real backend folder to sys.path so 'import main' loads backend/main.py
_backend_dir = Path(__file__).resolve().parent.parent
if str(_backend_dir) not in sys.path:
    sys.path.insert(0, str(_backend_dir))

import main as _main_module
app = _main_module.app

__all__ = ["app"]
