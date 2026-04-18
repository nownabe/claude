import { type RunCommandFn, runGh, resolveRepo, parseRepoFlag } from "./repo";

export interface GetPrCommentsOptions {
  owner: string;
  repo: string;
  prNumber: number;
}

export async function getPrComments(
  options: GetPrCommentsOptions,
  runCommand: RunCommandFn = runGh,
): Promise<string> {
  const { owner, repo, prNumber } = options;

  const result = await runCommand(["api", `repos/${owner}/${repo}/pulls/${prNumber}/comments`]);

  if (result.exitCode !== 0) {
    console.error(
      `Failed to get comments for PR #${prNumber} in ${owner}/${repo}: ${result.stderr}`,
    );
    process.exit(1);
  }

  return result.stdout;
}

export async function main(): Promise<void> {
  const {
    remaining: allArgs,
    owner: flagOwner,
    repo: flagRepo,
  } = parseRepoFlag(process.argv.slice(2));
  const remaining = allArgs.slice(2);

  const prNumberStr = remaining[0];
  if (!prNumberStr || Number.isNaN(Number(prNumberStr))) {
    console.error("Usage: claude-tools gh get-pr-comments <pr_number> [--repo <owner/repo>]");
    process.exit(1);
  }

  const prNumber = Number(prNumberStr);

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

  const output = await getPrComments({ owner, repo, prNumber });
  console.log(output);
}
