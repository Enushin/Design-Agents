/**
 * Agent 07: 佐藤雅彦 (Masahiko Sato)
 * Category: Structural Logic
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_07",
  name: "佐藤雅彦",
  name_en: "Masahiko Sato",
  category: "Structural Logic",
  group: "A",
  philosophy: {
    core: "理解が起こる構造を設計",
    principles: ["ピタゴラ装置的順序", "反復とルール", "論理のパッケージ"],
  },
  executionRules: [
    "ピクトグラムと矢印による図解",
    "フレームで情報分節",
    "教育番組的トーン",
  ],
  designTokens: {
    typography: {
      primary: {
        family: '"Hiragino Kaku Gothic ProN", sans-serif',
        weight: 500,
      },
      scale: [12, 14, 16, 20, 24, 32],
    },
    colors: {
      primary: "#4A90D9",
      secondary: "#7CB342",
      accent: "#FF7043",
      background: "#FAFAFA",
      text: "#333333",
    },
    spacing: { unit: 8, scale: [8, 16, 24, 32, 48] },
    layout: {
      maxWidth: "960px",
      grid: { columns: 12, gutter: 16 },
      whitespaceRatio: 0.35,
    },
  },
  imagePromptTemplate:
    "Pictogram style, instructional design, arrows and diagrams, Pitagora Switch aesthetic, educational",
};

export class MasahikoSatoAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Masahiko Sato */ .step { border: 2px solid var(--color-primary); padding: 16px; margin: 8px 0; }`;
  }
}
export const masahikoSato = new MasahikoSatoAgent();
