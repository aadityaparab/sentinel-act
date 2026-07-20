import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";
import { assess, toEvidence } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const ex = (f) => JSON.parse(readFileSync(join(here, "..", "examples", f), "utf8"));

test("employment screener => HIGH risk with provider obligations", () => {
  const a = assess(ex("hiring-screener.json"));
  assert.equal(a.tier, "high");
  assert.ok(a.obligations.some((o) => o.id === "HR-P-11"), "expects Annex IV technical documentation");
  assert.ok(a.rationale.some((r) => r.citation.article.includes("Annex III(4)")), "cites employment domain");
});

test("support chatbot => LIMITED risk with Article 50 transparency", () => {
  const a = assess(ex("support-chatbot.json"));
  assert.equal(a.tier, "limited");
  assert.ok(a.transparencyObligations.some((o) => o.article.startsWith("Art 50")));
});

test("spam filter => MINIMAL risk", () => {
  const a = assess(ex("spam-filter.json"));
  assert.equal(a.tier, "minimal");
});

test("social scoring => UNACCEPTABLE (prohibited, no obligation list)", () => {
  const a = assess(ex("social-scoring.json"));
  assert.equal(a.tier, "unacceptable");
  assert.equal(a.obligations.length, 0);
  assert.ok(a.rationale.some((r) => r.citation.article === "Art 5(1)(c)"));
});

test("GPAI model => GPAI obligations apply on top of tier", () => {
  const a = assess(ex("gpai-model.json"));
  assert.equal(a.gpai.isGpai, true);
  assert.ok(a.obligations.some((o) => o.tier === "gpai"));
});

test("evidence record carries a sha256 digest", () => {
  const e = toEvidence(assess(ex("spam-filter.json")));
  assert.equal(e.integrity.algorithm, "sha256");
  assert.match(e.integrity.digest, /^[a-f0-9]{64}$/);
});
