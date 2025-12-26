/**
 * Content Locker
 * Locks content into HTML structure that designers cannot modify
 */

import type {
  AnalyzedIntent,
  LockedSpecification,
  ContentNode,
  MediaType,
} from "@ddpo/core";

// HTML templates for each media type
const HTML_TEMPLATES: Record<MediaType, string> = {
  lp: `
<article data-locked="true" data-version="1.0" class="lp">
  <header data-element="hero" data-style-allowed="true">
    <h1 data-element="headline" data-priority="1" data-locked-text="true">
      {{headline}}
    </h1>
    <p data-element="subheadline" data-locked-text="true">
      {{subheadline}}
    </p>
    <div data-element="hero-image" data-style-allowed="true"></div>
  </header>

  <section data-element="product" data-style-allowed="true">
    <div data-element="product_image" data-style-allowed="true"></div>
    <div data-element="product-info">
      <p data-element="description" data-locked-text="true">{{description}}</p>
      <p data-element="price" data-protected="true" data-locked-text="true">{{price}}</p>
    </div>
  </section>

  <section data-element="features" data-style-allowed="true">
    {{features}}
  </section>

  <section data-element="testimonials" data-style-allowed="true">
    {{testimonials}}
  </section>

  <section data-element="cta-section" data-protected="true">
    <button data-element="cta" data-protected="true">
      {{cta_text}}
    </button>
  </section>

  <footer data-element="footer" data-style-allowed="true">
    {{footer}}
  </footer>
</article>
`,

  poster: `
<article data-locked="true" data-version="1.0" class="poster">
  <div data-element="main_visual" data-style-allowed="true"></div>
  <h1 data-element="title" data-priority="1" data-locked-text="true">
    {{title}}
  </h1>
  <div data-element="info" data-protected="true">
    <p data-element="date_info" data-locked-text="true">{{date_info}}</p>
    <p data-element="venue_info" data-locked-text="true">{{venue_info}}</p>
  </div>
</article>
`,

  logo: `
<article data-locked="true" data-version="1.0" class="logo">
  <div data-element="symbol" data-style-allowed="true"></div>
  <h1 data-element="wordmark" data-priority="1" data-locked-text="true">
    {{wordmark}}
  </h1>
</article>
`,

  package: `
<article data-locked="true" data-version="1.0" class="package">
  <h1 data-element="product_name" data-priority="1" data-protected="true" data-locked-text="true">
    {{product_name}}
  </h1>
  <div data-element="product_image" data-style-allowed="true"></div>
  <p data-element="description" data-locked-text="true">{{description}}</p>
  <div data-element="ingredients" data-protected="true" data-locked-text="true">
    {{ingredients}}
  </div>
</article>
`,

  ui: `
<article data-locked="true" data-version="1.0" class="ui-design">
  <nav data-element="navigation" data-protected="true">
    {{navigation}}
  </nav>
  <header data-element="hero" data-style-allowed="true">
    <h1 data-element="headline" data-priority="1" data-locked-text="true">
      {{headline}}
    </h1>
  </header>
  <section data-element="features" data-style-allowed="true">
    {{features}}
  </section>
  <section data-element="cta-section" data-protected="true">
    <button data-element="primary_cta" data-protected="true">
      {{cta_text}}
    </button>
  </section>
</article>
`,
};

export class ContentLocker {
  /**
   * Lock content into HTML structure
   */
  lock(
    intent: AnalyzedIntent,
    mediaType: MediaType,
    content: Record<string, string>,
  ): LockedSpecification {
    // Get template for media type
    const template = HTML_TEMPLATES[mediaType] ?? HTML_TEMPLATES.lp;

    // Replace placeholders with content
    let html = template;
    for (const [key, value] of Object.entries(content)) {
      html = html.replace(
        new RegExp(`{{${key}}}`, "g"),
        this.escapeHtml(value),
      );
    }

    // Remove unused placeholders
    html = html.replace(/{{[^}]+}}/g, "");

    // Build content hierarchy
    const contentHierarchy = this.buildContentHierarchy(intent, content);

    // Extract protected and style-allowed elements
    const protectedElements = this.extractProtectedElements(html);
    const styleAllowedElements = this.extractStyleAllowedElements(html);

    return {
      id: crypto.randomUUID(),
      request_id: intent.request_id,
      intent_id: intent.id,
      goal: intent.goal,
      required_elements: intent.required_elements,
      content_hierarchy: contentHierarchy,
      html_structure: html.trim(),
      protected_elements: protectedElements,
      style_allowed_elements: styleAllowedElements,
      locked_at: new Date(),
    };
  }

  /**
   * Escape HTML entities
   */
  private escapeHtml(text: string): string {
    const escapeMap: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return text.replace(/[&<>"']/g, (char) => escapeMap[char]);
  }

  /**
   * Build content hierarchy from intent and content
   */
  private buildContentHierarchy(
    intent: AnalyzedIntent,
    content: Record<string, string>,
  ): ContentNode[] {
    return intent.required_elements.map((element, index) => ({
      id: element.id,
      element: element.type,
      priority: intent.priority[index + 1] === element.id ? index + 1 : 99,
      content: content[element.id],
      locked_text: true,
      style_allowed: !element.protected,
      protected: element.protected ?? false,
    }));
  }

  /**
   * Extract protected element IDs from HTML
   */
  private extractProtectedElements(html: string): string[] {
    const regex = /data-element="([^"]+)"[^>]*data-protected="true"/g;
    const elements: string[] = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      elements.push(match[1]);
    }
    return elements;
  }

  /**
   * Extract style-allowed element IDs from HTML
   */
  private extractStyleAllowedElements(html: string): string[] {
    const regex = /data-element="([^"]+)"[^>]*data-style-allowed="true"/g;
    const elements: string[] = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      elements.push(match[1]);
    }
    return elements;
  }

  /**
   * Validate that locked content hasn't been modified
   */
  validateIntegrity(
    original: LockedSpecification,
    modified: string,
  ): { valid: boolean; violations: string[] } {
    const violations: string[] = [];

    // Check that protected elements are unchanged
    for (const elementId of original.protected_elements) {
      const originalRegex = new RegExp(
        `data-element="${elementId}"[^>]*>([^<]*)<`,
        "g",
      );
      const originalMatch = originalRegex.exec(original.html_structure);
      const modifiedMatch = originalRegex.exec(modified);

      if (originalMatch && modifiedMatch) {
        if (originalMatch[1].trim() !== modifiedMatch[1].trim()) {
          violations.push(
            `Protected element "${elementId}" content was modified`,
          );
        }
      }
    }

    // Check that locked-text elements are unchanged
    const lockedTextRegex = /data-locked-text="true"[^>]*>([^<]*)</g;
    const originalTexts: string[] = [];
    const modifiedTexts: string[] = [];

    let match;
    while ((match = lockedTextRegex.exec(original.html_structure)) !== null) {
      originalTexts.push(match[1].trim());
    }

    lockedTextRegex.lastIndex = 0;
    while ((match = lockedTextRegex.exec(modified)) !== null) {
      modifiedTexts.push(match[1].trim());
    }

    if (originalTexts.length !== modifiedTexts.length) {
      violations.push("Number of locked text elements changed");
    } else {
      for (let i = 0; i < originalTexts.length; i++) {
        if (originalTexts[i] !== modifiedTexts[i]) {
          violations.push(`Locked text at position ${i} was modified`);
        }
      }
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }
}
