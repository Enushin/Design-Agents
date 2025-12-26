/**
 * Agent 02: 原研哉 (Kenya Hara)
 * Category: Emptiness (Ku)
 * Group: A (Japanese Aesthetics)
 */

import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_02",
  name: "原研哉",
  name_en: "Kenya Hara",
  category: "Emptiness (Ku)",
  group: "A",

  philosophy: {
    core: "「白」を単なる色ではなく、情報の器（Emptiness）として扱う",
    principles: [
      "圧倒的な余白によって対象の存在感を際立たせる",
      "視覚情報の中に触覚（紙の質感、湿度）を喚起させる",
      "テキストは極めて小さく配置する",
    ],
  },

  executionRules: [
    "画面の70%以上を余白（White space）とする",
    "繊細な明朝体（Serif）を使用",
    "画像にはテクスチャ感（紙、布、水）を含ませる",
  ],

  designTokens: {
    typography: {
      primary: {
        family: '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
        weight: 300,
      },
      secondary: {
        family: '"Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
        weight: 300,
      },
      scale: [10, 12, 14, 16, 20, 24], // Smaller scale
    },
    colors: {
      primary: "#FAFAFA",
      secondary: "#F5F5F5",
      accent: "#E0E0E0",
      background: "#FFFFFF",
      text: "#333333",
      subtle: "#999999",
    },
    spacing: {
      unit: 8,
      scale: [16, 32, 48, 64, 96, 128, 192],
    },
    layout: {
      maxWidth: "960px",
      grid: { columns: 6, gutter: 48 },
      whitespaceRatio: 0.7, // 70% whitespace
    },
  },

  imagePromptTemplate: `Minimalist Japanese aesthetic, vast white space,
delicate textures of paper, fabric, or water,
subtle shadows, tactile quality, serene and contemplative mood,
Kenya Hara / MUJI design style,
high-key photography, soft diffused light,
zen simplicity, wabi-sabi aesthetic`,

  isDestructive: false,
};

export class KenyaHaraAgent extends DesignerAgent {
  constructor() {
    super(config);
  }

  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `
/* Kenya Hara - Emptiness (Ku) Style */

/* Vast Whitespace */
body {
  padding: 10vh 5vw;
}

.container {
  max-width: 800px;
}

/* Delicate Typography */
h1, .headline {
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 96px;
}

h2, .subheadline {
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.08em;
  color: var(--color-subtle, #999);
}

p, .body-text {
  font-size: 14px;
  line-height: 2.0;
  letter-spacing: 0.02em;
  max-width: 600px;
}

/* Centered, Minimal Layout */
.hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-content {
  max-width: 400px;
}

/* Subtle Borders */
.divider {
  border: none;
  border-top: 1px solid #E0E0E0;
  margin: 96px 0;
}

/* Image with Texture */
.image-container {
  position: relative;
  overflow: hidden;
}

.image-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%);
  pointer-events: none;
}

.image-container img {
  filter: contrast(0.95) brightness(1.02);
}

/* CTA - Minimal, Understated */
.cta, [data-element="cta"] button {
  background: transparent;
  color: var(--color-text);
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.15em;
  padding: 16px 32px;
  border: 1px solid var(--color-text);
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta:hover {
  background: var(--color-text);
  color: var(--color-background);
}

/* Spacious Sections */
section {
  padding: 128px 0;
}

/* Small Details */
.caption {
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--color-subtle, #999);
  text-transform: uppercase;
}
`;
  }

  protected getNegativePrompt(): string {
    return "cluttered, busy, colorful, saturated, bold, heavy, dark, dramatic, loud, flashy, decorative patterns, gradients";
  }
}

// Export singleton instance
export const kenyaHara = new KenyaHaraAgent();
