# `gh get-pr-comments`

Get review comments on a pull request.

## Usage

```bash
claude-tools gh get-pr-comments <pr_number> [--repo <owner/repo>]
```

## Arguments

| Argument              | Required | Description                                                                |
| --------------------- | -------- | -------------------------------------------------------------------------- |
| `pr_number`           | Yes      | The pull request number to retrieve comments for                           |
| `--repo <owner/repo>` | No       | Target repository. If omitted, detected from the current working directory |

## Examples

```bash
# Get comments on PR #42 in the current repository
claude-tools gh get-pr-comments 42

# Get comments on PR #26 in a specific repository
claude-tools gh get-pr-comments 26 --repo nownabe/graphein
```
