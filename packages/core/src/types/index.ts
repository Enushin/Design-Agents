/**
 * DDPO Core Types
 * Deep Design Philosophy Orchestra
 */

// =============================================================================
// Media Types
// =============================================================================

export type MediaType = "lp" | "poster" | "logo" | "package" | "ui";

export type GoalType = "conversion" | "awareness" | "branding";

// =============================================================================
// User Request
// =============================================================================

export interface UserRequest {
  id: string;
  content_text: string;
  target_audience: string;
  media_type: MediaType;
  selected_agent_id: string;
  reference_images?: string[];
  created_at: Date;
}

// =============================================================================
// Analyzed Intent (Goal Seeking Output)
// =============================================================================

export interface TargetAudience {
  age?: string;
  gender?: string;
  interests?: string[];
  occupation?: string;
}

export interface RequiredElement {
  id: string;
  type:
    | "hero"
    | "headline"
    | "subheadline"
    | "cta"
    | "price"
    | "image"
    | "text"
    | "navigation"
    | "testimonial"
    | "feature";
  required: boolean;
  content?: string;
  protected?: boolean;
}

export interface AnalyzedIntent {
  id: string;
  request_id: string;
  goal: GoalType;
  target: TargetAudience;
  tone: string[];
  required_elements: RequiredElement[];
  priority: Record<number, string>;
  analyzed_at: Date;
}

// =============================================================================
// Locked Specification (Content Locking Output)
// =============================================================================

export interface ContentNode {
  id: string;
  element: string;
  priority: number;
  content?: string;
  locked_text: boolean;
  style_allowed: boolean;
  protected: boolean;
  children?: ContentNode[];
}

export interface LockedSpecification {
  id: string;
  request_id: string;
  intent_id: string;
  goal: GoalType;
  required_elements: RequiredElement[];
  content_hierarchy: ContentNode[];
  html_structure: string;
  protected_elements: string[];
  style_allowed_elements: string[];
  locked_at: Date;
}

// =============================================================================
// Designer Agent Types
// =============================================================================

export interface FontDefinition {
  family: string;
  weight: number;
  style?: "normal" | "italic";
}

export interface GridSystem {
  columns: number;
  gutter: number;
  margin?: number;
}

export interface DesignTokens {
  typography: {
    primary: FontDefinition;
    secondary?: FontDefinition;
    scale: number[];
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    [key: string]: string;
  };
  spacing: {
    unit: number;
    scale: number[];
  };
  layout: {
    maxWidth?: string;
    grid: GridSystem;
    whitespaceRatio: number;
  };
}

export interface VisualPhilosophy {
  core: string;
  principles: string[];
}

export interface DesignerAgentConfig {
  id: string;
  name: string;
  name_en?: string;
  category: string;
  group: "A" | "B" | "C";
  philosophy: VisualPhilosophy;
  executionRules: string[];
  designTokens: DesignTokens;
  imagePromptTemplate: string;
  isDestructive?: boolean;
}

// =============================================================================
// Style Definition (Designer Agent Output)
// =============================================================================

export interface ImagePrompt {
  element_id: string;
  prompt: string;
  negative_prompt?: string;
  style_reference?: string;
}

export interface StyleDefinition {
  agent_id: string;
  css: string;
  cssVariables: Record<string, string>;
  imagePrompts: ImagePrompt[];
}

// =============================================================================
// Design Output
// =============================================================================

export interface ImageAsset {
  id: string;
  element_id: string;
  url: string;
  prompt: string;
  width: number;
  height: number;
}

export interface DesignOutput {
  id?: string;
  specification_id?: string;
  agent_id?: string;
  html: string;
  css: string;
  images: ImageAsset[] | string[];
  qa_passed?: boolean;
  qa_issues?: QAIssue[];
  created_at?: Date;
}

// =============================================================================
// QA Types
// =============================================================================

export type QAIssueType =
  | "contrast_ratio"
  | "visibility"
  | "protected_element"
  | "font_size"
  | "responsive";

export type AutoFixType =
  | "add_background"
  | "increase_contrast"
  | "force_zindex"
  | "increase_font_size";

export interface QAIssue {
  type: QAIssueType;
  severity: "error" | "warning";
  element: string;
  message: string;
  autoFixable: boolean;
}

export interface AutoFix {
  type: AutoFixType;
  target: string;
  css: string;
}

export interface QAResult {
  passed: boolean;
  score: number;
  issues: QAIssue[];
  autoFixes: AutoFix[];
  fixedHtml?: string;
  fixedCss?: string;
}
