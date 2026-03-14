# `gh get-repo-content`

Get file content from a GitHub repository. Fetches the raw content of a file via the GitHub Contents API, decoding the base64 response automatically.

## Usage

```bash
claude-tools gh get-repo-content <path> [--ref <ref>] [--repo <owner/repo>]
```

## Arguments

| Argument | Required | Description                        |
| -------- | -------- | ---------------------------------- |
| `<path>` | Yes      | Path to the file in the repository |

## Options

| Option                | Required | Description                                                                   |
| --------------------- | -------- | ----------------------------------------------------------------------------- |
| `--ref <ref>`         | No       | Branch, tag, or commit SHA to fetch from. If omitted, uses the default branch |
| `--repo <owner/repo>` | No       | Target repository. If omitted, detected from the current working directory    |

## Examples

```bash
claude-tools gh get-repo-content README.md
claude-tools gh get-repo-content packages/cuelsp/package.yaml --repo mason-org/mason-registry
claude-tools gh get-repo-content src/main.ts --ref v1.0.0 --repo owner/repo
claude-tools gh get-repo-content package.json --repo nownabe/claude | jq '.name'
```
