#!/usr/bin/env bun

import { main as preBash } from "./pre-bash";
import { main as notification } from "./notification";

const commands: Record<string, () => Promise<void>> = {
  "pre-bash": preBash,
  notification: notification,
};

const name = process.argv[2];

if (!name || !(name in commands)) {
  const available = Object.keys(commands).join(", ");
  console.error(name ? `Unknown command: ${name}` : "No command specified");
  console.error(`Available commands: ${available}`);
  process.exit(1);
}

await commands[name]();
