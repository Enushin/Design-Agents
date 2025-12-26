/**
 * Agent 20: Neville Brody
 * Category: Radical Type
 * DESTRUCTIVE: Experimental typography may compromise readability
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_20",
  name: "Neville Brody",
  name_en: "Neville Brody",
  category: "Radical Type",
  group: "C",
  isDestructive: true,
  philosophy: {
    core: "タイポはルールではなく表現そのもの",
    principles: ["サブカル文脈", "デジタルエッジ", "既成フォント加工"],
  },
  executionRules: [
    "ぼかし、引き伸ばしなどの文字加工",
    "雑誌的なエッジの効いたレイアウト",
    "黒背景やネオンカラーなどクラブカルチャー的配色",
  ],
  designTokens: {
    typography: {
      primary: { family: '"FF Blur", "Arial Black", sans-serif', weight: 700 },
      scale: [12, 16, 24, 40, 64, 96],
    },
    colors: {
      primary: "#00FFFF",
      secondary: "#FF00FF",
      accent: "#FFFF00",
      background: "#0A0A0A",
      text: "#FFFFFF",
    },
    spacing: { unit: 8, scale: [8, 16, 32, 48, 80] },
    layout: {
      maxWidth: "1400px",
      grid: { columns: 12, gutter: 16 },
      whitespaceRatio: 0.25,
    },
  },
  imagePromptTemplate:
    "Experimental typography, Neville Brody The Face magazine style, blurred stretched letterforms, neon colors on black, club culture aesthetic",
};

export class NevilleBrodyAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Neville Brody - DESTRUCTIVE */
      body {
        background: var(--color-background);
        color: var(--color-text);
      }
      h1 {
        font-size: 96px;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        filter: blur(1px);
        text-shadow: 0 0 20px var(--color-primary);
      }
      .stretched {
        transform: scaleX(1.5);
        transform-origin: left;
      }
      .neon {
        text-shadow:
          0 0 5px var(--color-primary),
          0 0 10px var(--color-primary),
          0 0 20px var(--color-primary);
      }`;
  }
}
export const nevilleBrody = new NevilleBrodyAgent();
