# `gh add-sub-issues`

Add sub-issues to a parent GitHub issue.

## Usage

```bash
claude-tools gh add-sub-issues <parent_issue_number> <sub_issue_number>... [--repo <owner/repo>]
```

## Arguments

| Argument              | Required | Description                                                                |
| --------------------- | -------- | -------------------------------------------------------------------------- |
| `parent_issue_number` | Yes      | The issue number to add sub-issues to                                      |
| `sub_issue_number`    | Yes      | One or more issue numbers to add as sub-issues                             |
| `--repo <owner/repo>` | No       | Target repository. If omitted, detected from the current working directory |

## Examples

```bash
claude-tools gh add-sub-issues 1 2 3 4
claude-tools gh add-sub-issues 1 2 3 --repo myorg/myrepo
```
