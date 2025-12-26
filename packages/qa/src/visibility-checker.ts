/**
 * Visibility Checker
 * Ensures protected elements remain visible and accessible
 */

import type { QAIssue } from "@ddpo/core";

/**
 * Check if element might be hidden by CSS
 */
export function checkVisibilityIssues(html: string, css: string): QAIssue[] {
  const issues: QAIssue[] = [];

  // Extract protected elements from HTML
  const protectedElements = extractProtectedElements(html);

  // Check for problematic CSS patterns
  for (const element of protectedElements) {
    const elementIssues = checkElementVisibility(element, css);
    issues.push(...elementIssues);
  }

  return issues;
}

/**
 * Extract protected element selectors from HTML
 */
function extractProtectedElements(html: string): string[] {
  const elements: string[] = [];
  const regex = /data-element="([^"]+)"[^>]*data-protected="true"/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    elements.push(match[1]);
  }

  return elements;
}

/**
 * Check visibility issues for a specific element
 */
function checkElementVisibility(elementId: string, css: string): QAIssue[] {
  const issues: QAIssue[] = [];
  const selector = `[data-element="${elementId}"]`;

  // Find CSS rules that might affect this element
  const relevantCSS = findRelevantCSS(css, elementId);

  // Check for display: none
  if (/display\s*:\s*none/i.test(relevantCSS)) {
    issues.push({
      type: "visibility",
      severity: "error",
      element: selector,
      message: `Protected element "${elementId}" has display: none`,
      autoFixable: true,
    });
  }

  // Check for visibility: hidden
  if (/visibility\s*:\s*hidden/i.test(relevantCSS)) {
    issues.push({
      type: "visibility",
      severity: "error",
      element: selector,
      message: `Protected element "${elementId}" has visibility: hidden`,
      autoFixable: true,
    });
  }

  // Check for opacity: 0
  if (/opacity\s*:\s*0(?![.\d])/i.test(relevantCSS)) {
    issues.push({
      type: "visibility",
      severity: "error",
      element: selector,
      message: `Protected element "${elementId}" has opacity: 0`,
      autoFixable: true,
    });
  }

  // Check for very small font size
  const fontSizeMatch = relevantCSS.match(
    /font-size\s*:\s*(\d+(?:\.\d+)?)(px|em|rem)/i,
  );
  if (fontSizeMatch) {
    const size = parseFloat(fontSizeMatch[1]);
    const unit = fontSizeMatch[2].toLowerCase();
    const pxSize = unit === "px" ? size : size * 16; // Assume 16px base

    if (pxSize < 12) {
      issues.push({
        type: "font_size",
        severity: "warning",
        element: selector,
        message: `Protected element "${elementId}" has very small font size (${pxSize}px)`,
        autoFixable: true,
      });
    }
  }

  // Check for negative z-index (might be hidden behind other elements)
  const zIndexMatch = relevantCSS.match(/z-index\s*:\s*(-?\d+)/i);
  if (zIndexMatch && parseInt(zIndexMatch[1], 10) < 0) {
    issues.push({
      type: "visibility",
      severity: "warning",
      element: selector,
      message: `Protected element "${elementId}" has negative z-index`,
      autoFixable: true,
    });
  }

  // Check for off-screen positioning
  if (/(?:left|right|top|bottom)\s*:\s*-\d{4,}px/i.test(relevantCSS)) {
    issues.push({
      type: "visibility",
      severity: "error",
      element: selector,
      message: `Protected element "${elementId}" appears to be positioned off-screen`,
      autoFixable: true,
    });
  }

  return issues;
}

/**
 * Find CSS rules that might apply to an element
 */
function findRelevantCSS(css: string, elementId: string): string {
  const relevantRules: string[] = [];
  const ruleRegex = /([^{]+)\{([^}]+)\}/g;
  let match;

  while ((match = ruleRegex.exec(css)) !== null) {
    const selector = match[1].trim();
    const declarations = match[2];

    // Check if selector might match the element
    if (
      selector.includes(`[data-element="${elementId}"]`) ||
      selector.includes("[data-protected") ||
      selector.includes("button") ||
      selector.includes(".cta") ||
      selector === "*"
    ) {
      relevantRules.push(declarations);
    }
  }

  return relevantRules.join("\n");
}

/**
 * Check if CTA buttons are clearly visible
 */
export function checkCTAVisibility(html: string, css: string): QAIssue[] {
  const issues: QAIssue[] = [];

  // Check for CTA elements
  const ctaRegex = /data-element="(?:cta|primary_cta|purchase-button)"[^>]*/g;
  const ctaElements = html.match(ctaRegex);

  if (!ctaElements || ctaElements.length === 0) {
    return issues;
  }

  // Check that CTA buttons have sufficient styling
  const hasCTAStyles = /\.cta|button|\[data-element.*cta\]/i.test(css);

  if (!hasCTAStyles) {
    issues.push({
      type: "visibility",
      severity: "warning",
      element: "[data-element='cta']",
      message: "CTA button may not have sufficient styling defined",
      autoFixable: true,
    });
  }

  return issues;
}
