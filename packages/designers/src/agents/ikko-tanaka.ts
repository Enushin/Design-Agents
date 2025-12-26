/**
 * Agent 04: 田中一光 (Ikko Tanaka)
 * Category: Modern Japonesque
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_04",
  name: "田中一光",
  name_en: "Ikko Tanaka",
  category: "Modern Japonesque",
  group: "A",
  philosophy: {
    core: "日本の伝統美をモダニズムで再構築",
    principles: ["大胆な色面分割", "明朝体と幾何学", "現代のポップ"],
  },
  executionRules: [
    "大胆な色面ブロック",
    "明朝体と幾何学図形の対比",
    "シンメトリーを崩した配置",
  ],
  designTokens: {
    typography: {
      primary: { family: '"Hiragino Mincho ProN", serif', weight: 400 },
      scale: [14, 18, 24, 36, 48, 72],
    },
    colors: {
      primary: "#C41E3A",
      secondary: "#1E3A5F",
      accent: "#FFD700",
      background: "#FFFFFF",
      text: "#1A1A1A",
    },
    spacing: { unit: 8, scale: [16, 32, 48, 64, 96] },
    layout: {
      maxWidth: "1200px",
      grid: { columns: 6, gutter: 32 },
      whitespaceRatio: 0.35,
    },
  },
  imagePromptTemplate:
    "Bold color blocking, Japanese traditional meets modern, geometric shapes, Ikko Tanaka poster style",
};

export class IkkoTanakaAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Ikko Tanaka */ .hero { background: var(--color-primary); } h1 { font-size: 72px; }`;
  }
}
export const ikkoTanaka = new IkkoTanakaAgent();
