import { type RunCommandFn, runGh, resolveRepo, parseRepoFlag } from "./repo";

export interface GetJobLogsOptions {
  owner: string;
  repo: string;
  jobId: string;
  stripTimestamps?: boolean;
}

const TIMESTAMP_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z /gm;

export async function getJobLogs(
  options: GetJobLogsOptions,
  runCommand: RunCommandFn = runGh,
): Promise<void> {
  const { owner, repo, jobId, stripTimestamps = true } = options;

  const result = await runCommand(["api", `repos/${owner}/${repo}/actions/jobs/${jobId}/logs`]);

  if (result.exitCode !== 0) {
    console.error(`Failed to get job logs for ${jobId}: ${result.stderr}`);
    process.exit(1);
  }

  const output = stripTimestamps ? result.stdout.replace(TIMESTAMP_REGEX, "") : result.stdout;
  console.log(output);
}

export async function main(): Promise<void> {
  const {
    remaining: allArgs,
    owner: flagOwner,
    repo: flagRepo,
  } = parseRepoFlag(process.argv.slice(2));
  // allArgs[0] = group ("gh"), allArgs[1] = command ("get-job-logs"), rest = positional args/flags
  const remaining = allArgs.slice(2);

  let noStripTimestamps = false;
  const positional: string[] = [];
  for (const arg of remaining) {
    if (arg === "--no-strip-timestamps") {
      noStripTimestamps = true;
    } else {
      positional.push(arg);
    }
  }

  if (positional.length < 1) {
    console.error(
      "Usage: claude-tools gh get-job-logs <job_id> [--repo <owner/repo>] [--no-strip-timestamps]",
    );
    process.exit(1);
  }

  const jobId = positional[0];

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

  await getJobLogs({ owner, repo, jobId, stripTimestamps: !noStripTimestamps });
}
