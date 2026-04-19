# `gh get-pr-reviews`

Get reviews on a pull request.

## Usage

```bash
claude-tools gh get-pr-reviews <pull_number> [--repo <owner/repo>]
```

## Arguments

| Argument              | Required | Description                                                                |
| --------------------- | -------- | -------------------------------------------------------------------------- |
| `pull_number`         | Yes      | The pull request number to retrieve reviews for                            |
| `--repo <owner/repo>` | No       | Target repository. If omitted, detected from the current working directory |

## Examples

```bash
# Get reviews on PR #42 in the current repository
claude-tools gh get-pr-reviews 42

# Get reviews on PR #26 in a specific repository
claude-tools gh get-pr-reviews 26 --repo nownabe/graphein
```
