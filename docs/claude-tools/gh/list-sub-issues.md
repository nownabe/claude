# `gh list-sub-issues`

List sub-issues of a GitHub issue.

## Usage

```bash
claude-tools gh list-sub-issues <issue_number> [--repo <owner/repo>]
```

## Arguments

| Argument              | Required | Description                                                                |
| --------------------- | -------- | -------------------------------------------------------------------------- |
| `issue_number`        | Yes      | The issue number to list sub-issues for                                    |
| `--repo <owner/repo>` | No       | Target repository. If omitted, detected from the current working directory |

## Examples

```bash
claude-tools gh list-sub-issues 1
claude-tools gh list-sub-issues 1 --repo myorg/myrepo
```
