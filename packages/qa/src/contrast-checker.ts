/**
 * Contrast Checker
 * WCAG 2.1 compliant contrast ratio checking
 */

import type { QAIssue } from "@ddpo/core";

/**
 * Parse color string to RGB values
 */
export function parseColor(
  color: string,
): { r: number; g: number; b: number } | null {
  // Handle hex colors
  const hexMatch = color.match(/^#([0-9a-f]{3,8})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };
    } else if (hex.length >= 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };
    }
  }

  // Handle rgb/rgba colors
  const rgbMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }

  // Handle named colors (common ones)
  const namedColors: Record<string, { r: number; g: number; b: number }> = {
    white: { r: 255, g: 255, b: 255 },
    black: { r: 0, g: 0, b: 0 },
    red: { r: 255, g: 0, b: 0 },
    green: { r: 0, g: 128, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
    yellow: { r: 255, g: 255, b: 0 },
    transparent: { r: 255, g: 255, b: 255 }, // Treat as white
  };

  const normalized = color.toLowerCase().trim();
  if (namedColors[normalized]) {
    return namedColors[normalized];
  }

  return null;
}

/**
 * Calculate relative luminance
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function getContrastRatio(
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number },
): number {
  const l1 = getRelativeLuminance(color1.r, color1.g, color1.b);
  const l2 = getRelativeLuminance(color2.r, color2.g, color2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * WCAG Level AA requirements
 */
export const WCAG_AA = {
  normalText: 4.5,
  largeText: 3.0, // 18pt+ or 14pt bold+
  uiComponents: 3.0,
};

/**
 * WCAG Level AAA requirements
 */
export const WCAG_AAA = {
  normalText: 7.0,
  largeText: 4.5,
};

/**
 * Check if contrast meets WCAG requirements
 */
export function meetsWCAG(
  ratio: number,
  level: "AA" | "AAA" = "AA",
  isLargeText: boolean = false,
): boolean {
  const requirements = level === "AA" ? WCAG_AA : WCAG_AAA;
  const threshold = isLargeText
    ? requirements.largeText
    : requirements.normalText;
  return ratio >= threshold;
}

/**
 * Extract color declarations from CSS
 */
export function extractColorPairs(css: string): Array<{
  selector: string;
  color?: string;
  backgroundColor?: string;
}> {
  const pairs: Array<{
    selector: string;
    color?: string;
    backgroundColor?: string;
  }> = [];

  // Simple regex-based extraction (for production, use a proper CSS parser)
  const ruleRegex = /([^{]+)\{([^}]+)\}/g;
  let match;

  while ((match = ruleRegex.exec(css)) !== null) {
    const selector = match[1].trim();
    const declarations = match[2];

    const colorMatch = declarations.match(
      /(?<!background-)color\s*:\s*([^;]+)/i,
    );
    const bgMatch = declarations.match(/background(?:-color)?\s*:\s*([^;]+)/i);

    if (colorMatch || bgMatch) {
      pairs.push({
        selector,
        color: colorMatch?.[1]?.trim(),
        backgroundColor: bgMatch?.[1]?.trim(),
      });
    }
  }

  return pairs;
}

/**
 * Check contrast issues in CSS
 */
export function checkContrastInCSS(css: string): QAIssue[] {
  const issues: QAIssue[] = [];
  const pairs = extractColorPairs(css);

  for (const pair of pairs) {
    if (!pair.color || !pair.backgroundColor) {
      continue;
    }

    const fg = parseColor(pair.color);
    const bg = parseColor(pair.backgroundColor);

    if (!fg || !bg) {
      continue;
    }

    const ratio = getContrastRatio(fg, bg);

    if (!meetsWCAG(ratio, "AA", false)) {
      issues.push({
        type: "contrast_ratio",
        severity: ratio < 3.0 ? "error" : "warning",
        element: pair.selector,
        message: `Contrast ratio ${ratio.toFixed(2)}:1 does not meet WCAG AA (requires 4.5:1). Color: ${pair.color}, Background: ${pair.backgroundColor}`,
        autoFixable: true,
      });
    }
  }

  return issues;
}
