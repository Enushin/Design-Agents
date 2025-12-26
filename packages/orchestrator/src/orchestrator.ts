/**
 * Orchestrator
 * Main orchestrator that coordinates Goal Seeking and Content Locking
 */

import type {
  UserRequest,
  AnalyzedIntent,
  LockedSpecification,
  DesignOutput,
  MediaType,
} from "@ddpo/core";
import { GoalSeeker } from "./goal-seeker.js";
import { ContentLocker } from "./content-locker.js";

export interface OrchestratorConfig {
  anthropicApiKey?: string;
}

export class Orchestrator {
  private goalSeeker: GoalSeeker;
  private contentLocker: ContentLocker;

  constructor(config: OrchestratorConfig = {}) {
    this.goalSeeker = new GoalSeeker(config.anthropicApiKey);
    this.contentLocker = new ContentLocker();
  }

  /**
   * Phase 1: Analyze user intent
   */
  async analyzeIntent(request: UserRequest): Promise<AnalyzedIntent> {
    return this.goalSeeker.analyze(request);
  }

  /**
   * Phase 2: Lock content into specification
   */
  lockContent(
    intent: AnalyzedIntent,
    mediaType: MediaType,
    content: Record<string, string>,
  ): LockedSpecification {
    return this.contentLocker.lock(intent, mediaType, content);
  }

  /**
   * Phase 3: Validate design output
   */
  validateOutput(
    specification: LockedSpecification,
    output: DesignOutput,
  ): { valid: boolean; issues: string[] } {
    const issues: string[] = [];

    // Check content integrity
    const integrityCheck = this.contentLocker.validateIntegrity(
      specification,
      output.html,
    );
    if (!integrityCheck.valid) {
      issues.push(...integrityCheck.violations);
    }

    // Check that protected elements are visible
    // (This would integrate with QA validator in full implementation)

    return {
      valid: issues.length === 0,
      issues,
    };
  }

  /**
   * Apply safeguards for destructive designers
   */
  applySafeguards(
    output: DesignOutput,
    isDestructiveDesigner: boolean,
  ): DesignOutput {
    if (!isDestructiveDesigner) {
      return output;
    }

    // Add safeguard CSS for protected elements
    const safeguardCSS = `
/* Safeguards for destructive designer styles */
[data-protected="true"] {
  position: relative !important;
  z-index: 9999 !important;
}

[data-protected="true"]::before {
  content: '' !important;
  position: absolute !important;
  inset: -8px !important;
  background: rgba(255, 255, 255, 0.95) !important;
  z-index: -1 !important;
  border-radius: 4px !important;
}

[data-protected="true"] button,
[data-protected="true"] a {
  position: relative !important;
  z-index: 1 !important;
  background-color: #000000 !important;
  color: #FFFFFF !important;
  padding: 16px 32px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
}
`;

    return {
      ...output,
      css: output.css + "\n" + safeguardCSS,
    };
  }

  /**
   * Full workflow: Analyze → Lock → Generate → Validate
   */
  async process(
    request: UserRequest,
    content: Record<string, string>,
    generateDesign: (spec: LockedSpecification) => Promise<DesignOutput>,
  ): Promise<{
    intent: AnalyzedIntent;
    specification: LockedSpecification;
    output: DesignOutput;
    validation: { valid: boolean; issues: string[] };
  }> {
    // Phase 1: Analyze intent
    const intent = await this.analyzeIntent(request);

    // Phase 2: Lock content
    const specification = this.lockContent(intent, request.media_type, content);

    // Phase 3: Generate design (using provided designer agent)
    let output = await generateDesign(specification);

    // Phase 4: Validate and apply safeguards if needed
    const validation = this.validateOutput(specification, output);

    // Apply safeguards if validation fails
    if (!validation.valid) {
      output = this.applySafeguards(output, true);
    }

    return {
      intent,
      specification,
      output,
      validation,
    };
  }
}
