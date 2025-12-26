/**
 * @ddpo/qa
 * QA Validator for DDPO
 */

import type { QAResult, QAIssue, AutoFix, DesignOutput } from "@ddpo/core";
import { checkContrastInCSS } from "./contrast-checker.js";
import {
  checkVisibilityIssues,
  checkCTAVisibility,
} from "./visibility-checker.js";
import {
  generateAutoFixes,
  applyFixes,
  generateDestructiveSafeguards,
} from "./auto-fixer.js";

// Re-export utilities
export * from "./contrast-checker.js";
export * from "./visibility-checker.js";
export * from "./auto-fixer.js";

/**
 * List of destructive designer agent IDs
 * These designers may create styles that compromise readability
 */
const DESTRUCTIVE_DESIGNERS = [
  "agent_17", // David Carson
  "agent_18", // Stefan Sagmeister
  "agent_19", // Paula Scher
  "agent_20", // Neville Brody
];

/**
 * QA Validator
 * Validates design output for accessibility and visibility
 */
export class QAValidator {
  /**
   * Validate design output
   */
  validate(html: string, css: string, agentId?: string): QAResult {
    const issues: QAIssue[] = [];

    // Check contrast ratios
    issues.push(...checkContrastInCSS(css));

    // Check visibility of protected elements
    issues.push(...checkVisibilityIssues(html, css));

    // Check CTA visibility
    issues.push(...checkCTAVisibility(html, css));

    // Generate auto-fixes
    let autoFixes = generateAutoFixes(issues);

    // Add destructive designer safeguards if needed
    if (agentId && DESTRUCTIVE_DESIGNERS.includes(agentId)) {
      autoFixes = [
        ...autoFixes,
        {
          type: "add_background" as const,
          target: "[data-protected]",
          css: generateDestructiveSafeguards(),
        },
      ];
    }

    // Calculate score
    const score = this.calculateScore(issues);

    return {
      passed: issues.filter((i) => i.severity === "error").length === 0,
      score,
      issues,
      autoFixes,
    };
  }

  /**
   * Validate and fix design output
   */
  validateAndFix(
    html: string,
    css: string,
    agentId?: string,
  ): QAResult & { fixedCss: string } {
    const result = this.validate(html, css, agentId);
    const fixedCss = applyFixes(css, result.autoFixes);

    return {
      ...result,
      fixedCss,
    };
  }

  /**
   * Validate a complete DesignOutput
   */
  validateOutput(output: DesignOutput): QAResult {
    return this.validate(output.html, output.css, output.agent_id);
  }

  /**
   * Apply fixes to a DesignOutput
   */
  fixOutput(output: DesignOutput): DesignOutput {
    const result = this.validateAndFix(
      output.html,
      output.css,
      output.agent_id,
    );

    return {
      ...output,
      css: result.fixedCss,
      qa_passed: result.passed,
      qa_issues: result.issues,
    };
  }

  /**
   * Calculate QA score (0-100)
   */
  private calculateScore(issues: QAIssue[]): number {
    if (issues.length === 0) {
      return 100;
    }

    // Deduct points based on severity
    let deductions = 0;

    for (const issue of issues) {
      switch (issue.severity) {
        case "error":
          deductions += 15;
          break;
        case "warning":
          deductions += 5;
          break;
      }
    }

    return Math.max(0, 100 - deductions);
  }

  /**
   * Check if an agent is considered destructive
   */
  isDestructiveAgent(agentId: string): boolean {
    return DESTRUCTIVE_DESIGNERS.includes(agentId);
  }
}

// Export singleton instance
export const qaValidator = new QAValidator();
