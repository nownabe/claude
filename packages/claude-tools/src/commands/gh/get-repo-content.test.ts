import { describe, it, expect, mock } from "bun:test";
import { getRepoContent } from "./get-repo-content";

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

describe("getRepoContent", () => {
  it("should get file content and decode base64", async () => {
    const content = "name: cuelsp\nversion: 0.1.0\n";
    const encoded = btoa(content);
    const { fn, calls } = createMockRunner([{ stdout: encoded, stderr: "", exitCode: 0 }]);

    const result = await getRepoContent(
      { repo: "mason-org/mason-registry", path: "packages/cuelsp/package.yaml" },
      fn,
    );

    expect(result).toBe(content);
    expect(calls).toHaveLength(1);
    expect(calls[0]).toEqual([
      "api",
      "repos/mason-org/mason-registry/contents/packages/cuelsp/package.yaml",
      "--jq",
      ".content",
    ]);
  });

  it("should handle base64 content with newlines", async () => {
    const content = "line1\nline2\nline3\n";
    const encoded = `${btoa(content).slice(0, 10)}\n${btoa(content).slice(10)}`;
    const { fn } = createMockRunner([{ stdout: encoded, stderr: "", exitCode: 0 }]);

    const result = await getRepoContent({ repo: "owner/repo", path: "file.txt" }, fn);

    expect(result).toBe(content);
  });

  it("should pass ref parameter when specified", async () => {
    const content = "hello";
    const { fn, calls } = createMockRunner([{ stdout: btoa(content), stderr: "", exitCode: 0 }]);

    const result = await getRepoContent(
      { repo: "owner/repo", path: "file.txt", ref: "v1.0.0" },
      fn,
    );

    expect(result).toBe(content);
    expect(calls[0]).toEqual([
      "api",
      "repos/owner/repo/contents/file.txt",
      "--jq",
      ".content",
      "-f",
      "ref=v1.0.0",
    ]);
  });

  it("should exit with error when the API call fails", async () => {
    const { fn } = createMockRunner([{ stdout: "", stderr: "Not Found", exitCode: 1 }]);

    const mockExit = mock(() => {
      throw new Error("process.exit");
    });
    const originalExit = process.exit;
    process.exit = mockExit as unknown as typeof process.exit;

    try {
      await getRepoContent({ repo: "owner/repo", path: "nonexistent.txt" }, fn);
    } catch {
      // expected
    }

    expect(mockExit).toHaveBeenCalledWith(1);
    process.exit = originalExit;
  });
});
