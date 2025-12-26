/**
 * Agent 10: Massimo Vignelli
 * Category: Strict Grid
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_10",
  name: "Massimo Vignelli",
  name_en: "Massimo Vignelli",
  category: "Strict Grid",
  group: "B",
  philosophy: {
    core: "グリッドシステムこそが絶対的な倫理",
    principles: ["厳格なグリッド", "フォント制限", "永遠の骨格"],
  },
  executionRules: [
    "厳格なグリッドレイアウト",
    "太い罫線による分割",
    "使用フォント制限：Helvetica / Bodoni",
  ],
  designTokens: {
    typography: {
      primary: {
        family: '"Helvetica Neue", "Helvetica", sans-serif',
        weight: 400,
      },
      scale: [12, 14, 18, 24, 36, 48],
    },
    colors: {
      primary: "#000000",
      secondary: "#C41E3A",
      accent: "#C41E3A",
      background: "#FFFFFF",
      text: "#000000",
    },
    spacing: { unit: 8, scale: [8, 16, 24, 32, 48] },
    layout: {
      maxWidth: "1200px",
      grid: { columns: 12, gutter: 16 },
      whitespaceRatio: 0.3,
    },
  },
  imagePromptTemplate:
    "Strict grid system, Helvetica typography, black horizontal rules, Massimo Vignelli style, timeless corporate design",
};

export class MassimoVignelliAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Massimo Vignelli */ hr { border: none; height: 4px; background: #000; } section { border-top: 4px solid #000; padding-top: 24px; }`;
  }
}
export const massimoVignelli = new MassimoVignelliAgent();
