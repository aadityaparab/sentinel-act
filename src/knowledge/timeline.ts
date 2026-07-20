import type { TimelineEntry } from "../types.js";

/** The date this knowledge base reflects. Update when the law/timeline changes. */
export const AS_OF = "2026-07-16";

export const TIMELINE: TimelineEntry[] = [
  { milestone: "AI Act enters into force", date: "2024-08-01", status: "in force" },
  { milestone: "Prohibited practices (Art 5) & AI-literacy duties apply", date: "2025-02-02", status: "in force" },
  { milestone: "GPAI model obligations, governance bodies & penalties apply", date: "2025-08-02", status: "in force" },
  {
    milestone: "High-risk (Annex III) & most remaining provisions apply",
    date: "2026-08-02",
    status: "upcoming",
    note: "Statutory date under Reg. (EU) 2024/1689. The 'Digital Omnibus' (provisional political agreement, 7 May 2026, pending formal adoption) proposes deferring Annex III high-risk obligations to 2 Dec 2027.",
  },
  {
    milestone: "Proposed deferral of Annex III high-risk deadline",
    date: "2027-12-02",
    status: "proposed change",
    note: "Provisional under the Digital Omnibus — not yet law as of the 'as of' date. Treat 2 Aug 2026 as the binding date until adopted.",
  },
  { milestone: "High-risk safety components of regulated products (Annex I) apply", date: "2027-08-02", status: "upcoming" },
];

export interface Penalty {
  violation: string;
  max: string;
  article: string;
}

export const PENALTIES: Penalty[] = [
  { violation: "Prohibited AI practices (Art 5)", max: "€35,000,000 or 7% of worldwide annual turnover", article: "Art 99" },
  { violation: "Breach of other obligations (incl. high-risk & transparency)", max: "€15,000,000 or 3% of worldwide annual turnover", article: "Art 99" },
  { violation: "Supplying incorrect, incomplete or misleading information", max: "€7,500,000 or 1% of worldwide annual turnover", article: "Art 99" },
  { violation: "GPAI provider obligations", max: "€15,000,000 or 3% of worldwide annual turnover", article: "Art 101" },
];
