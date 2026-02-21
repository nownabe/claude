# @nownabe/claude-tools

A collection of CLI tools for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) workflows. Provides GitHub-related utilities via the `gh` command group.

## Installation

```bash
npm install -g @nownabe/claude-tools
```

## Prerequisites

- [GitHub CLI (`gh`)](https://cli.github.com/) must be installed and authenticated
- For `add-sub-issues` and `list-sub-issues`, the `--repo` flag is optional — if omitted, the repository is detected from the current working directory

## Commands

| Command                                                               | Description                                      |
| --------------------------------------------------------------------- | ------------------------------------------------ |
| [`gh add-sub-issues`](../../docs/claude-tools/gh/add-sub-issues.md)   | Add sub-issues to a parent GitHub issue          |
| [`gh get-release`](../../docs/claude-tools/gh/get-release.md)         | Get release information from a GitHub repository |
| [`gh list-sub-issues`](../../docs/claude-tools/gh/list-sub-issues.md) | List sub-issues of a GitHub issue                |
| [`gh resolve-tag-sha`](../../docs/claude-tools/gh/resolve-tag-sha.md) | Resolve a GitHub tag to its commit SHA           |
