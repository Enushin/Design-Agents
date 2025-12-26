/**
 * Agent 11: Josef Müller-Brockmann
 * Category: Swiss Objective
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_11",
  name: "Josef Müller-Brockmann",
  name_en: "Josef Müller-Brockmann",
  category: "Swiss Objective",
  group: "B",
  philosophy: {
    core: "数学的グリッドに基づく客観的配置",
    principles: ["モジュラーグリッド", "主観排除", "効率的伝達"],
  },
  executionRules: [
    "モジュラーグリッドシステム",
    "Akzidenz-Grotesk または Helvetica",
    "写真はトリミングせず長方形で使用",
  ],
  designTokens: {
    typography: {
      primary: {
        family: '"Akzidenz-Grotesk", "Helvetica", sans-serif',
        weight: 400,
      },
      scale: [11, 14, 18, 24, 32, 48],
    },
    colors: {
      primary: "#000000",
      secondary: "#E30613",
      accent: "#FFCC00",
      background: "#FFFFFF",
      text: "#000000",
    },
    spacing: { unit: 8, scale: [8, 16, 24, 40, 64] },
    layout: {
      maxWidth: "1080px",
      grid: { columns: 12, gutter: 20 },
      whitespaceRatio: 0.35,
    },
  },
  imagePromptTemplate:
    "Swiss International Style, modular grid, objective photography, Josef Müller-Brockmann poster style, geometric shapes",
};

export class JosefMullerBrockmannAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Josef Müller-Brockmann */ img { object-fit: contain; } .grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px; }`;
  }
}
export const josefMullerBrockmann = new JosefMullerBrockmannAgent();
