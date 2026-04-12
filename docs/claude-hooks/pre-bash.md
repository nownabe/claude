# `pre-bash` — Allowed & Forbidden Command Patterns

A `PreToolUse` hook that auto-approves or blocks Bash commands based on configurable patterns.

## Setup

Add to your `settings.json` (`~/.claude/settings.json`, `.claude/settings.json`, or `.claude/settings.local.json`):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bunx @nownabe/claude-hooks pre-bash"
          }
        ]
      }
    ]
  }
}
```

## Configuration

Add a `preBash` section to your `.claude/nownabe-claude-hooks.json`. Patterns are specified as an object keyed by pattern string.

### Allowed Patterns

Allowed patterns auto-approve matching commands, bypassing Claude Code's permission system (including bash security heuristics like the multi-line command check). This is useful for commands that are known-safe but trigger false positives.

```json
{
  "preBash": {
    "allowedPatterns": {
      "git commit *": {
        "reason": "Allow git commit with any arguments"
      },
      "bun test *": {},
      "bun run *": {}
    }
  }
}
```

Each entry supports:

| Field    | Required | Description                                       |
| -------- | -------- | ------------------------------------------------- |
| `reason` | No       | Displayed to the user when the command is allowed |
| `type`   | No       | `"glob"` (default) or `"regex"`                   |

**Evaluation order:** Allowed patterns are checked **before** forbidden patterns. If a command matches an allowed pattern, it is immediately approved and forbidden patterns are not evaluated.

### Forbidden Patterns

```json
{
  "preBash": {
    "forbiddenPatterns": {
      "git -C *": {
        "reason": "git -C is not allowed",
        "suggestion": "Run git commands from the working directory directly"
      },
      "git push --force *": {
        "reason": "Force push is dangerous",
        "suggestion": "Use --force-with-lease instead"
      },
      "rm -rf /*": {
        "reason": "Dangerous delete from root",
        "suggestion": "Be more specific about the target path"
      }
    }
  }
}
```

## Pattern Types

Two pattern formats are supported. Patterns are treated as **glob by default**; wrap in `/` delimiters for regex, or use the `type` field for explicit control.

### Glob Patterns (Default, Claude Code Style)

| Pattern        | Matches                               | Does not match  |
| -------------- | ------------------------------------- | --------------- |
| `git commit *` | `git commit -m msg`, `git commit`     | `git commitall` |
| `git*`         | `git`, `gitk`, `git status`           |                 |
| `git * main`   | `git checkout main`, `git merge main` | `git main`      |
| `* --version`  | `node --version`, `bun --version`     |                 |
| `git commit:*` | Same as `git commit *` (deprecated)   |                 |

### Regex Patterns

Wrap in `/` delimiters (like JavaScript), optionally with flags:

| Pattern                 | Matches                               | Equivalent glob |
| ----------------------- | ------------------------------------- | --------------- |
| `/^git commit(\s.*)?$/` | `git commit -m msg`, `git commit`     | `git commit *`  |
| `/^git/`                | `git`, `gitk`, `git status`           | `git*`          |
| `/^git\s.*main$/`       | `git checkout main`, `git merge main` | `git * main`    |
| `/\bgit\s+-C\b/`        | `git -C /tmp status`                  |                 |
| `/curl/i`               | `curl`, `CURL`, `Curl`                |                 |

### Explicit `type` Field

You can also set `"type": "glob"` or `"type": "regex"` to override auto-detection. This is useful when the pattern key itself would be ambiguous (e.g., a regex without `/` delimiters or a glob path containing `/`):

```json
{
  "preBash": {
    "forbiddenPatterns": {
      "\\bgit\\s*push\\b": {
        "type": "regex",
        "reason": "Direct push is not allowed",
        "suggestion": "Use a pull request instead"
      },
      "/usr/local/*": {
        "type": "glob",
        "reason": "Do not modify /usr/local",
        "suggestion": "Use a different path"
      }
    }
  }
}
```

## Shell Operator Awareness

Commands are split on shell operators (`&&`, `||`, `;`, `|`) and each sub-command is checked independently. This means a pattern like `safe-cmd malicious-cmd` will not match `safe-cmd && malicious-cmd`.

## Multiple Pattern Matching

When a command matches multiple forbidden patterns, all matching patterns are reported at once. This allows Claude to see every violated rule in a single response and adjust accordingly, rather than hitting them one at a time on retries.

## Config Merging

Both `allowedPatterns` and `forbiddenPatterns` are objects, so patterns from parent and child directories are deep merged. Child directories can:

- **Add** new patterns alongside inherited ones
- **Override** an inherited pattern's reason/suggestion
- **Disable** an inherited pattern:

```json
{
  "preBash": {
    "allowedPatterns": {
      "git commit *": { "disabled": true }
    },
    "forbiddenPatterns": {
      "git push --force *": { "disabled": true }
    }
  }
}
```
