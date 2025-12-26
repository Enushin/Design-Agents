/**
 * Agent 15: Otl Aicher
 * Category: Functional Pictogram
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_15",
  name: "Otl Aicher",
  name_en: "Otl Aicher",
  category: "Functional Pictogram",
  group: "B",
  philosophy: {
    core: "言語の壁を超えるピクトグラムで世界を整理",
    principles: ["ピクトグラム", "公共デザイン", "機能的システム"],
  },
  executionRules: [
    "ピクトグラムの多用",
    "レインボーカラーなどのシステマチックな色分け",
    "機能的で細身なサンセリフ体",
  ],
  designTokens: {
    typography: {
      primary: {
        family: '"Rotis Sans Serif", "Frutiger", sans-serif',
        weight: 400,
      },
      scale: [12, 14, 16, 20, 28, 36],
    },
    colors: {
      primary: "#0072BC",
      secondary: "#00A651",
      accent: "#F7941D",
      background: "#FFFFFF",
      text: "#231F20",
    },
    spacing: { unit: 8, scale: [8, 16, 24, 32, 48] },
    layout: {
      maxWidth: "1080px",
      grid: { columns: 12, gutter: 16 },
      whitespaceRatio: 0.3,
    },
  },
  imagePromptTemplate:
    "Olympic pictogram style, Otl Aicher Munich 1972 aesthetic, systematic color coding, universal wayfinding design",
};

export class OtlAicherAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Otl Aicher */ .icon { width: 48px; height: 48px; } .nav-item { display: flex; align-items: center; gap: 8px; }`;
  }
}
export const otlAicher = new OtlAicherAgent();
