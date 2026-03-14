# `gh get-repo-content`

Get file content from a GitHub repository via the GitHub Contents API. By default, returns the decoded file content. Use `--raw` to get the full API JSON response.

## Usage

```bash
claude-tools gh get-repo-content <path> [--ref <ref>] [--raw] [--repo <owner/repo>]
```

## Arguments

| Argument | Required | Description                        |
| -------- | -------- | ---------------------------------- |
| `<path>` | Yes      | Path to the file in the repository |

## Options

| Option                | Required | Description                                                                   |
| --------------------- | -------- | ----------------------------------------------------------------------------- |
| `--ref <ref>`         | No       | Branch, tag, or commit SHA to fetch from. If omitted, uses the default branch |
| `--raw`               | No       | Output the full API JSON response instead of decoded content                  |
| `--repo <owner/repo>` | No       | Target repository. If omitted, detected from the current working directory    |

## Examples

```bash
claude-tools gh get-repo-content README.md
claude-tools gh get-repo-content packages/cuelsp/package.yaml --repo mason-org/mason-registry
claude-tools gh get-repo-content src/main.ts --ref v1.0.0 --repo owner/repo
claude-tools gh get-repo-content package.json --repo nownabe/claude --raw | jq -r '.content' | base64 -d
```
