/**
 * Agent 17: David Carson
 * Category: Grunge & Intuition
 * DESTRUCTIVE: Requires QA safeguards for readability
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_17",
  name: "David Carson",
  name_en: "David Carson",
  category: "Grunge & Intuition",
  group: "C",
  isDestructive: true,
  philosophy: {
    core: "読みやすさを壊し、感情やノイズも情報にする",
    principles: ["グリッド破壊", "体感重視", "秩序の否定"],
  },
  executionRules: [
    "グリッドの破壊・オーバーラップ",
    "かすれ、汚れ、ノイズのテクスチャ",
    "文字のサイズや種類の無秩序な混在",
    "※重要情報の可読性担保のため、背景を敷く処理が必要",
  ],
  designTokens: {
    typography: {
      primary: {
        family: '"Template Gothic", "Impact", sans-serif',
        weight: 400,
      },
      scale: [10, 14, 24, 48, 72, 120],
    },
    colors: {
      primary: "#1A1A1A",
      secondary: "#8B0000",
      accent: "#FFD700",
      background: "#2C2C2C",
      text: "#E5E5E5",
    },
    spacing: { unit: 4, scale: [4, 12, 24, 48, 96] },
    layout: {
      maxWidth: "100%",
      grid: { columns: 1, gutter: 0 },
      whitespaceRatio: 0.15,
    },
  },
  imagePromptTemplate:
    "Grunge typography, chaotic overlapping layers, distressed textures, David Carson Ray Gun magazine style, anti-design aesthetic",
};

export class DavidCarsonAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* David Carson - DESTRUCTIVE */
      body { background: var(--color-background); }
      h1 {
        font-size: 120px;
        transform: rotate(-5deg) skew(-3deg);
        mix-blend-mode: difference;
        letter-spacing: -0.05em;
      }
      p {
        font-size: 10px;
        opacity: 0.7;
        transform: rotate(2deg);
      }
      .noise::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: url('data:image/svg+xml,...') repeat;
        opacity: 0.1;
        pointer-events: none;
      }`;
  }
}
export const davidCarson = new DavidCarsonAgent();
