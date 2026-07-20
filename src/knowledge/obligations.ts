import type { Obligation, Role } from "../types.js";

function o(id: string, title: string, article: string, summary: string, appliesTo: Role | "all", tier: Obligation["tier"]): Obligation {
  return { id, title, article, summary, appliesTo, tier };
}

/** High-risk provider obligations (Articles 8–21, 43–49, 72–73). */
export const HIGH_RISK_PROVIDER: Obligation[] = [
  o("HR-P-09", "Risk management system", "Art 9", "Establish, document and maintain a continuous, lifecycle risk-management system.", "provider", "high"),
  o("HR-P-10", "Data & data governance", "Art 10", "Use training/validation/test data that meet quality, relevance and bias-mitigation criteria.", "provider", "high"),
  o("HR-P-11", "Technical documentation", "Art 11 / Annex IV", "Draw up technical documentation demonstrating conformity before the system is placed on the market.", "provider", "high"),
  o("HR-P-12", "Record-keeping / logging", "Art 12", "Design the system for automatic logging of events across its lifetime.", "provider", "high"),
  o("HR-P-13", "Transparency & instructions for use", "Art 13", "Provide clear instructions so deployers can interpret and use the output correctly.", "provider", "high"),
  o("HR-P-14", "Human oversight", "Art 14", "Design the system to enable effective human oversight.", "provider", "high"),
  o("HR-P-15", "Accuracy, robustness & cybersecurity", "Art 15", "Achieve appropriate accuracy, robustness and cybersecurity, and declare the relevant metrics.", "provider", "high"),
  o("HR-P-17", "Quality management system", "Art 17", "Put a quality-management system in place covering the whole compliance process.", "provider", "high"),
  o("HR-P-43", "Conformity assessment", "Art 43", "Undergo the applicable conformity-assessment procedure before placing on the market.", "provider", "high"),
  o("HR-P-47", "EU declaration of conformity", "Art 47", "Draw up and sign an EU declaration of conformity; keep it for 10 years.", "provider", "high"),
  o("HR-P-48", "CE marking", "Art 48", "Affix the CE marking to indicate conformity.", "provider", "high"),
  o("HR-P-49", "Registration in the EU database", "Art 49", "Register the system (and any Art 6(3) exemption) in the EU database before use.", "provider", "high"),
  o("HR-P-72", "Post-market monitoring", "Art 72", "Operate a post-market monitoring system and plan.", "provider", "high"),
  o("HR-P-73", "Serious incident reporting", "Art 73", "Report serious incidents to the relevant market-surveillance authorities.", "provider", "high"),
];

/** High-risk deployer obligations (Articles 26–27, 86). */
export const HIGH_RISK_DEPLOYER: Obligation[] = [
  o("HR-D-26a", "Use per instructions", "Art 26", "Use the system in accordance with the provider's instructions for use.", "deployer", "high"),
  o("HR-D-26b", "Human oversight", "Art 26", "Assign competent, trained natural persons to oversee operation.", "deployer", "high"),
  o("HR-D-26c", "Input data relevance", "Art 26", "Ensure input data is relevant and sufficiently representative for the intended purpose.", "deployer", "high"),
  o("HR-D-26d", "Monitoring, logs & incident reporting", "Art 26", "Monitor operation, keep automatically generated logs (≥6 months), and inform the provider/authorities of risks and serious incidents.", "deployer", "high"),
  o("HR-D-26e", "Inform workers & affected persons", "Art 26", "Inform workers/representatives before use, and inform persons subject to high-risk decisions.", "deployer", "high"),
  o("HR-D-27", "Fundamental Rights Impact Assessment", "Art 27", "Public bodies, providers of public services, and creditworthiness/insurance deployers must carry out a FRIA.", "deployer", "high"),
  o("HR-D-86", "Right to explanation", "Art 86", "Provide affected persons with a meaningful explanation of decisions made with the system.", "deployer", "high"),
];

/** GPAI model provider obligations (Article 53). */
export const GPAI_OBLIGATIONS: Obligation[] = [
  o("GPAI-53a", "Technical documentation", "Art 53", "Draw up and keep up to date technical documentation of the model.", "provider", "gpai"),
  o("GPAI-53b", "Information for downstream providers", "Art 53", "Provide information and documentation to downstream providers integrating the model.", "provider", "gpai"),
  o("GPAI-53c", "Copyright policy", "Art 53", "Put in place a policy to comply with Union copyright law.", "provider", "gpai"),
  o("GPAI-53d", "Training-content summary", "Art 53", "Publish a sufficiently detailed summary of the content used for training.", "provider", "gpai"),
];

/** Additional obligations for GPAI models with systemic risk (Article 55). */
export const GPAI_SYSTEMIC: Obligation[] = [
  o("GPAI-55a", "Model evaluation & adversarial testing", "Art 55", "Perform model evaluation and adversarial testing (red-teaming).", "provider", "gpai"),
  o("GPAI-55b", "Systemic-risk assessment & mitigation", "Art 55", "Assess and mitigate systemic risks at Union level.", "provider", "gpai"),
  o("GPAI-55c", "Serious-incident tracking & reporting", "Art 55", "Track, document and report serious incidents to the AI Office.", "provider", "gpai"),
  o("GPAI-55d", "Cybersecurity", "Art 55", "Ensure an adequate level of cybersecurity for the model and its physical infrastructure.", "provider", "gpai"),
];

export const LIMITED_RISK_NOTE: Obligation[] = [
  o("LR-50", "Transparency disclosures", "Art 50", "Meet the applicable Article 50 transparency duties (see the transparency list).", "all", "limited"),
];

export const MINIMAL_RISK_NOTE: Obligation[] = [
  o("MR-95", "Voluntary codes of conduct", "Art 95", "No mandatory obligations under the Act; voluntary codes of conduct are encouraged.", "all", "minimal"),
];
