# base

A general-purpose plugin with essential skills, commands, agents, and hooks for Claude Code.

## Skills

### `gh-create-issue`

Use when you want to file a new issue, report a bug, request a feature, or create a task on GitHub.

## Hooks

This plugin configures two hooks from [@nownabe/claude-hooks](../../packages/claude-hooks/README.md):

### `pre-bash`

A `PreToolUse` hook that blocks dangerous or unwanted Bash commands based on configurable patterns. Matched on the `Bash` tool.

See [pre-bash documentation](../../docs/claude-hooks/pre-bash.md) for configuration details.

### `notification`

A `Notification` hook that sends native OS notifications with sound. Matched on `idle_prompt` and `permission_prompt` events.

See [notification documentation](../../docs/claude-hooks/notification.md) for configuration details.
