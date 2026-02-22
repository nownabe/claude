# `notification` — OS-Native Notifications

A `Notification` hook that sends native OS notifications. Currently supports WSL (Windows) with sound and balloon notifications via PowerShell.

## Setup

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

## Configuration

Add a `notification` section to your `.claude/nownabe-claude-hooks.json`:

```json
{
  "notification": {
    "sounds": {
      "permission_prompt": "C:\\Windows\\Media\\Windows Notify System Generic.wav",
      "*": "C:\\Windows\\Media\\tada.wav"
    }
  }
}
```

- `permission_prompt` — Sound for permission prompts
- `*` — Default sound for all other notification types (e.g., `stop`, task completion)

Sound keys from child directories override parent keys (object merge).

## Supported Platforms

| Platform      | Status                                                        |
| ------------- | ------------------------------------------------------------- |
| WSL (Windows) | Supported — plays sound + balloon notification via PowerShell |
| macOS         | Not yet implemented                                           |
| Linux         | Not yet implemented                                           |
