/**
 * Agent 01: 佐藤可士和 (Kashiwa Sato)
 * Category: Iconic Branding
 * Group: A (Japanese Aesthetics)
 */

import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_01",
  name: "佐藤可士和",
  name_en: "Kashiwa Sato",
  category: "Iconic Branding",
  group: "A",

  philosophy: {
    core: "対象を整理・分類し、最も強い「アイコン」に変換する",
    principles: [
      "遠くから見ても0.1秒で識別できるか",
      "情緒や物語を排除する",
      "記号としての強度を最大化する",
    ],
  },

  executionRules: [
    "フォントは太いゴシック体（Sans-serif Bold）を使用",
    "配色は原色（赤・青・黄）または白黒のハイコントラスト",
    "レイアウトはグリッドに沿った明確なボックス構成",
  ],

  designTokens: {
    typography: {
      primary: {
        family: '"Helvetica Neue", Arial, sans-serif',
        weight: 900,
      },
      scale: [14, 18, 24, 36, 48, 72, 96, 128],
    },
    colors: {
      primary: "#FF0000", // Pure Red
      secondary: "#0000FF", // Pure Blue
      accent: "#FFFF00", // Pure Yellow
      background: "#FFFFFF",
      text: "#000000",
    },
    spacing: {
      unit: 8,
      scale: [8, 16, 24, 32, 48, 64, 96],
    },
    layout: {
      maxWidth: "1200px",
      grid: { columns: 12, gutter: 24 },
      whitespaceRatio: 0.3,
    },
  },

  imagePromptTemplate: `Minimalist iconic design, bold geometric shapes,
primary colors (red, blue, yellow), high contrast,
clean lines, no gradients, no textures,
corporate identity design, logo style,
Kashiwa Sato inspired, Japanese modern design`,

  isDestructive: false,
};

export class KashiwaSatoAgent extends DesignerAgent {
  constructor() {
    super(config);
  }

  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `
/* Kashiwa Sato - Iconic Branding Style */

/* Bold Headlines */
h1, .headline {
  font-size: 96px;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.0;
  text-transform: uppercase;
}

h2, .subheadline {
  font-size: 48px;
  font-weight: 900;
  letter-spacing: -0.01em;
}

/* Primary Color Blocks */
.hero {
  background-color: var(--color-primary);
  color: #FFFFFF;
  padding: 64px;
}

.hero--blue {
  background-color: var(--color-secondary);
}

.hero--yellow {
  background-color: var(--color-accent);
  color: #000000;
}

/* Grid-based Box Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(var(--layout-columns), 1fr);
  gap: var(--layout-gutter);
}

.box {
  border: 4px solid var(--color-text);
  padding: 32px;
}

/* CTA Button - Bold and Clear */
.cta, [data-element="cta"] button {
  background-color: var(--color-text);
  color: var(--color-background);
  font-size: 24px;
  font-weight: 900;
  padding: 24px 48px;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s;
}

.cta:hover {
  transform: scale(1.05);
}

/* Icon-style Images */
.icon-image {
  max-width: 200px;
  filter: contrast(1.2);
}

/* High Contrast Text */
.text-contrast {
  color: var(--color-text);
  background-color: var(--color-background);
  padding: 16px;
}
`;
  }

  protected getNegativePrompt(): string {
    return "gradients, textures, shadows, soft edges, pastel colors, watercolor, organic shapes, handwritten, decorative, ornate";
  }
}

// Export singleton instance
export const kashiwaSato = new KashiwaSatoAgent();
