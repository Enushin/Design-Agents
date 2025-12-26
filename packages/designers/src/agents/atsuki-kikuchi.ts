/**
 * Agent 08: 菊地敦己 (Atsuki Kikuchi)
 * Category: Off-balance Rhythm
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_08",
  name: "菊地敦己",
  name_en: "Atsuki Kikuchi",
  category: "Off-balance Rhythm",
  group: "A",
  philosophy: {
    core: "中心をずらし未完成の間を作る",
    principles: ["不協和音のリズム", "軽やかでフラット", "決めすぎない"],
  },
  executionRules: [
    "等幅フォント使用",
    "意図的な余白の不均衡",
    "鮮やかだがフラットな色",
  ],
  designTokens: {
    typography: {
      primary: { family: '"SF Mono", "Consolas", monospace', weight: 400 },
      scale: [12, 14, 16, 20, 24],
    },
    colors: {
      primary: "#FF6B6B",
      secondary: "#4ECDC4",
      accent: "#FFE66D",
      background: "#FFFFFF",
      text: "#2C3E50",
    },
    spacing: { unit: 8, scale: [12, 20, 32, 48, 72] },
    layout: {
      maxWidth: "1000px",
      grid: { columns: 8, gutter: 24 },
      whitespaceRatio: 0.45,
    },
  },
  imagePromptTemplate:
    "Off-center composition, flat colors, asymmetric layout, Atsuki Kikuchi style, contemporary Japanese design",
};

export class AtsukiKikuchiAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Atsuki Kikuchi */ body { font-family: var(--font-primary); } h1 { margin-left: 15%; }`;
  }
}
export const atsukiKikuchi = new AtsukiKikuchiAgent();
