/**
 * Auto Fixer
 * Automatically fixes common accessibility and visibility issues
 */

import type { QAIssue, AutoFix, AutoFixType } from "@ddpo/core";
import { parseColor, getContrastRatio } from "./contrast-checker.js";

/**
 * Generate auto-fixes for QA issues
 */
export function generateAutoFixes(issues: QAIssue[]): AutoFix[] {
  const fixes: AutoFix[] = [];

  for (const issue of issues) {
    if (!issue.autoFixable) {
      continue;
    }

    const fix = generateFix(issue);
    if (fix) {
      fixes.push(fix);
    }
  }

  return fixes;
}

/**
 * Generate a fix for a single issue
 */
function generateFix(issue: QAIssue): AutoFix | null {
  switch (issue.type) {
    case "contrast_ratio":
      return generateContrastFix(issue);
    case "visibility":
      return generateVisibilityFix(issue);
    case "font_size":
      return generateFontSizeFix(issue);
    case "protected_element":
      return generateProtectedElementFix(issue);
    default:
      return null;
  }
}

/**
 * Generate fix for contrast issues
 */
function generateContrastFix(issue: QAIssue): AutoFix {
  // Add a semi-transparent background to improve contrast
  return {
    type: "add_background",
    target: issue.element,
    css: `
${issue.element} {
  position: relative;
}

${issue.element}::before {
  content: '';
  position: absolute;
  inset: -4px;
  background: rgba(255, 255, 255, 0.9);
  z-index: -1;
  border-radius: 4px;
}
`.trim(),
  };
}

/**
 * Generate fix for visibility issues
 */
function generateVisibilityFix(issue: QAIssue): AutoFix {
  let css = "";

  if (issue.message.includes("display: none")) {
    css = `${issue.element} { display: block !important; }`;
  } else if (issue.message.includes("visibility: hidden")) {
    css = `${issue.element} { visibility: visible !important; }`;
  } else if (issue.message.includes("opacity: 0")) {
    css = `${issue.element} { opacity: 1 !important; }`;
  } else if (issue.message.includes("z-index")) {
    css = `${issue.element} { z-index: 9999 !important; position: relative !important; }`;
  } else if (issue.message.includes("off-screen")) {
    css = `${issue.element} {
  position: relative !important;
  left: auto !important;
  right: auto !important;
  top: auto !important;
  bottom: auto !important;
}`;
  } else {
    // Generic visibility fix
    css = `${issue.element} {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  position: relative !important;
  z-index: 100 !important;
}`;
  }

  return {
    type: "force_zindex",
    target: issue.element,
    css,
  };
}

/**
 * Generate fix for font size issues
 */
function generateFontSizeFix(issue: QAIssue): AutoFix {
  return {
    type: "increase_font_size",
    target: issue.element,
    css: `${issue.element} { font-size: 14px !important; line-height: 1.4 !important; }`,
  };
}

/**
 * Generate fix for protected element issues
 */
function generateProtectedElementFix(issue: QAIssue): AutoFix {
  return {
    type: "add_background",
    target: issue.element,
    css: `
${issue.element} {
  position: relative !important;
  z-index: 9999 !important;
}

${issue.element}::before {
  content: '' !important;
  position: absolute !important;
  inset: -8px !important;
  background: rgba(255, 255, 255, 0.95) !important;
  z-index: -1 !important;
  border-radius: 4px !important;
}
`.trim(),
  };
}

/**
 * Apply fixes to CSS
 */
export function applyFixes(originalCSS: string, fixes: AutoFix[]): string {
  if (fixes.length === 0) {
    return originalCSS;
  }

  const fixCSS = fixes.map((fix) => fix.css).join("\n\n");

  return `${originalCSS}

/* ============================================================ */
/* AUTO-GENERATED ACCESSIBILITY FIXES                           */
/* These fixes were automatically applied to ensure visibility  */
/* and accessibility of protected elements.                     */
/* ============================================================ */

${fixCSS}
`;
}

/**
 * Generate comprehensive safeguard CSS for destructive designers
 */
export function generateDestructiveSafeguards(): string {
  return `
/* ============================================================ */
/* SAFEGUARDS FOR DESTRUCTIVE DESIGNER STYLES                   */
/* These rules ensure protected elements remain visible         */
/* regardless of artistic design choices.                       */
/* ============================================================ */

/* Force visibility of protected elements */
[data-protected="true"] {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  position: relative !important;
  z-index: 9999 !important;
}

/* Add readable background behind protected content */
[data-protected="true"]::before {
  content: '' !important;
  position: absolute !important;
  inset: -8px !important;
  background: rgba(255, 255, 255, 0.95) !important;
  z-index: -1 !important;
  border-radius: 4px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

/* Ensure CTA buttons are always clickable and readable */
[data-protected="true"] button,
[data-protected="true"] a,
[data-element="cta"],
[data-element="primary_cta"] {
  position: relative !important;
  z-index: 1 !important;
  display: inline-block !important;
  min-width: 120px !important;
  padding: 12px 24px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  text-align: center !important;
  cursor: pointer !important;
  background-color: #000000 !important;
  color: #FFFFFF !important;
  border: none !important;
  border-radius: 4px !important;
}

[data-protected="true"] button:hover,
[data-protected="true"] a:hover,
[data-element="cta"]:hover,
[data-element="primary_cta"]:hover {
  background-color: #333333 !important;
}

/* Ensure price information is always readable */
[data-element="price"] {
  font-size: 18px !important;
  font-weight: 700 !important;
  color: #000000 !important;
}

/* Locked text elements must be readable */
[data-locked-text="true"] {
  color: inherit !important;
  -webkit-text-stroke: 0 !important;
  text-shadow: none !important;
}
`;
}
