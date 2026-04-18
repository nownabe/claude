import { describe, it, expect, mock } from "bun:test";
import { getPrComments } from "./get-pr-comments";

function createMockRunner(responses: { stdout: string; stderr: string; exitCode: number }[]) {
  let callIndex = 0;
  const calls: string[][] = [];
  const fn = mock(async (args: string[]) => {
    calls.push(args);
    const response = responses[callIndex];
    callIndex++;
    return response;
  });
  return { fn, calls };
}

describe("getPrComments", () => {
  it("should get comments for a pull request", async () => {
    const comments = [
      { id: 1, body: "Looks good!", user: { login: "reviewer" } },
      { id: 2, body: "Please fix this", user: { login: "maintainer" } },
    ];
    const { fn, calls } = createMockRunner([
      { stdout: JSON.stringify(comments), stderr: "", exitCode: 0 },
    ]);

    const result = await getPrComments({ owner: "myorg", repo: "myrepo", prNumber: 42 }, fn);

    expect(result).toBe(JSON.stringify(comments));
    expect(calls).toHaveLength(1);
    expect(calls[0]).toEqual(["api", "repos/myorg/myrepo/pulls/42/comments"]);
  });

  it("should exit with error when the API call fails", async () => {
    const { fn } = createMockRunner([{ stdout: "", stderr: "Not Found", exitCode: 1 }]);

    const mockExit = mock(() => {
      throw new Error("process.exit");
    });
    const originalExit = process.exit;
    process.exit = mockExit as unknown as typeof process.exit;

    try {
      await getPrComments({ owner: "owner", repo: "repo", prNumber: 99 }, fn);
    } catch {
      // expected
    }

    expect(mockExit).toHaveBeenCalledWith(1);
    process.exit = originalExit;
  });
});
