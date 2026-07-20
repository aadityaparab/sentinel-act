import type { AnnexIIIKey } from "../types.js";

export interface HighRiskDomain {
  key: AnnexIIIKey;
  title: string;
  annex: string;
  summary: string;
}

/** Annex III — standalone high-risk use cases. Any of these ⇒ High risk (unless Art 6(3) exemption applies). */
export const ANNEX_III_DOMAINS: HighRiskDomain[] = [
  {
    key: "biometrics",
    title: "Biometrics",
    annex: "Annex III(1)",
    summary: "Remote biometric identification, biometric categorisation by sensitive attributes, and emotion recognition (where not prohibited).",
  },
  {
    key: "criticalInfrastructure",
    title: "Critical infrastructure",
    annex: "Annex III(2)",
    summary: "Safety components in the management and operation of road traffic, and the supply of water, gas, heating and electricity.",
  },
  {
    key: "educationVocational",
    title: "Education & vocational training",
    annex: "Annex III(3)",
    summary: "Admission/assignment, evaluating learning outcomes, assessing the appropriate level of education, and monitoring/proctoring exams.",
  },
  {
    key: "employment",
    title: "Employment & worker management",
    annex: "Annex III(4)",
    summary: "Recruitment and selection, decisions on terms, promotion or termination, task allocation, and monitoring performance and behaviour.",
  },
  {
    key: "essentialServices",
    title: "Access to essential public services & benefits",
    annex: "Annex III(5)(a)",
    summary: "Eligibility for public assistance benefits and services, and dispatching or triaging emergency services.",
  },
  {
    key: "creditScoring",
    title: "Creditworthiness & credit scoring",
    annex: "Annex III(5)(b)",
    summary: "Evaluating creditworthiness or establishing a credit score (except detecting financial fraud).",
  },
  {
    key: "insurance",
    title: "Life & health insurance risk and pricing",
    annex: "Annex III(5)(c)",
    summary: "Risk assessment and pricing in relation to life and health insurance.",
  },
  {
    key: "lawEnforcement",
    title: "Law enforcement",
    annex: "Annex III(6)",
    summary: "Victim/offending risk assessment, polygraphs, evaluating evidence reliability, and profiling in the course of investigations.",
  },
  {
    key: "migrationBorder",
    title: "Migration, asylum & border control",
    annex: "Annex III(7)",
    summary: "Risk assessments, and examining applications for asylum, visa or residence permits, and detecting persons.",
  },
  {
    key: "justiceDemocracy",
    title: "Administration of justice & democratic processes",
    annex: "Annex III(8)",
    summary: "Assisting judicial authorities in researching and interpreting facts and law, and influencing elections, referenda or voting behaviour.",
  },
];
