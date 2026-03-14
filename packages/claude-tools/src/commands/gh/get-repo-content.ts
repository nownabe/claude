import { type RunCommandFn, runGh, resolveRepo, parseRepoFlag } from "./repo";

export interface GetRepoContentOptions {
  repo: string;
  path: string;
  ref?: string;
  raw?: boolean;
}

export async function getRepoContent(
  options: GetRepoContentOptions,
  runCommand: RunCommandFn = runGh,
): Promise<string> {
  const { repo, path, ref, raw } = options;

  const endpoint = `repos/${repo}/contents/${path}`;
  const args = raw ? ["api", endpoint] : ["api", endpoint, "--jq", ".content"];
  if (ref) {
    args.push("-f", `ref=${ref}`);
  }

  const result = await runCommand(args);

  if (result.exitCode !== 0) {
    console.error(`Failed to get content for ${repo}/${path}: ${result.stderr}`);
    process.exit(1);
  }

  if (raw) {
    return result.stdout;
  }

  return atob(result.stdout.replace(/\n/g, ""));
}

export async function main(): Promise<void> {
  const {
    remaining: allArgs,
    owner: flagOwner,
    repo: flagRepo,
  } = parseRepoFlag(process.argv.slice(2));
  const remaining = allArgs.slice(2);

  let ref: string | undefined;
  let raw = false;
  const positional: string[] = [];

  for (let i = 0; i < remaining.length; i++) {
    if (remaining[i] === "--ref") {
      ref = remaining[i + 1];
      if (!ref) {
        console.error("--ref requires a value");
        process.exit(1);
      }
      i++;
    } else if (remaining[i] === "--raw") {
      raw = true;
    } else {
      positional.push(remaining[i]);
    }
  }

  const path = positional[0];
  if (!path) {
    console.error(
      "Usage: claude-tools gh get-repo-content <path> [--ref <ref>] [--raw] [--repo <owner/repo>]",
    );
    process.exit(1);
  }

  let repo: string;
  if (flagOwner && flagRepo) {
    repo = `${flagOwner}/${flagRepo}`;
  } else {
    const resolved = await resolveRepo();
    repo = `${resolved.owner}/${resolved.repo}`;
  }

  const output = await getRepoContent({ repo, path, ref, raw });
  console.log(output);
}
