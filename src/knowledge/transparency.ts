import type { TransparencyKey, Role } from "../types.js";

export interface TransparencyTrigger {
  key: TransparencyKey;
  title: string;
  article: string;
  duty: string;
  responsible: Role;
}

/** Article 50 — transparency obligations. These co-apply on top of the risk tier. */
export const TRANSPARENCY_TRIGGERS: TransparencyTrigger[] = [
  {
    key: "directInteraction",
    title: "Direct interaction with people (chatbots)",
    article: "Art 50(1)",
    duty: "Inform natural persons that they are interacting with an AI system, unless it is obvious from the context.",
    responsible: "provider",
  },
  {
    key: "syntheticContent",
    title: "AI-generated audio, image, video or text",
    article: "Art 50(2)",
    duty: "Mark outputs in a machine-readable format and make them detectable as artificially generated or manipulated.",
    responsible: "provider",
  },
  {
    key: "deepfake",
    title: "Deepfakes",
    article: "Art 50(4)",
    duty: "Disclose that the image, audio or video content has been artificially generated or manipulated.",
    responsible: "deployer",
  },
  {
    key: "emotionRecognition",
    title: "Emotion recognition system",
    article: "Art 50(3)",
    duty: "Inform the natural persons exposed to it that the system is operating (where the use is not prohibited).",
    responsible: "deployer",
  },
  {
    key: "biometricCategorization",
    title: "Biometric categorisation system",
    article: "Art 50(3)",
    duty: "Inform the natural persons exposed to it that the system is operating (where the use is not prohibited).",
    responsible: "deployer",
  },
  {
    key: "publicInterestText",
    title: "AI-generated text on matters of public interest",
    article: "Art 50(4)",
    duty: "Disclose that the text was artificially generated or manipulated when published to inform the public on matters of public interest.",
    responsible: "deployer",
  },
];
