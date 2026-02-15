# @nownabe/claude-hooks

A collection of [Claude Code hooks](https://docs.anthropic.com/en/docs/claude-code/hooks) for enhanced workflow automation.

## Installation

```bash
npm install -g @nownabe/claude-hooks
```

## Hooks

### `pre-bash` — Forbidden Command Patterns

A `PreToolUse` hook that blocks dangerous or unwanted Bash commands based on configurable regex patterns.

#### Setup

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
            "command": "npx @nownabe/claude-hooks pre-bash"
          }
        ]
      }
    ]
  }
}
```

#### Configuration

Create `.claude/pre-bash.json` in your home directory or any ancestor directory of your project:

```json
{
  "forbiddenPatterns": [
    {
      "pattern": "\\bgit\\s+-C\\b",
      "reason": "git -C is not allowed",
      "suggestion": "Run git commands from the working directory directly"
    }
  ]
}
```

Child directories override parent patterns. To disable a parent pattern:

```json
{
  "forbiddenPatterns": [{ "pattern": "\\bgit\\s+-C\\b", "disabled": true }]
}
```

### `notification` — OS-Native Notifications

A `Notification` hook that sends native OS notifications. Currently supports WSL (Windows) with sound and balloon notifications via PowerShell.

#### Setup

Add to your `settings.json`:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "npx @nownabe/claude-hooks notification"
          }
        ]
      }
    ]
  }
}
```

#### Configuration

Optionally create `.claude/notification.json` to customize notification sounds:

```json
{
  "sounds": {
    "permission_prompt": "C:\\Windows\\Media\\Windows Notify System Generic.wav",
    "*": "C:\\Windows\\Media\\tada.wav"
  }
}
```

- `permission_prompt` — Sound for permission prompts
- `*` — Default sound for all other notification types (e.g., `stop`, task completion)

Config files are loaded hierarchically from the current working directory up to `$HOME`. Child directories override parent values.

#### Supported Platforms

| Platform      | Status                                                        |
| ------------- | ------------------------------------------------------------- |
| WSL (Windows) | Supported — plays sound + balloon notification via PowerShell |
| macOS         | Not yet implemented                                           |
| Linux         | Not yet implemented                                           |
