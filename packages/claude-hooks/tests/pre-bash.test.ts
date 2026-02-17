import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import { join } from "path";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { tmpdir } from "os";
import { loadForbiddenPatterns, checkForbiddenPatterns, type ActivePattern } from "../src/pre-bash";

describe("checkForbiddenPatterns", () => {
  const patterns: ActivePattern[] = [
    {
      pattern: "\\bgit\\s+-C\\b",
      reason: "git -C is forbidden",
      suggestion: "Use cd instead",
    },
    {
      pattern: "\\brm\\s+-rf\\s+/\\b",
      reason: "rm -rf / is forbidden",
      suggestion: "Be more specific",
    },
  ];

  test("returns null when no patterns match", () => {
    expect(checkForbiddenPatterns("git status", patterns)).toBeNull();
  });

  test("returns deny result for matching pattern", () => {
    const result = checkForbiddenPatterns("git -C /tmp status", patterns);
    expect(result).toEqual({
      reason: "git -C is forbidden",
      suggestion: "Use cd instead",
    });
  });

  test("returns first matching pattern", () => {
    const result = checkForbiddenPatterns("git -C /tmp && rm -rf /", patterns);
    expect(result?.reason).toBe("git -C is forbidden");
  });

  test("returns null for empty patterns", () => {
    expect(checkForbiddenPatterns("git -C /tmp", [])).toBeNull();
  });
});

describe("loadForbiddenPatterns", () => {
  let tmpDir: string;
  let originalHome: string | undefined;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "pre-bash-test-"));
    originalHome = process.env.HOME;
    process.env.HOME = tmpDir;
  });

  afterEach(() => {
    process.env.HOME = originalHome;
    rmSync(tmpDir, { recursive: true });
  });

  function writeConfig(dir: string, preBashConfig: object) {
    const claudeDir = join(dir, ".claude");
    mkdirSync(claudeDir, { recursive: true });
    writeFileSync(
      join(claudeDir, "nownabe-claude-hooks.json"),
      JSON.stringify({ preBash: preBashConfig }),
    );
  }

  test("returns empty array when no config files exist", () => {
    const cwd = join(tmpDir, "a", "b");
    mkdirSync(cwd, { recursive: true });
    expect(loadForbiddenPatterns(cwd)).toEqual([]);
  });

  test("loads patterns from HOME", () => {
    writeConfig(tmpDir, {
      forbiddenPatterns: {
        "\\bfoo\\b": { reason: "no foo", suggestion: "use bar" },
      },
    });
    expect(loadForbiddenPatterns(tmpDir)).toEqual([
      { pattern: "\\bfoo\\b", reason: "no foo", suggestion: "use bar" },
    ]);
  });

  test("merges parent and child patterns", () => {
    const projectDir = join(tmpDir, "project");
    mkdirSync(projectDir, { recursive: true });

    writeConfig(tmpDir, {
      forbiddenPatterns: {
        "\\bfoo\\b": { reason: "no foo", suggestion: "use bar" },
      },
    });
    writeConfig(projectDir, {
      forbiddenPatterns: {
        "\\bbaz\\b": { reason: "no baz", suggestion: "use qux" },
      },
    });

    const result = loadForbiddenPatterns(projectDir);
    expect(result).toHaveLength(2);
    expect(result.find((p) => p.pattern === "\\bfoo\\b")).toBeTruthy();
    expect(result.find((p) => p.pattern === "\\bbaz\\b")).toBeTruthy();
  });

  test("child can override parent pattern config", () => {
    const projectDir = join(tmpDir, "project");
    mkdirSync(projectDir, { recursive: true });

    writeConfig(tmpDir, {
      forbiddenPatterns: {
        "\\bfoo\\b": { reason: "no foo", suggestion: "use bar" },
      },
    });
    writeConfig(projectDir, {
      forbiddenPatterns: {
        "\\bfoo\\b": { reason: "updated reason", suggestion: "updated suggestion" },
      },
    });

    const result = loadForbiddenPatterns(projectDir);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      pattern: "\\bfoo\\b",
      reason: "updated reason",
      suggestion: "updated suggestion",
    });
  });

  test("inherits parent patterns when child has no preBash section", () => {
    const projectDir = join(tmpDir, "project");
    mkdirSync(projectDir, { recursive: true });

    writeConfig(tmpDir, {
      forbiddenPatterns: {
        "\\bfoo\\b": { reason: "no foo", suggestion: "use bar" },
      },
    });
    // child has no preBash config at all — write a config with only notification
    const claudeDir = join(projectDir, ".claude");
    mkdirSync(claudeDir, { recursive: true });
    writeFileSync(
      join(claudeDir, "nownabe-claude-hooks.json"),
      JSON.stringify({ notification: { sounds: {} } }),
    );

    const result = loadForbiddenPatterns(projectDir);
    expect(result).toHaveLength(1);
    expect(result[0].pattern).toBe("\\bfoo\\b");
  });

  test("child can disable parent pattern", () => {
    const projectDir = join(tmpDir, "project");
    mkdirSync(projectDir, { recursive: true });

    writeConfig(tmpDir, {
      forbiddenPatterns: {
        "\\bfoo\\b": { reason: "no foo", suggestion: "use bar" },
        "\\bbaz\\b": { reason: "no baz", suggestion: "use qux" },
      },
    });
    writeConfig(projectDir, {
      forbiddenPatterns: {
        "\\bfoo\\b": { disabled: true },
      },
    });

    const result = loadForbiddenPatterns(projectDir);
    expect(result).toHaveLength(1);
    expect(result[0].pattern).toBe("\\bbaz\\b");
  });

  test("filters out disabled entries", () => {
    writeConfig(tmpDir, {
      forbiddenPatterns: {
        "\\bfoo\\b": { reason: "no foo", suggestion: "use bar" },
        "\\bbaz\\b": { disabled: true },
      },
    });

    const result = loadForbiddenPatterns(tmpDir);
    expect(result).toHaveLength(1);
    expect(result[0].pattern).toBe("\\bfoo\\b");
  });

  test("skips malformed JSON files", () => {
    const claudeDir = join(tmpDir, ".claude");
    mkdirSync(claudeDir, { recursive: true });
    writeFileSync(join(claudeDir, "nownabe-claude-hooks.json"), "not json");

    expect(loadForbiddenPatterns(tmpDir)).toEqual([]);
  });

  test("handles config without forbiddenPatterns field", () => {
    writeConfig(tmpDir, {});
    expect(loadForbiddenPatterns(tmpDir)).toEqual([]);
  });

  test("returns empty array when HOME is not set", () => {
    delete process.env.HOME;
    expect(loadForbiddenPatterns("/some/path")).toEqual([]);
  });
});
