# Documentation Guidelines

## Structure

Documentation follows a layered structure: top-level overviews link to detailed pages.

```
README.md                                  # Repository overview with Plugins, Tools, Hooks sections
plugins/<plugin>/README.md                 # Plugin overview: what each skill/hook does
packages/<package>/README.md               # Package overview: installation, prerequisites, feature list
docs/claude-tools/gh/<command>.md          # Detailed command doc: usage, arguments/options, examples
docs/claude-hooks/<hook>.md                # Detailed hook doc: setup, configuration, behavior
```

## Principles

- **Root README** — Slim overview. Each section (Plugins, Tools, Hooks) has a table with one-liner descriptions linking to the relevant README or doc page.
- **Plugin READMEs** — Describe what each skill and hook is used for. Do not document internal implementation details (inputs, procedures, templates).
- **Package READMEs** — Installation, prerequisites, and a table of features linking to detailed docs. Keep configuration basics (e.g., config file name, loading order) but move detailed usage to `docs/`.
- **Detailed docs (`docs/`)** — Full reference for each command or hook: usage, arguments/options, examples, configuration, and behavior details.

## Adding Documentation for a New Command or Hook

1. Create a detailed doc under `docs/` (e.g., `docs/claude-tools/gh/<command>.md`).
2. Add a row to the table in the corresponding package README.
3. If relevant to a plugin, mention it in the plugin's README.
4. Add a row to the corresponding table in the root README if needed.
5. Run `bun run format` before committing.
