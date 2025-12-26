/**
 * Agent 16: Dieter Rams
 * Category: Less but Better
 * Group: B (Western Modernism)
 */

import type { LockedSpecification, DesignerAgentConfig } from "@ddpo/core";
import { DesignerAgent } from "../base.js";

const config: DesignerAgentConfig = {
  id: "agent_16",
  name: "Dieter Rams",
  category: "Less but Better",
  group: "B",

  philosophy: {
    core: "より少なく、しかしより良く (Less, but better)",
    principles: [
      "Good design is innovative",
      "Good design makes a product useful",
      "Good design is aesthetic",
      "Good design makes a product understandable",
      "Good design is unobtrusive",
      "Good design is honest",
      "Good design is long-lasting",
      "Good design is thorough down to the last detail",
      "Good design is environmentally friendly",
      "Good design is as little design as possible",
    ],
  },

  executionRules: [
    "極ミニマルなUI/レイアウト",
    "彩度を落とした配色と、機能部のみへのアクセントカラー",
    "整然としたアライメント",
  ],

  designTokens: {
    typography: {
      primary: {
        family:
          '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
        weight: 400,
      },
      secondary: {
        family:
          '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
        weight: 300,
      },
      scale: [12, 14, 16, 20, 24, 32],
    },
    colors: {
      primary: "#F5F5F5", // Light gray
      secondary: "#E5E5E5",
      accent: "#FF6B00", // Braun orange - functional accent only
      background: "#FFFFFF",
      text: "#1A1A1A",
      muted: "#666666",
    },
    spacing: {
      unit: 8,
      scale: [8, 16, 24, 32, 48, 64],
    },
    layout: {
      maxWidth: "960px",
      grid: { columns: 8, gutter: 16 },
      whitespaceRatio: 0.5,
    },
  },

  imagePromptTemplate: `Ultra minimalist product design, Braun aesthetic,
matte surfaces, clean geometric forms, functional simplicity,
no decoration, neutral colors with single orange accent,
Dieter Rams industrial design style,
studio lighting, white background, product photography`,

  isDestructive: false,
};

export class DieterRamsAgent extends DesignerAgent {
  constructor() {
    super(config);
  }

  protected generateAgentSpecificCSS(spec: LockedSpecification): string {
    return `
/* Dieter Rams - Less but Better Style */

/* Clean, Functional Base */
body {
  font-feature-settings: 'kern' 1, 'liga' 1;
  -webkit-font-smoothing: antialiased;
}

/* Minimal Typography */
h1, .headline {
  font-size: 32px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin-bottom: 24px;
}

h2, .subheadline {
  font-size: 20px;
  font-weight: 400;
  color: var(--color-muted, #666);
}

p, .body-text {
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text);
}

/* Functional Grid Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 16px;
}

.grid-full { grid-column: 1 / -1; }
.grid-half { grid-column: span 4; }
.grid-third { grid-column: span 3; }

/* Matte Surface Cards */
.card {
  background: var(--color-primary);
  padding: 32px;
  border-radius: 2px;
}

/* Functional CTA - Orange Accent */
.cta, [data-element="cta"] button {
  background-color: var(--color-accent);
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 500;
  padding: 16px 32px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.cta:hover {
  opacity: 0.9;
}

/* Secondary Button */
.cta-secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-secondary);
}

/* Clean Image Presentation */
.image-container {
  background: var(--color-primary);
  padding: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  max-width: 100%;
  height: auto;
}

/* Functional Form Elements */
input, textarea, select {
  font-family: inherit;
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid var(--color-secondary);
  border-radius: 2px;
  background: var(--color-background);
  width: 100%;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--color-accent);
}

/* Minimal Dividers */
hr, .divider {
  border: none;
  border-top: 1px solid var(--color-secondary);
  margin: 48px 0;
}

/* Navigation - Clean and Functional */
nav {
  display: flex;
  gap: 32px;
  padding: 24px 0;
}

nav a {
  color: var(--color-muted);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

nav a:hover, nav a.active {
  color: var(--color-text);
}

/* Product Features - Icon + Text */
.feature {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.feature-icon {
  width: 24px;
  height: 24px;
  color: var(--color-accent);
}

/* Systematic Spacing */
section {
  padding: 64px 0;
}

.space-sm { margin-bottom: 16px; }
.space-md { margin-bottom: 32px; }
.space-lg { margin-bottom: 64px; }
`;
  }

  protected getNegativePrompt(): string {
    return "decorative, ornate, colorful, busy, cluttered, gradients, shadows, glossy, shiny, reflective, patterns, textures, vintage, retro";
  }
}

// Export singleton instance
export const dieterRams = new DieterRamsAgent();
