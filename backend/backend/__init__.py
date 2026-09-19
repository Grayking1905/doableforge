import sys
from pathlib import Path

# Extend this package's search path to include the parent backend folder
_parent = str(Path(__file__).resolve().parent.parent)
if _parent not in __path__:
    __path__.append(_parent)
if _parent not in sys.path:
    sys.path.insert(0, _parent)
