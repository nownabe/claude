---
"@nownabe/claude-hooks": patch
---

Fix crash when `cwd` is undefined in pre-bash hook input by falling back to `process.cwd()`
