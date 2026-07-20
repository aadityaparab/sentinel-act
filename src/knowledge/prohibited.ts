import type { ProhibitedKey } from "../types.js";

export interface ProhibitedPractice {
  key: ProhibitedKey;
  title: string;
  article: string;
  summary: string;
}

/** Article 5 — prohibited AI practices. Any of these ⇒ Unacceptable risk (banned). */
export const PROHIBITED_PRACTICES: ProhibitedPractice[] = [
  {
    key: "subliminalManipulation",
    title: "Subliminal, manipulative or deceptive techniques",
    article: "Art 5(1)(a)",
    summary: "Techniques beyond a person's awareness that materially distort behaviour and cause or are likely to cause significant harm.",
  },
  {
    key: "exploitVulnerabilities",
    title: "Exploiting vulnerabilities (age, disability, socio-economic situation)",
    article: "Art 5(1)(b)",
    summary: "Exploiting vulnerabilities of a person or group to materially distort behaviour and cause significant harm.",
  },
  {
    key: "socialScoring",
    title: "Social scoring",
    article: "Art 5(1)(c)",
    summary: "Evaluating or classifying people over time by social behaviour or personal traits leading to detrimental or unjustified treatment.",
  },
  {
    key: "predictivePolicingProfiling",
    title: "Predicting criminal offending from profiling alone",
    article: "Art 5(1)(d)",
    summary: "Assessing the risk of a person committing a criminal offence based solely on profiling or personality traits.",
  },
  {
    key: "facialScraping",
    title: "Untargeted scraping of facial images",
    article: "Art 5(1)(e)",
    summary: "Creating or expanding facial-recognition databases through untargeted scraping from the internet or CCTV.",
  },
  {
    key: "emotionRecognitionWorkEducation",
    title: "Emotion recognition in the workplace or education",
    article: "Art 5(1)(f)",
    summary: "Inferring emotions of people at work or in education, except for medical or safety reasons.",
  },
  {
    key: "biometricCategorizationSensitive",
    title: "Biometric categorisation of sensitive attributes",
    article: "Art 5(1)(g)",
    summary: "Categorising people from biometric data to infer race, political opinions, trade-union membership, religion, sex life or sexual orientation.",
  },
  {
    key: "realtimeRemoteBiometricIdPublic",
    title: "Real-time remote biometric identification in public (law enforcement)",
    article: "Art 5(1)(h)",
    summary: "Real-time remote biometric identification in publicly accessible spaces for law-enforcement purposes, save narrowly defined exceptions.",
  },
];
