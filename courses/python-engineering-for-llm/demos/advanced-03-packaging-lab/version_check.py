import re, sys
from pathlib import Path

text = Path("pyproject.snippet.toml").read_text(encoding="utf-8")
m = re.search(r'version = "(\d+\.\d+\.\d+)"', text)
assert m, "no version"
print("semver ok:", m.group(1))
