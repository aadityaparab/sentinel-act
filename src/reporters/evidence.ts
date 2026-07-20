import type { Assessment } from "../types.js";
import { createHash } from "node:crypto";

/**
 * Machine-readable classification record — the "compliance evidence as a
 * byproduct" artifact. Suitable for a governance register or audit trail.
 */
export function toEvidence(a: Assessment): unknown {
  const body = {
    evidenceType: "eu-ai-act-classification",
    control: {
      id: "AI-ACT-01",
      name: "EU AI Act risk classification & obligation mapping",
      description:
        "The AI system was assessed against the EU AI Act to determine its risk tier and the obligations that apply.",
      framework: "EU AI Act — Regulation (EU) 2024/1689",
    },
    system: a.system,
    tier: a.tier,
    gpai: a.gpai,
    rationale: a.rationale.map((r) => ({ reason: r.reason, article: r.citation.article })),
    obligations: {
      count: a.obligations.length + a.transparencyObligations.length,
      ids: [...a.obligations, ...a.transparencyObligations].map((o) => o.id),
    },
    assessedAt: a.assessedAt,
    kbVersion: a.kbVersion,
    disclaimer: a.disclaimer,
  };
  const digest = createHash("sha256").update(JSON.stringify(body)).digest("hex");
  return { ...body, integrity: { algorithm: "sha256", digest } };
}
