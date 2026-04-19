import { describe, it, expect, mock } from "bun:test";
import { getPrReviews } from "./get-pr-reviews";

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

describe("getPrReviews", () => {
  it("should call gh api with correct endpoint and output result", async () => {
    const reviewsJson = JSON.stringify([
      { id: 1, user: { login: "reviewer1" }, state: "APPROVED", body: "LGTM" },
      { id: 2, user: { login: "reviewer2" }, state: "CHANGES_REQUESTED", body: "Please fix" },
    ]);
    const { fn, calls } = createMockRunner([{ stdout: reviewsJson, stderr: "", exitCode: 0 }]);

    await getPrReviews({ owner: "myorg", repo: "myrepo", pullNumber: 26 }, fn);

    expect(calls).toHaveLength(1);
    expect(calls[0]).toEqual(["api", "repos/myorg/myrepo/pulls/26/reviews"]);
  });

  it("should exit with error when API call fails", async () => {
    const { fn } = createMockRunner([{ stdout: "", stderr: "Not Found", exitCode: 1 }]);

    const mockExit = mock(() => {
      throw new Error("process.exit");
    });
    const originalExit = process.exit;
    process.exit = mockExit as unknown as typeof process.exit;

    try {
      await getPrReviews({ owner: "myorg", repo: "myrepo", pullNumber: 999 }, fn);
    } catch {
      // expected
    }

    expect(mockExit).toHaveBeenCalledWith(1);
    process.exit = originalExit;
  });
});
