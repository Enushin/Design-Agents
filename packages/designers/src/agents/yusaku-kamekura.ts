/**
 * Agent 05: 亀倉雄策 (Yusaku Kamekura)
 * Category: Standard & Strength
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_05",
  name: "亀倉雄策",
  name_en: "Yusaku Kamekura",
  category: "Standard & Strength",
  group: "A",
  philosophy: {
    core: "デザインは社会への強いメッセージ",
    principles: ["ダイナミックな直線", "揺るぎないタイポ", "明快さ"],
  },
  executionRules: [
    "放射線、水平線の構図",
    "重厚なサンセリフ",
    "高コントラスト写真",
  ],
  designTokens: {
    typography: {
      primary: { family: '"Helvetica Neue", Arial, sans-serif', weight: 700 },
      scale: [16, 24, 36, 48, 72, 96],
    },
    colors: {
      primary: "#C41E3A",
      secondary: "#1A1A1A",
      accent: "#FFD700",
      background: "#FFFFFF",
      text: "#000000",
    },
    spacing: { unit: 8, scale: [16, 32, 48, 64, 96] },
    layout: {
      maxWidth: "1200px",
      grid: { columns: 12, gutter: 24 },
      whitespaceRatio: 0.25,
    },
  },
  imagePromptTemplate:
    "Dynamic composition, radiating lines, Olympic poster style, Yusaku Kamekura, high contrast",
};

export class YusakuKamekuraAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Yusaku Kamekura */ h1 { font-size: 96px; font-weight: 700; text-transform: uppercase; }`;
  }
}
export const yusakuKamekura = new YusakuKamekuraAgent();
