/** Knowledge-base version. Bump when rules/citations/timeline change. */
export const KB_VERSION =
  "0.2.0 — EU AI Act, Regulation (EU) 2024/1689 as amended by the Digital Omnibus on AI (as of 2026-08-12)";

export { PROHIBITED_PRACTICES } from "./prohibited.js";
export type { ProhibitedPractice } from "./prohibited.js";
export { ANNEX_III_DOMAINS } from "./high-risk.js";
export type { HighRiskDomain } from "./high-risk.js";
export { TRANSPARENCY_TRIGGERS } from "./transparency.js";
export type { TransparencyTrigger } from "./transparency.js";
export {
  HIGH_RISK_PROVIDER,
  HIGH_RISK_DEPLOYER,
  GPAI_OBLIGATIONS,
  GPAI_SYSTEMIC,
  LIMITED_RISK_NOTE,
  MINIMAL_RISK_NOTE,
} from "./obligations.js";
export { TIMELINE, TIMELINE_FACTS, PENALTIES, AS_OF, timelineAsOf, todayIso } from "./timeline.js";
export type { Penalty, TimelineFact } from "./timeline.js";
