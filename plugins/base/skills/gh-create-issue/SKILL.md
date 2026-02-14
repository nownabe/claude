---
name: gh-create-issue
description: Create a GitHub issue using the gh CLI
---

Create a GitHub issue using the `gh issue create` command.

## Required inputs

- **Title**: The issue title (required)
- **Body**: The issue description/body (required)

## Optional inputs

- **Labels**: One or more labels to apply
- **Assignees**: One or more users to assign
- **Milestone**: A milestone to associate with the issue

## Instructions

1. Ensure the user has provided at least a title and body for the issue.
2. Run `gh issue create` with the provided arguments:
   - `--title "<title>"`
   - `--body "<body>"`
   - `--label "<label>"` for each label (if provided)
   - `--assignee "<assignee>"` for each assignee (if provided)
   - `--milestone "<milestone>"` if provided
3. Return the URL of the created issue to the user.
