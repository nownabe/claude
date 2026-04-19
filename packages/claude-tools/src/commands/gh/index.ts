export const commands: Record<string, () => Promise<void>> = {
  "add-sub-issues": () => import("./add-sub-issues").then((m) => m.main()),
  "get-actions-run": () => import("./get-actions-run").then((m) => m.main()),
  "get-job-logs": () => import("./get-job-logs").then((m) => m.main()),
  "get-pr-comments": () => import("./get-pr-comments").then((m) => m.main()),
  "get-pr-reviews": () => import("./get-pr-reviews").then((m) => m.main()),
  "get-release": () => import("./get-release").then((m) => m.main()),
  "get-repo-content": () => import("./get-repo-content").then((m) => m.main()),
  "list-run-jobs": () => import("./list-run-jobs").then((m) => m.main()),
  "list-sub-issues": () => import("./list-sub-issues").then((m) => m.main()),
  "resolve-tag-sha": () => import("./resolve-tag-sha").then((m) => m.main()),
};
