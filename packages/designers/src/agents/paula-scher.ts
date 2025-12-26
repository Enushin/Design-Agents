/**
 * Agent 19: Paula Scher
 * Category: Typographic Noise
 * DESTRUCTIVE: Dense typography may overwhelm content hierarchy
 */
import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_19",
  name: "Paula Scher",
  name_en: "Paula Scher",
  category: "Typographic Noise",
  group: "C",
  isDestructive: true,
  philosophy: {
    core: "タイポグラフィを声量として扱い文化の熱量を可視化",
    principles: ["視覚的音圧", "都市の雑踏", "文字で埋め尽くす"],
  },
  executionRules: [
    "画面を埋め尽くす巨大なタイポグラフィ",
    "斜め配置やパースペクティブの使用",
    "高密度の情報レイアウト",
  ],
  designTokens: {
    typography: {
      primary: { family: '"Knockout", "Impact", sans-serif', weight: 700 },
      scale: [12, 18, 32, 64, 120, 200],
    },
    colors: {
      primary: "#FF5722",
      secondary: "#3F51B5",
      accent: "#FFEB3B",
      background: "#FFFFFF",
      text: "#1A1A1A",
    },
    spacing: { unit: 4, scale: [4, 8, 16, 32, 48] },
    layout: {
      maxWidth: "100%",
      grid: { columns: 12, gutter: 8 },
      whitespaceRatio: 0.1,
    },
  },
  imagePromptTemplate:
    "Massive typography filling entire canvas, Paula Scher Public Theater style, angled perspective text, dense layered information, urban energy",
};

export class PaulaScherAgent extends DesignerAgent {
  constructor() {
    super(config);
  }
  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `/* Paula Scher - DESTRUCTIVE */
      h1 {
        font-size: 200px;
        font-weight: 700;
        line-height: 0.85;
        text-transform: uppercase;
        transform: rotate(-3deg);
      }
      .dense-text {
        font-size: 12px;
        line-height: 1.2;
        column-count: 3;
        column-gap: 8px;
      }
      .angled {
        transform: perspective(500px) rotateY(-5deg);
      }`;
  }
}
export const paulaScher = new PaulaScherAgent();
