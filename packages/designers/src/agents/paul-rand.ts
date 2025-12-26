/**
 * Agent 09: Paul Rand
 * Category: Witty Symbolism
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_09",
  name: "Paul Rand",
  name_en: "Paul Rand",
  category: "Witty Symbolism",
  group: "B",
  philosophy: {
    core: "複雑な概念を最も単純な図形と言葉遊びで解決",
    principles: ["切り絵的フォルム", "遊びと規律", "普遍的シンボル"],
  },
  executionRules: [
    "切り絵のような単純な幾何学フォルム",
    "手書き文字とスラブセリフの組み合わせ",
    "鮮やかな色彩と黒の対比",
  ],
  designTokens: {
    typography: {
      primary: { family: '"Rockwell", "Clarendon", serif', weight: 700 },
      scale: [14, 18, 24, 36, 48, 64],
    },
    colors: {
      primary: "#E63946",
      secondary: "#1D3557",
      accent: "#F4A261",
      background: "#FFFFFF",
      text: "#1D3557",
    },
    spacing: { unit: 8, scale: [16, 24, 32, 48, 64] },
    layout: {
      maxWidth: "1100px",
      grid: { columns: 6, gutter: 24 },
      whitespaceRatio: 0.35,
    },
  },
  imagePromptTemplate:
    "Cut-paper collage style, simple geometric shapes, playful corporate identity, Paul Rand aesthetic, bold primary colors",
};

export class PaulRandAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Paul Rand */ .icon { border-radius: 50%; } h1 { font-family: var(--font-primary); letter-spacing: -0.02em; }`;
  }
}
export const paulRand = new PaulRandAgent();
