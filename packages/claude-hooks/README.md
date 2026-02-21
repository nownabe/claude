# @nownabe/claude-hooks

A collection of [Claude Code hooks](https://docs.anthropic.com/en/docs/claude-code/hooks) for enhanced workflow automation.

## Installation

```bash
npm install -g @nownabe/claude-hooks
```

## Configuration

All hooks share a single config file: `.claude/nownabe-claude-hooks.json` (or `.claude/nownabe-claude-hooks.local.json` for machine-local overrides).

Config files are loaded hierarchically from the current working directory up to `$HOME`. Files are deep merged — objects are recursively merged (child keys override parent keys), while primitives are replaced entirely by the child value.

File priority (highest first, per directory from CWD to HOME):

1. `CWD/.claude/nownabe-claude-hooks.local.json`
2. `CWD/.claude/nownabe-claude-hooks.json`
3. `<parent>/.claude/nownabe-claude-hooks.local.json`
4. `<parent>/.claude/nownabe-claude-hooks.json`
5. ... up to `$HOME`

## Hooks

| Hook                                                      | Description                               |
| --------------------------------------------------------- | ----------------------------------------- |
| [`pre-bash`](../../docs/claude-hooks/pre-bash.md)         | Block dangerous or unwanted Bash commands |
| [`notification`](../../docs/claude-hooks/notification.md) | Send native OS notifications with sound   |
