# `gh list-run-jobs`

List jobs from a GitHub Actions workflow run.

## Usage

```bash
claude-tools gh list-run-jobs <run_id> [--repo <owner/repo>]
```

## Arguments

| Argument              | Required | Description                                                                |
| --------------------- | -------- | -------------------------------------------------------------------------- |
| `run_id`              | Yes      | The workflow run ID to list jobs for                                       |
| `--repo <owner/repo>` | No       | Target repository. If omitted, detected from the current working directory |

## Output

Returns a JSON array of objects with the following fields:

| Field        | Description                                          |
| ------------ | ---------------------------------------------------- |
| `name`       | Job name                                             |
| `conclusion` | Job result (`success`, `failure`, `cancelled`, etc.) |
| `id`         | Job ID                                               |

## Examples

```bash
# List all jobs in a workflow run
claude-tools gh list-run-jobs 12345678

# List jobs from a specific repository
claude-tools gh list-run-jobs 12345678 --repo myorg/myrepo

# Filter jobs by name using jq
claude-tools gh list-run-jobs 12345678 | jq '.[] | select(.name | contains("Integration"))'
```
