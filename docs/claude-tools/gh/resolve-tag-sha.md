# `gh resolve-tag-sha`

Resolve a GitHub repository tag to its commit SHA. Handles both lightweight and annotated tags.

## Usage

```bash
claude-tools gh resolve-tag-sha <owner/repo> <tag>
```

## Arguments

| Argument     | Required | Description                           |
| ------------ | -------- | ------------------------------------- |
| `owner/repo` | Yes      | The repository in `owner/repo` format |
| `tag`        | Yes      | The tag name to resolve               |

## Examples

```bash
$ claude-tools gh resolve-tag-sha actions/setup-node v4.4.0
actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4.4.0

$ claude-tools gh resolve-tag-sha dorny/paths-filter v3.0.2
dorny/paths-filter@de90cc6fb38fc0963ad72b210f1f284cd68cea36 # v3.0.2
```
