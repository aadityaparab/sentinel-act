import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import type { SystemProfile, ProhibitedKey, AnnexIIIKey, TransparencyKey } from "./types.js";
import { PROHIBITED_PRACTICES } from "./knowledge/prohibited.js";
import { ANNEX_III_DOMAINS } from "./knowledge/high-risk.js";
import { TRANSPARENCY_TRIGGERS } from "./knowledge/transparency.js";

/** Interactive Q&A that builds a SystemProfile for `act classify`. */
export async function runQuestionnaire(): Promise<SystemProfile> {
  const rl = createInterface({ input, output });
  const ask = async (q: string): Promise<string> => (await rl.question(q)).trim();
  const yn = async (q: string): Promise<boolean> => /^y/i.test(await ask(`${q} (y/N) `));

  async function pick<T extends string>(title: string, items: { key: T; title: string }[]): Promise<Partial<Record<T, boolean>>> {
    console.log(`\n${title}`);
    items.forEach((it, i) => console.log(`  ${i + 1}. ${it.title}`));
    const raw = await ask("  numbers (comma-separated) or blank for none: ");
    const chosen: Partial<Record<T, boolean>> = {};
    for (const tok of raw.split(",").map((s) => s.trim()).filter(Boolean)) {
      const idx = Number(tok) - 1;
      if (Number.isInteger(idx) && idx >= 0 && idx < items.length) chosen[items[idx].key] = true;
    }
    return chosen;
  }

  const name = (await ask("System name: ")) || "Unnamed system";
  const r = (await ask("Your role — [p]rovider, [d]eployer, [b]oth: ")).toLowerCase();
  const role: SystemProfile["role"] = r.startsWith("d") ? "deployer" : r.startsWith("b") ? "both" : "provider";

  const gpai = await yn("Do you provide a general-purpose AI model?");
  const gpaiSystemicRisk = gpai ? await yn("  Does it have systemic risk (>10^25 FLOPs / designated)?") : false;

  const prohibited = (await pick("Article 5 — does it do any of these prohibited practices?", PROHIBITED_PRACTICES)) as Partial<Record<ProhibitedKey, boolean>>;
  const annexIII = (await pick("Annex III — does it fall in any of these high-risk areas?", ANNEX_III_DOMAINS)) as Partial<Record<AnnexIIIKey, boolean>>;

  let significantRiskException = false;
  let involvesProfiling = false;
  if (Object.keys(annexIII).length > 0) {
    involvesProfiling = await yn("  Does it profile natural persons?");
    significantRiskException = await yn("  Do you believe it does NOT pose significant risk (Art 6(3) exemption)?");
  }

  const annexIProduct = await yn("Is the AI a safety component of a regulated product (Annex I: machinery, medical device, toy, ...)?");
  const transparency = (await pick("Article 50 — any transparency triggers?", TRANSPARENCY_TRIGGERS)) as Partial<Record<TransparencyKey, boolean>>;

  rl.close();
  return { name, role, gpai, gpaiSystemicRisk, prohibited, annexIII, significantRiskException, involvesProfiling, annexIProduct, transparency };
}
