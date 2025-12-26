/**
 * Agent 14: Saul Bass
 * Category: Cinematic Minimal
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_14",
  name: "Saul Bass",
  name_en: "Saul Bass",
  category: "Cinematic Minimal",
  group: "B",
  philosophy: {
    core: "物語の核を最小の不揃いな形に凝縮",
    principles: ["カットアウト", "ドラマチック", "動きと緊張"],
  },
  executionRules: [
    "切り絵風のシルエットグラフィック",
    "単色背景（黒、赤、オレンジなど）",
    "手書き風の不揃いなタイトル文字",
  ],
  designTokens: {
    typography: {
      primary: { family: '"ITC Avant Garde Gothic", sans-serif', weight: 700 },
      scale: [14, 20, 28, 40, 56, 80],
    },
    colors: {
      primary: "#FF4500",
      secondary: "#000000",
      accent: "#FFD700",
      background: "#1A1A1A",
      text: "#FFFFFF",
    },
    spacing: { unit: 8, scale: [16, 32, 48, 64, 96] },
    layout: {
      maxWidth: "1200px",
      grid: { columns: 6, gutter: 32 },
      whitespaceRatio: 0.4,
    },
  },
  imagePromptTemplate:
    "Cut-paper silhouette, movie title sequence style, Saul Bass aesthetic, dramatic single color background, hand-cut irregular shapes",
};

export class SaulBassAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Saul Bass */ .hero { background: var(--color-secondary); color: var(--color-text); } .silhouette { filter: drop-shadow(4px 4px 0 var(--color-primary)); }`;
  }
}
export const saulBass = new SaulBassAgent();
