# `gh get-actions-run`

Get workflow run information from a GitHub Actions run.

## Usage

```bash
claude-tools gh get-actions-run <run_id> [--repo <owner/repo>]
```

## Arguments

| Argument              | Required | Description                                                                |
| --------------------- | -------- | -------------------------------------------------------------------------- |
| `run_id`              | Yes      | The workflow run ID to retrieve                                            |
| `--repo <owner/repo>` | No       | Target repository. If omitted, detected from the current working directory |

## Examples

```bash
claude-tools gh get-actions-run 12345678
claude-tools gh get-actions-run 12345678 --repo myorg/myrepo
```
