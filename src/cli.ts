#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";
import type { SystemProfile } from "./types.js";
import { assess } from "./assess.js";
import { checklist } from "./checklist.js";
import { pretty } from "./reporters/pretty.js";
import { toReport } from "./reporters/report.js";
import { toEvidence } from "./reporters/evidence.js";
import { generateDocs } from "./docs/templates.js";
import { runQuestionnaire } from "./questionnaire.js";

const VERSION = "0.1.0";

const HELP = [
  "sentinel-act v" + VERSION,
  "EU AI Act readiness - classify a system, list obligations, generate a checklist and starter docs.",
  "Informational only. Not legal advice.",
  "",
  "USAGE",
  "  act <command> [profile.json] [options]",
  "",
  "COMMANDS",
  "  classify              Interactive questionnaire, then classify (no file needed)",
  "  assess <profile>      Full assessment (default output: pretty)",
  "  obligations <profile> List the obligations that apply",
  "  checklist <profile>   Emit a working checklist",
  "  report <profile>      Markdown readiness report",
  "  evidence <profile>    Machine-readable classification record (JSON)",
  "  docs <profile>        Generate starter documents into a folder (--out)",
  "  help",
  "",
  "OPTIONS",
  "  --format <fmt>    pretty | json | report | evidence | obligations | checklist",
  "  --out <dir>       Output folder for the docs command (default: ./out)",
  "  --output, -o <f>  Write output to a file",
  "  --no-color        Disable ANSI colors",
  "  --version",
  "",
  "EXAMPLES",
  "  act classify",
  "  act assess examples/hiring-screener.json",
  "  act assess examples/support-chatbot.json --format report -o report.md",
  "  act docs examples/hiring-screener.json --out ./out",
].join("\n");

interface Args {
  _: string[];
  [k: string]: string | boolean | string[];
}

function parseArgs(argv: string[]): Args {
  const args: Args = { _: [] };
  const alias: Record<string, string> = { o: "output" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("-")) {
        args[key] = next;
        i++;
      } else args[key] = true;
    } else if (a.startsWith("-") && a.length === 2) {
      const key = alias[a[1]] ?? a[1];
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("-")) {
        args[key] = next;
        i++;
      } else args[key] = true;
    } else args._.push(a);
  }
  return args;
}

function str(v: string | boolean | string[] | undefined): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function loadProfile(file: string): SystemProfile {
  return JSON.parse(readFileSync(file, "utf8")) as SystemProfile;
}

const KINDS = new Set(["pretty", "json", "report", "evidence", "obligations", "checklist"]);

function render(a: ReturnType<typeof assess>, kind: string, color: boolean): string {
  switch (kind) {
    case "json":
      return JSON.stringify(a, null, 2);
    case "report":
      return toReport(a);
    case "evidence":
      return JSON.stringify(toEvidence(a), null, 2);
    case "obligations":
      return [...a.obligations, ...a.transparencyObligations]
        .map((o) => "[" + o.article + "]  " + o.title + " - " + o.summary)
        .join("\n");
    case "checklist":
      return checklist(a)
        .map((i) => "[ ] " + i.article.padEnd(16) + " " + i.obligation)
        .join("\n");
    default:
      return pretty(a, color);
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0] ?? "help";
  const color = args["no-color"] !== true;

  if (args.version === true || cmd === "version") {
    console.log(VERSION);
    return;
  }
  if (cmd === "help" || args.help === true) {
    console.log(HELP);
    return;
  }

  if (cmd === "classify") {
    const profile = await runQuestionnaire();
    console.log("\n" + pretty(assess(profile), color));
    return;
  }

  const file = args._[1] ?? str(args.profile);
  if (!file) {
    console.error("Provide a profile JSON file (e.g. act assess system.json) or run act classify.");
    process.exitCode = 2;
    return;
  }
  const a = assess(loadProfile(resolve(file)));

  if (cmd === "docs") {
    const outDir = resolve(str(args.out) ?? "out");
    mkdirSync(outDir, { recursive: true });
    const docs = generateDocs(a);
    for (const d of docs) writeFileSync(join(outDir, d.filename), d.content);
    console.log(pretty(a, color));
    console.log("\nGenerated " + docs.length + " document(s) -> " + outDir);
    for (const d of docs) console.log("  - " + d.filename);
    return;
  }

  const kind = KINDS.has(cmd) ? cmd : (str(args.format) ?? "pretty");
  const out = render(a, kind, color);
  const output = str(args.output);
  if (output) {
    writeFileSync(output, out);
    console.log(pretty(a, color));
    console.log("\nWrote " + kind + " -> " + output);
  } else {
    console.log(out);
  }
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e));
  process.exitCode = 1;
});
