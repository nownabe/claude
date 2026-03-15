# @nownabe/claude-hooks

## 0.1.1

### Patch Changes

- af254b2: Fix crash when `cwd` is undefined in pre-bash hook input by falling back to `process.cwd()`

## 0.1.0

### Minor Changes

- 7203bbb: Add notification command for sending OS-native notifications (WSL/Windows support)
- e3a86e3: Add pre-bash command for validating Bash commands against forbidden patterns
