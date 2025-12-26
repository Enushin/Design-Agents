/**
 * Agent 06: 浅葉克己 (Katsumi Asaba)
 * Category: Humor & Heritage
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_06",
  name: "浅葉克己",
  name_en: "Katsumi Asaba",
  category: "Humor & Heritage",
  group: "A",
  philosophy: {
    core: "デザインに遊びと歴史を注入",
    principles: ["手書きストローク", "ユーモア", "記憶に残るフック"],
  },
  executionRules: [
    "手書き文字のアクセント",
    "遊び心のあるズレた配置",
    "エスニックかつモダン",
  ],
  designTokens: {
    typography: {
      primary: {
        family: '"Hiragino Kaku Gothic ProN", sans-serif',
        weight: 600,
      },
      scale: [14, 18, 24, 36, 48],
    },
    colors: {
      primary: "#8B4513",
      secondary: "#CD853F",
      accent: "#FF6B35",
      background: "#FDF5E6",
      text: "#2F1810",
    },
    spacing: { unit: 8, scale: [12, 24, 36, 48, 72] },
    layout: {
      maxWidth: "1100px",
      grid: { columns: 8, gutter: 24 },
      whitespaceRatio: 0.4,
    },
  },
  imagePromptTemplate:
    "Handwritten elements, ethnic patterns, playful composition, Katsumi Asaba style, cultural heritage",
};

export class KatsumiAsabaAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Katsumi Asaba */ h1 { font-style: italic; transform: rotate(-2deg); }`;
  }
}
export const katsumiAsaba = new KatsumiAsabaAgent();
