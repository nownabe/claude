# base

A general-purpose plugin with essential skills, commands, agents, and hooks for Claude Code.

## Skills

### `gh-create-issue`

Create a GitHub issue using the `gh` CLI. Handles issue body composition, duplicate checking, and sub-issue linking.

**Inputs:**

- **Title** (required)
- **Body content** (required) — fills a structured template with Overview, Goal, Context, Expected Impact, Acceptance Criteria, References, and Implementation ideas
- **Labels** (optional)
- **Milestone** (optional)
- **Parent issue number** (optional) — links the new issue as a sub-issue

**Procedure:**

1. Gather title, body content, and optional inputs from the user
2. Search for duplicate/related issues and inform the user if any are found
3. Compose the issue body using the built-in template
4. Create the issue with `gh issue create`
5. If a parent issue is specified, link via the GitHub REST API
6. Return the created issue URL

## Hooks

This plugin configures two hooks from [@nownabe/claude-hooks](../../packages/claude-hooks/README.md):

### `pre-bash`

A `PreToolUse` hook that blocks dangerous or unwanted Bash commands based on configurable patterns. Matched on the `Bash` tool.

See [pre-bash documentation](../../docs/claude-hooks/pre-bash.md) for configuration details.

### `notification`

A `Notification` hook that sends native OS notifications with sound. Matched on `idle_prompt` and `permission_prompt` events.

See [notification documentation](../../docs/claude-hooks/notification.md) for configuration details.
