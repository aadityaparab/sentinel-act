import type { SystemProfile, RiskTier, Obligation } from "./types.js";
import {
  HIGH_RISK_PROVIDER,
  HIGH_RISK_DEPLOYER,
  GPAI_OBLIGATIONS,
  GPAI_SYSTEMIC,
  LIMITED_RISK_NOTE,
  MINIMAL_RISK_NOTE,
} from "./knowledge/obligations.js";

/** Obligations that apply for a given tier + the profile's role (and GPAI status). */
export function obligationsFor(tier: RiskTier, p: SystemProfile): Obligation[] {
  const out: Obligation[] = [];
  const isProvider = p.role === "provider" || p.role === "both";
  const isDeployer = p.role === "deployer" || p.role === "both";

  if (tier === "high") {
    if (isProvider) out.push(...HIGH_RISK_PROVIDER);
    if (isDeployer) out.push(...HIGH_RISK_DEPLOYER);
  } else if (tier === "limited") {
    out.push(...LIMITED_RISK_NOTE);
  } else if (tier === "minimal") {
    out.push(...MINIMAL_RISK_NOTE);
  }
  // Unacceptable ⇒ no obligation list; the system must not be put into service.

  // GPAI obligations co-apply regardless of the system tier.
  if (p.gpai) {
    out.push(...GPAI_OBLIGATIONS);
    if (p.gpaiSystemicRisk) out.push(...GPAI_SYSTEMIC);
  }

  return out;
}
