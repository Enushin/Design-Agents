/**
 * Goal Seeker
 * Analyzes user intent and determines goal, required elements, and priorities
 */

import Anthropic from "@anthropic-ai/sdk";
import type {
  UserRequest,
  AnalyzedIntent,
  GoalType,
  RequiredElement,
  MediaType,
} from "@ddpo/core";

// Media type to required elements mapping
const REQUIRED_ELEMENTS_MAP: Record<MediaType, RequiredElement[]> = {
  lp: [
    { id: "hero", type: "hero", required: true, protected: false },
    { id: "headline", type: "headline", required: true, protected: false },
    {
      id: "subheadline",
      type: "subheadline",
      required: false,
      protected: false,
    },
    { id: "product_image", type: "image", required: true, protected: false },
    { id: "cta", type: "cta", required: true, protected: true },
    { id: "price", type: "price", required: true, protected: true },
    { id: "features", type: "feature", required: false, protected: false },
    {
      id: "testimonials",
      type: "testimonial",
      required: false,
      protected: false,
    },
  ],
  poster: [
    { id: "main_visual", type: "hero", required: true, protected: false },
    { id: "title", type: "headline", required: true, protected: false },
    { id: "date_info", type: "text", required: true, protected: true },
    { id: "venue_info", type: "text", required: false, protected: true },
  ],
  logo: [
    { id: "symbol", type: "image", required: true, protected: false },
    { id: "wordmark", type: "headline", required: true, protected: false },
  ],
  package: [
    { id: "product_name", type: "headline", required: true, protected: true },
    { id: "product_image", type: "image", required: true, protected: false },
    { id: "description", type: "text", required: false, protected: false },
    { id: "ingredients", type: "text", required: false, protected: true },
  ],
  ui: [
    { id: "navigation", type: "navigation", required: true, protected: true },
    { id: "hero", type: "hero", required: true, protected: false },
    { id: "primary_cta", type: "cta", required: true, protected: true },
    { id: "features", type: "feature", required: false, protected: false },
  ],
};

// Goal to priority mapping
const GOAL_PRIORITIES: Record<GoalType, Record<number, string>> = {
  conversion: {
    1: "cta",
    2: "headline",
    3: "price",
    4: "product_image",
  },
  awareness: {
    1: "main_visual",
    2: "title",
    3: "date_info",
    4: "venue_info",
  },
  branding: {
    1: "symbol",
    2: "wordmark",
    3: "headline",
    4: "product_image",
  },
};

export class GoalSeeker {
  private client: Anthropic;

  constructor(apiKey?: string) {
    this.client = new Anthropic({
      apiKey: apiKey ?? process.env.ANTHROPIC_API_KEY,
    });
  }

  /**
   * Analyze user request and determine intent
   */
  async analyze(request: UserRequest): Promise<AnalyzedIntent> {
    // Use Claude to analyze the intent
    const analysis = await this.analyzeWithClaude(request);

    // Get required elements based on media type
    const requiredElements = this.getRequiredElements(
      request.media_type,
      analysis.additionalElements,
    );

    // Determine priority based on goal
    const priority = this.getPriority(analysis.goal, request.media_type);

    return {
      id: crypto.randomUUID(),
      request_id: request.id,
      goal: analysis.goal,
      target: analysis.target,
      tone: analysis.tone,
      required_elements: requiredElements,
      priority,
      analyzed_at: new Date(),
    };
  }

  /**
   * Use Claude to analyze user intent
   */
  private async analyzeWithClaude(request: UserRequest): Promise<{
    goal: GoalType;
    target: { age?: string; gender?: string; interests?: string[] };
    tone: string[];
    additionalElements: string[];
  }> {
    const prompt = `あなたはデザインプロジェクトの要件を分析するエキスパートです。
以下のユーザーリクエストを分析し、JSON形式で回答してください。

ユーザーリクエスト:
- 内容: ${request.content_text}
- ターゲット: ${request.target_audience}
- 媒体: ${request.media_type}

以下の形式で回答してください:
{
  "goal": "conversion" | "awareness" | "branding",
  "target": {
    "age": "年代（例: 20s, 30s）",
    "gender": "性別（例: female, male, all）",
    "interests": ["興味関心のリスト"]
  },
  "tone": ["トーンのリスト（例: clean, trustworthy, premium）"],
  "additionalElements": ["追加で必要な要素のリスト"]
}

判断基準:
- goal: LP+価格/購入 → conversion、ポスター+イベント → awareness、ロゴ → branding
- tone: ユーザーの表現から推測（清潔感→clean、信頼→trustworthy等）
- additionalElements: 媒体とコンテンツから必要と思われる追加要素`;

    const response = await this.client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    // Extract text from response
    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // Fallback to defaults
      return {
        goal: this.inferGoalFromMediaType(request.media_type),
        target: { age: undefined, gender: undefined, interests: [] },
        tone: ["professional"],
        additionalElements: [],
      };
    }

    return JSON.parse(jsonMatch[0]);
  }

  /**
   * Infer goal from media type as fallback
   */
  private inferGoalFromMediaType(mediaType: MediaType): GoalType {
    switch (mediaType) {
      case "lp":
      case "package":
        return "conversion";
      case "poster":
        return "awareness";
      case "logo":
      case "ui":
        return "branding";
      default:
        return "branding";
    }
  }

  /**
   * Get required elements based on media type
   */
  private getRequiredElements(
    mediaType: MediaType,
    additionalElements: string[],
  ): RequiredElement[] {
    const baseElements = REQUIRED_ELEMENTS_MAP[mediaType] ?? [];

    // Add additional elements
    const additional: RequiredElement[] = additionalElements.map((el) => ({
      id: el.toLowerCase().replace(/\s+/g, "_"),
      type: "text" as const,
      required: false,
      protected: false,
    }));

    return [...baseElements, ...additional];
  }

  /**
   * Get priority based on goal and media type
   */
  private getPriority(
    goal: GoalType,
    mediaType: MediaType,
  ): Record<number, string> {
    const basePriority = GOAL_PRIORITIES[goal] ?? GOAL_PRIORITIES.branding;

    // Adjust based on media type
    if (mediaType === "lp" && goal === "conversion") {
      return {
        1: "headline",
        2: "cta",
        3: "price",
        4: "product_image",
      };
    }

    return basePriority;
  }
}
