import { describe, it, expect, mock } from "bun:test";
import { getJobLogs } from "./get-job-logs";

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

describe("getJobLogs", () => {
  it("should call gh api with correct endpoint", async () => {
    const logs = "Some log output";
    const { fn, calls } = createMockRunner([{ stdout: logs, stderr: "", exitCode: 0 }]);

    await getJobLogs({ owner: "myorg", repo: "myrepo", jobId: "12345" }, fn);

    expect(calls).toHaveLength(1);
    expect(calls[0]).toEqual(["api", "repos/myorg/myrepo/actions/jobs/12345/logs"]);
  });

  it("should strip timestamps by default", async () => {
    const logs = "2025-03-06T10:30:45.1234567Z Step 1\n2025-03-06T10:30:46.9876543Z Step 2\n";
    const { fn } = createMockRunner([{ stdout: logs, stderr: "", exitCode: 0 }]);

    const logSpy = mock(() => {});
    const originalLog = console.log;
    console.log = logSpy;

    await getJobLogs({ owner: "myorg", repo: "myrepo", jobId: "12345" }, fn);

    console.log = originalLog;
    expect(logSpy).toHaveBeenCalledWith("Step 1\nStep 2\n");
  });

  it("should preserve timestamps when stripTimestamps is false", async () => {
    const logs = "2025-03-06T10:30:45.1234567Z Step 1\n2025-03-06T10:30:46.9876543Z Step 2\n";
    const { fn } = createMockRunner([{ stdout: logs, stderr: "", exitCode: 0 }]);

    const logSpy = mock(() => {});
    const originalLog = console.log;
    console.log = logSpy;

    await getJobLogs(
      { owner: "myorg", repo: "myrepo", jobId: "12345", stripTimestamps: false },
      fn,
    );

    console.log = originalLog;
    expect(logSpy).toHaveBeenCalledWith(logs);
  });

  it("should exit with error when API call fails", async () => {
    const { fn } = createMockRunner([{ stdout: "", stderr: "Not Found", exitCode: 1 }]);

    const mockExit = mock(() => {
      throw new Error("process.exit");
    });
    const originalExit = process.exit;
    process.exit = mockExit as unknown as typeof process.exit;

    try {
      await getJobLogs({ owner: "myorg", repo: "myrepo", jobId: "99999" }, fn);
    } catch {
      // expected
    }

    expect(mockExit).toHaveBeenCalledWith(1);
    process.exit = originalExit;
  });
});
