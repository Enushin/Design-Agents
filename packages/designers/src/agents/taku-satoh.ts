/**
 * Agent 03: 佐藤卓 (Taku Satoh)
 * Category: Design Anatomy
 * Group: A (Japanese Aesthetics)
 */

import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_03",
  name: "佐藤卓",
  name_en: "Taku Satoh",
  category: "Design Anatomy",
  group: "A",
  philosophy: {
    core: "日常に溶け込む「あたりまえ」の凄みを引き出す",
    principles: [
      "親しみやすさと品格の同居",
      "生活者の視点",
      "シズル感と情報の正しさ",
    ],
  },
  executionRules: [
    "丸みのある親しみやすいフォント",
    "食品パッケージのような整理された情報構造",
    "生活感のある温かいトーン",
  ],
  designTokens: {
    typography: {
      primary: {
        family: '"Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
        weight: 400,
      },
      scale: [12, 14, 16, 20, 24, 32],
    },
    colors: {
      primary: "#F8F5F0",
      secondary: "#E8E4DE",
      accent: "#D4A574",
      background: "#FFFFFF",
      text: "#3D3D3D",
    },
    spacing: { unit: 8, scale: [8, 16, 24, 32, 48, 64] },
    layout: {
      maxWidth: "1000px",
      grid: { columns: 12, gutter: 20 },
      whitespaceRatio: 0.4,
    },
  },
  imagePromptTemplate:
    "Warm, approachable product photography, natural lighting, everyday life context, food packaging aesthetic, Taku Satoh style",
};

export class TakuSatohAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Taku Satoh - Design Anatomy */
h1 { font-size: 32px; font-weight: 400; letter-spacing: 0.02em; }
.cta { background: var(--color-accent); color: #FFF; padding: 16px 32px; border-radius: 24px; }`;
  }
}
export const takuSatoh = new TakuSatohAgent();
