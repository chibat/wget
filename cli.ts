/**
 * @module
 * CLI
 */

import { parseArgs } from "@std/cli";
import { wget } from "./mod.ts";

if (import.meta.main) {
  const args = parseArgs(Deno.args);
  const url = args._[0]?.toString();
  const outputDocument = args["O"] ?? args["output-document"];
  if (url) {
    await wget(url, { outputDocument });
  }
}
