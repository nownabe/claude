# `gh get-release`

Get release information from a GitHub repository. Fetches the latest release by default, or a specific release by tag. Supports `--jq` for filtering output.

## Usage

```bash
claude-tools gh get-release [--tag <tag>] [--jq <expression>] [--repo <owner/repo>]
```

## Options

| Option                | Required | Description                                                                |
| --------------------- | -------- | -------------------------------------------------------------------------- |
| `--tag <tag>`         | No       | Fetch a specific release by tag. If omitted, fetches the latest release    |
| `--jq <expression>`   | No       | Filter the output using a jq expression                                    |
| `--repo <owner/repo>` | No       | Target repository. If omitted, detected from the current working directory |

## Examples

```bash
claude-tools gh get-release
claude-tools gh get-release --jq '.tag_name'
claude-tools gh get-release --tag v1.0.0 --jq '.body' --repo myorg/myrepo
```
