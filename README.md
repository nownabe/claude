# claude

A Claude Code plugin marketplace by nownabe.

## Installation

Add this marketplace:

```
/plugin marketplace add nownabe/claude
```

Browse and install plugins:

```
/plugin
```

## Plugins

| Plugin                         | Description                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| [base](plugins/base/README.md) | A general-purpose plugin with essential skills, commands, agents, and hooks for Claude Code |

## Tools

```bash
bunx @nownabe/claude-tools <command>
```

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `gh add-sub-issues`  | Add sub-issues to a parent GitHub issue          |
| `gh get-release`     | Get release information from a GitHub repository |
| `gh list-sub-issues` | List sub-issues of a GitHub issue                |
| `gh resolve-tag-sha` | Resolve a GitHub tag to its commit SHA           |

See [packages/claude-tools/README.md](packages/claude-tools/README.md) for details.

## Hooks

```bash
bunx @nownabe/claude-hooks <hook>
```

| Hook           | Description                               |
| -------------- | ----------------------------------------- |
| `pre-bash`     | Block dangerous or unwanted Bash commands |
| `notification` | Send native OS notifications with sound   |

See [packages/claude-hooks/README.md](packages/claude-hooks/README.md) for details.

## License

Apache-2.0
