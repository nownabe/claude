import { describe, it, expect, mock } from "bun:test";
import { getActionsRun } from "./get-actions-run";

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

describe("getActionsRun", () => {
  it("should call gh api with correct endpoint and output result", async () => {
    const runJson = JSON.stringify({
      id: 12345,
      status: "completed",
      conclusion: "success",
    });
    const { fn, calls } = createMockRunner([{ stdout: runJson, stderr: "", exitCode: 0 }]);

    await getActionsRun({ owner: "myorg", repo: "myrepo", runId: "12345" }, fn);

    expect(calls).toHaveLength(1);
    expect(calls[0]).toEqual(["api", "repos/myorg/myrepo/actions/runs/12345"]);
  });

  it("should exit with error when API call fails", async () => {
    const { fn } = createMockRunner([{ stdout: "", stderr: "Not Found", exitCode: 1 }]);

    const mockExit = mock(() => {
      throw new Error("process.exit");
    });
    const originalExit = process.exit;
    process.exit = mockExit as unknown as typeof process.exit;

    try {
      await getActionsRun({ owner: "myorg", repo: "myrepo", runId: "99999" }, fn);
    } catch {
      // expected
    }

    expect(mockExit).toHaveBeenCalledWith(1);
    process.exit = originalExit;
  });
});
