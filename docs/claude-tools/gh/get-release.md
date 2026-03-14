# `gh get-release`

Get release information from a GitHub repository. Fetches the latest release by default, or a specific release by tag. Pipe through `jq` to filter output.

## Usage

```bash
claude-tools gh get-release [--tag <tag>] [--repo <owner/repo>]
```

## Options

| Option                | Required | Description                                                                |
| --------------------- | -------- | -------------------------------------------------------------------------- |
| `--tag <tag>`         | No       | Fetch a specific release by tag. If omitted, fetches the latest release    |
| `--repo <owner/repo>` | No       | Target repository. If omitted, detected from the current working directory |

## Examples

```bash
claude-tools gh get-release
claude-tools gh get-release | jq '.tag_name'
claude-tools gh get-release --tag v1.0.0 --repo myorg/myrepo | jq '.body'
```
