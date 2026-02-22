import { type RunCommandFn, runGh, resolveRepo, parseRepoFlag } from "./repo";

export interface GetActionsRunOptions {
  owner: string;
  repo: string;
  runId: string;
}

export async function getActionsRun(
  options: GetActionsRunOptions,
  runCommand: RunCommandFn = runGh,
): Promise<void> {
  const { owner, repo, runId } = options;

  const result = await runCommand(["api", `repos/${owner}/${repo}/actions/runs/${runId}`]);

  if (result.exitCode !== 0) {
    console.error(`Failed to get actions run ${runId}: ${result.stderr}`);
    process.exit(1);
  }

  console.log(result.stdout);
}

export async function main(): Promise<void> {
  const {
    remaining: allArgs,
    owner: flagOwner,
    repo: flagRepo,
  } = parseRepoFlag(process.argv.slice(2));
  // allArgs[0] = group ("gh"), allArgs[1] = command ("get-actions-run"), rest = positional args
  const remaining = allArgs.slice(2);

  if (remaining.length < 1) {
    console.error("Usage: claude-tools gh get-actions-run <run_id> [--repo <owner/repo>]");
    process.exit(1);
  }

  const runId = remaining[0];

  let owner: string;
  let repo: string;
  if (flagOwner && flagRepo) {
    owner = flagOwner;
    repo = flagRepo;
  } else {
    const resolved = await resolveRepo();
    owner = resolved.owner;
    repo = resolved.repo;
  }

  await getActionsRun({ owner, repo, runId });
}
