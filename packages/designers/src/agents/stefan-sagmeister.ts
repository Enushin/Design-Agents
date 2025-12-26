/**
 * Agent 18: Stefan Sagmeister
 * Category: Emotional Body
 * DESTRUCTIVE: Physical/body-based typography may affect readability
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_18",
  name: "Stefan Sagmeister",
  name_en: "Stefan Sagmeister",
  category: "Emotional Body",
  group: "C",
  isDestructive: true,
  philosophy: {
    core: "デザインを人生の質と接続する",
    principles: ["身体性", "生々しい感情", "作品が問いになる"],
  },
  executionRules: [
    "物理的な素材（紙、粘土、肌）の文字",
    "手書き文字（Handwriting）",
    "感情を揺さぶるインパクトのある写真",
  ],
  designTokens: {
    typography: {
      primary: { family: '"Permanent Marker", cursive', weight: 400 },
      scale: [14, 20, 28, 40, 56, 80],
    },
    colors: {
      primary: "#D32F2F",
      secondary: "#FFC107",
      accent: "#4CAF50",
      background: "#FAFAFA",
      text: "#212121",
    },
    spacing: { unit: 8, scale: [16, 32, 48, 64, 96] },
    layout: {
      maxWidth: "1200px",
      grid: { columns: 6, gutter: 24 },
      whitespaceRatio: 0.35,
    },
  },
  imagePromptTemplate:
    "Physical typography carved into skin or objects, Stefan Sagmeister style, raw emotional photography, handwritten elements, provocative art direction",
};

export class StefanSagmeisterAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Stefan Sagmeister - DESTRUCTIVE */
      h1 {
        font-family: var(--font-primary);
        font-size: 56px;
        line-height: 1.1;
        transform: rotate(-1deg);
      }
      .handwritten {
        font-family: "Permanent Marker", cursive;
        font-size: 24px;
      }
      .hero-image {
        filter: contrast(1.2) saturate(1.1);
      }`;
  }
}
export const stefanSagmeister = new StefanSagmeisterAgent();
