/**
 * Agent 13: Milton Glaser
 * Category: Narrative Illustration
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_13",
  name: "Milton Glaser",
  name_en: "Milton Glaser",
  category: "Narrative Illustration",
  group: "B",
  philosophy: {
    core: "人間味・文化・物語を力強い形と色で包む",
    principles: ["手描きイラスト", "サイケデリック", "共感重視"],
  },
  executionRules: [
    "イラストレーション中心のレイアウト",
    "アウトライン付きのポップな書体",
    "有機的な曲線と暖色系の配色",
  ],
  designTokens: {
    typography: {
      primary: { family: '"Cooper Black", "Georgia", serif', weight: 700 },
      scale: [14, 18, 24, 36, 48, 72],
    },
    colors: {
      primary: "#FF6B6B",
      secondary: "#4A90D9",
      accent: "#FFD93D",
      background: "#FFF8E7",
      text: "#2C3E50",
    },
    spacing: { unit: 8, scale: [12, 24, 36, 48, 64] },
    layout: {
      maxWidth: "1100px",
      grid: { columns: 8, gutter: 24 },
      whitespaceRatio: 0.3,
    },
  },
  imagePromptTemplate:
    "Hand-drawn illustration, psychedelic colors, organic curves, Milton Glaser I Love NY style, warm emotional design",
};

export class MiltonGlaserAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Milton Glaser */ h1 { text-shadow: 3px 3px 0 var(--color-secondary); } .illustration { border-radius: 20px; }`;
  }
}
export const miltonGlaser = new MiltonGlaserAgent();
