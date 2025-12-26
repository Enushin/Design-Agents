/**
 * Agent 12: Wim Crouwel
 * Category: Gridnik System
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_12",
  name: "Wim Crouwel",
  name_en: "Wim Crouwel",
  category: "Gridnik System",
  group: "B",
  philosophy: {
    core: "文字をグリッドの一部として再設計",
    principles: ["システム整合性", "未来的美学", "建築的構造"],
  },
  executionRules: [
    "機械的なディスプレイ書体",
    "ドットやラインによる装飾",
    "冷たくシステマチックな配色",
  ],
  designTokens: {
    typography: {
      primary: { family: '"OCR A Std", "Courier New", monospace', weight: 400 },
      scale: [12, 16, 20, 28, 40, 56],
    },
    colors: {
      primary: "#0066CC",
      secondary: "#333333",
      accent: "#00CC66",
      background: "#F0F0F0",
      text: "#1A1A1A",
    },
    spacing: { unit: 8, scale: [8, 16, 32, 48, 80] },
    layout: {
      maxWidth: "1200px",
      grid: { columns: 16, gutter: 12 },
      whitespaceRatio: 0.3,
    },
  },
  imagePromptTemplate:
    "Gridnik typography, dot matrix pattern, systematic design, Wim Crouwel New Alphabet style, futuristic minimalism",
};

export class WimCrouwelAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Wim Crouwel */ h1 { font-family: var(--font-primary); text-transform: lowercase; letter-spacing: 0.1em; } .dot-pattern { background-image: radial-gradient(circle, #333 1px, transparent 1px); background-size: 8px 8px; }`;
  }
}
export const wimCrouwel = new WimCrouwelAgent();
