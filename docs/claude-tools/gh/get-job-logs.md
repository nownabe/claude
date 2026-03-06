# `gh get-job-logs`

Get logs from a GitHub Actions job.

## Usage

```bash
claude-tools gh get-job-logs <job_id> [--repo <owner/repo>] [--no-strip-timestamps]
```

## Arguments

| Argument                | Required | Description                                                                |
| ----------------------- | -------- | -------------------------------------------------------------------------- |
| `job_id`                | Yes      | The job ID to retrieve logs for                                            |
| `--repo <owner/repo>`   | No       | Target repository. If omitted, detected from the current working directory |
| `--no-strip-timestamps` | No       | Keep timestamps in the output (timestamps are stripped by default)         |

## Examples

```bash
# Get job logs with timestamps stripped (default)
claude-tools gh get-job-logs 66031738181

# Get job logs from a specific repository
claude-tools gh get-job-logs 66031738181 --repo myorg/myrepo

# Get job logs with timestamps preserved
claude-tools gh get-job-logs 66031738181 --no-strip-timestamps
```
