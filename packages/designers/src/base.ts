/**
 * Designer Agent Base Class
 * All 20 designer agents extend this base class
 */

import type {
  DesignerAgentConfig,
  LockedSpecification,
  StyleDefinition,
  ImagePrompt,
  DesignTokens,
} from "@ddpo/core";

export abstract class DesignerAgent {
  readonly id: string;
  readonly name: string;
  readonly name_en?: string;
  readonly category: string;
  readonly group: "A" | "B" | "C";
  readonly philosophy: { core: string; principles: string[] };
  readonly executionRules: string[];
  readonly designTokens: DesignTokens;
  readonly imagePromptTemplate: string;
  readonly isDestructive: boolean;

  constructor(config: DesignerAgentConfig) {
    this.id = config.id;
    this.name = config.name;
    this.name_en = config.name_en;
    this.category = config.category;
    this.group = config.group;
    this.philosophy = config.philosophy;
    this.executionRules = config.executionRules;
    this.designTokens = config.designTokens;
    this.imagePromptTemplate = config.imagePromptTemplate;
    this.isDestructive = config.isDestructive ?? false;
  }

  /**
   * Generate CSS/Style based on locked specification
   */
  async generateStyle(spec: LockedSpecification): Promise<StyleDefinition> {
    const cssVariables = this.generateCSSVariables();
    const css = this.generateCSS(spec, cssVariables);
    const imagePrompts = this.generateImagePrompts(spec);

    return {
      agent_id: this.id,
      css,
      cssVariables,
      imagePrompts,
    };
  }

  /**
   * Generate CSS variables from design tokens
   */
  protected generateCSSVariables(): Record<string, string> {
    const { typography, colors, spacing, layout } = this.designTokens;

    return {
      // Typography
      "--font-primary": typography.primary.family,
      "--font-weight-primary": String(typography.primary.weight),
      ...(typography.secondary && {
        "--font-secondary": typography.secondary.family,
        "--font-weight-secondary": String(typography.secondary.weight),
      }),

      // Colors
      "--color-primary": colors.primary,
      "--color-secondary": colors.secondary,
      "--color-accent": colors.accent,
      "--color-background": colors.background,
      "--color-text": colors.text,

      // Spacing
      "--spacing-unit": `${spacing.unit}px`,

      // Layout
      "--layout-max-width": layout.maxWidth ?? "1200px",
      "--layout-columns": String(layout.grid.columns),
      "--layout-gutter": `${layout.grid.gutter}px`,
      "--whitespace-ratio": String(layout.whitespaceRatio),
    };
  }

  /**
   * Generate CSS based on design tokens and specification
   * Override in subclass for agent-specific styling
   */
  protected generateCSS(
    spec: LockedSpecification,
    variables: Record<string, string>,
  ): string {
    const variableDeclarations = Object.entries(variables)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n");

    return `
:root {
${variableDeclarations}
}

/* Base Styles - ${this.name} (${this.category}) */
body {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-primary);
  color: var(--color-text);
  background-color: var(--color-background);
  line-height: 1.6;
}

/* Typography Scale */
${this.generateTypographyScale()}

/* Layout */
.container {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 0 var(--layout-gutter);
}

/* Protected Elements (CTA, etc.) */
[data-protected="true"] {
  position: relative;
  z-index: 100;
}

/* Agent-specific styles */
${this.generateAgentSpecificCSS(spec)}
`.trim();
  }

  /**
   * Generate typography scale CSS
   */
  protected generateTypographyScale(): string {
    const scale = this.designTokens.typography.scale;
    return scale
      .map(
        (size, index) => `
.text-${index + 1} {
  font-size: ${size}px;
}`,
      )
      .join("\n");
  }

  /**
   * Generate agent-specific CSS
   * Override in subclass
   */
  protected abstract generateAgentSpecificCSS(
    spec: LockedSpecification,
  ): string;

  /**
   * Generate image prompts for image elements
   */
  protected generateImagePrompts(spec: LockedSpecification): ImagePrompt[] {
    const imageElements = spec.style_allowed_elements.filter(
      (el) => el.includes("image") || el.includes("hero"),
    );

    return imageElements.map((element_id) => ({
      element_id,
      prompt: this.buildImagePrompt(element_id, spec),
      negative_prompt: this.getNegativePrompt(),
    }));
  }

  /**
   * Build image prompt for specific element
   */
  protected buildImagePrompt(
    element_id: string,
    spec: LockedSpecification,
  ): string {
    // Combine template with context
    const context = this.extractContextForImage(element_id, spec);
    return `${this.imagePromptTemplate}\n\nContext: ${context}`;
  }

  /**
   * Extract context for image generation
   */
  protected extractContextForImage(
    element_id: string,
    spec: LockedSpecification,
  ): string {
    const element = spec.required_elements.find((el) => el.id === element_id);
    return element?.content ?? `${spec.goal} design for ${element_id}`;
  }

  /**
   * Get negative prompt for image generation
   * Override in subclass for agent-specific exclusions
   */
  protected getNegativePrompt(): string {
    return "low quality, blurry, distorted, watermark, text overlay";
  }

  /**
   * Validate output against execution rules
   */
  validateOutput(css: string): { valid: boolean; issues: string[] } {
    const issues: string[] = [];

    // Basic validation - override in subclass for specific rules
    if (!css.includes("font-family")) {
      issues.push("Missing font-family declaration");
    }

    return {
      valid: issues.length === 0,
      issues,
    };
  }
}
