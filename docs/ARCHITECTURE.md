# Architecture Design Document
## Deep Design Philosophy Orchestra (DDPO) v3.0.0

---

## 1. System Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                         DDPO System                                 │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────┐ │
│  │   Client    │───▶│   API GW    │───▶│    Orchestrator         │ │
│  │   (Next.js) │◀───│   (Hono)    │◀───│    Agent                │ │
│  └─────────────┘    └─────────────┘    └───────────┬─────────────┘ │
│                                                     │               │
│                     ┌───────────────────────────────┼───────────┐   │
│                     │         Agent Router          │           │   │
│                     └───────────────────────────────┼───────────┘   │
│                                                     │               │
│  ┌──────────────────────────────────────────────────▼────────────┐ │
│  │                    Designer Agent Pool                         │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │ │
│  │  │ Group A │ │ Group A │ │ Group B │ │ Group B │ │ Group C │  │ │
│  │  │ 01-08   │ │   ...   │ │ 09-16   │ │   ...   │ │ 17-20   │  │ │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      QA Validator                            │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 14 (App Router) | SSR、API Routes、React Server Components |
| **API** | Hono | 軽量、Edge対応、TypeScript |
| **Agent Framework** | LangChain / Claude SDK | マルチエージェント管理 |
| **LLM** | Claude 3.5 Sonnet | 高品質な推論、長コンテキスト |
| **Image Gen** | DALL-E 3 / Stable Diffusion | 画像生成 |
| **Database** | PostgreSQL + Prisma | 構造化データ |
| **Cache** | Redis | セッション、中間状態 |
| **Storage** | Cloudflare R2 | 画像アセット |
| **Deploy** | Cloudflare Workers | Edge配信 |

---

## 3. Component Details

### 3.1 Orchestrator Agent

```typescript
// src/agents/orchestrator/index.ts

interface OrchestratorAgent {
  // Phase 1: Goal Seeking
  analyzeIntent(request: UserRequest): Promise<AnalyzedIntent>;

  // Phase 2: Content Locking
  generateSpecification(intent: AnalyzedIntent): Promise<LockedSpecification>;

  // Phase 3: QA Validation
  validateOutput(output: DesignOutput): Promise<ValidationResult>;

  // Safeguard for destructive designers
  applySafeguards(output: DesignOutput, agentId: string): Promise<DesignOutput>;
}
```

#### Goal Seeking Logic
```yaml
input: "20代女性向けのオーガニックコスメのLPを作りたい。清潔感があって、信頼できる感じで。"

analysis:
  goal: "conversion"  # 購入がゴール
  target:
    age: "20s"
    gender: "female"
    interest: "organic, natural"
  tone:
    - "clean"
    - "trustworthy"
  required_elements:
    - hero_image
    - headline
    - product_description
    - price
    - cta_button
    - testimonials
    - ingredients_list
  priority:
    1: headline
    2: hero_image
    3: cta_button
    4: price
```

#### Content Locking Protocol
```html
<!-- Locked HTML Structure -->
<article data-locked="true" data-version="1.0">
  <header data-element="hero">
    <h1 data-priority="1" data-locked-text="true">
      <!-- Copywriter確定テキスト -->
    </h1>
    <div data-element="hero-image" data-style-allowed="true">
      <!-- デザイナーが画像生成可能 -->
    </div>
  </header>

  <section data-element="cta" data-protected="true">
    <!-- Z-index強制、背景色保証 -->
    <button data-element="purchase-button">
      購入する
    </button>
  </section>
</article>
```

---

### 3.2 Designer Agent Interface

```typescript
// src/agents/designers/base.ts

interface DesignerAgent {
  id: string;
  name: string;
  category: string;

  // Core methods
  generateStyle(spec: LockedSpecification): Promise<StyleDefinition>;
  generateImagePrompt(element: ImageElement): Promise<string>;

  // Philosophy-driven rules
  readonly philosophy: VisualPhilosophy;
  readonly executionRules: ExecutionRule[];
  readonly designTokens: DesignTokens;
}

interface DesignTokens {
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
  };
  spacing: {
    unit: number;
    scale: number[];
  };
  layout: {
    maxWidth: string;
    grid: GridSystem;
    whitespaceRatio: number;
  };
}
```

---

### 3.3 Agent Implementations (Examples)

#### Agent 01: 佐藤可士和
```typescript
// src/agents/designers/kashiwa-sato.ts

export const KashiwaSatoAgent: DesignerAgent = {
  id: 'agent_01',
  name: '佐藤可士和',
  category: 'Iconic Branding',

  philosophy: {
    core: '対象を整理・分類し、最も強い「アイコン」に変換する',
    principles: [
      '0.1秒で識別できるか',
      '情緒や物語を排除',
      '記号としての強度'
    ]
  },

  designTokens: {
    typography: {
      primary: { family: 'Helvetica Neue', weight: 900 },
      scale: [14, 18, 24, 36, 48, 72, 96]
    },
    colors: {
      primary: '#FF0000',    // Pure Red
      secondary: '#0000FF',  // Pure Blue
      accent: '#FFFF00',     // Pure Yellow
      background: '#FFFFFF',
      text: '#000000'
    },
    layout: {
      grid: { columns: 12, gutter: 24 },
      whitespaceRatio: 0.3
    }
  },

  executionRules: [
    'フォントは太いゴシック体（Sans-serif Bold）を使用',
    '配色は原色（赤・青・黄）または白黒のハイコントラスト',
    'レイアウトはグリッドに沿った明確なボックス構成'
  ]
};
```

#### Agent 02: 原研哉
```typescript
// src/agents/designers/kenya-hara.ts

export const KenyaHaraAgent: DesignerAgent = {
  id: 'agent_02',
  name: '原研哉',
  category: 'Emptiness (Ku)',

  philosophy: {
    core: '「白」を情報の器（Emptiness）として扱う',
    principles: [
      '圧倒的な余白',
      '触覚の喚起',
      '存在感の際立ち'
    ]
  },

  designTokens: {
    typography: {
      primary: { family: 'Hiragino Mincho', weight: 300 },
      scale: [10, 12, 14, 16, 20, 24]  // 小さめのスケール
    },
    colors: {
      primary: '#FAFAFA',
      secondary: '#F5F5F5',
      accent: '#E0E0E0',
      background: '#FFFFFF',
      text: '#333333'
    },
    layout: {
      whitespaceRatio: 0.7,  // 70%余白
      grid: { columns: 6, gutter: 48 }
    }
  },

  executionRules: [
    '画面の70%以上を余白（White space）とする',
    '繊細な明朝体（Serif）を使用',
    '画像にはテクスチャ感（紙、布、水）を含ませる'
  ]
};
```

---

### 3.4 QA Validator

```typescript
// src/validators/qa.ts

interface QAValidator {
  // WCAG Contrast Check
  checkContrast(element: Element): ContrastResult;

  // Essential Element Visibility
  checkVisibility(element: Element): VisibilityResult;

  // Protected Element Integrity
  checkProtectedElements(html: string): IntegrityResult;

  // Responsive Check
  checkResponsive(html: string, breakpoints: number[]): ResponsiveResult;
}

interface QAResult {
  passed: boolean;
  score: number;  // 0-100
  issues: QAIssue[];
  autoFixes: AutoFix[];
}

// Auto-fix for destructive designers
interface AutoFix {
  type: 'add_background' | 'increase_contrast' | 'force_zindex';
  target: string;
  css: string;
}
```

---

## 4. Data Flow

```
[User Input]
     │
     ▼
┌─────────────────────────────────────────────┐
│ Orchestrator: Goal Seeking                   │
│   - 目的推論 (conversion/awareness/branding) │
│   - 必須要素抽出                             │
│   - 優先順位決定                             │
└─────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────┐
│ Orchestrator: Content Locking                │
│   - HTML構造生成                             │
│   - テキストロック                           │
│   - 保護要素マーキング                       │
└─────────────────────────────────────────────┘
     │
     ▼ LockedSpecification.json
     │
┌─────────────────────────────────────────────┐
│ Selected Designer Agent                      │
│   - CSS/Style生成                            │
│   - 画像プロンプト生成                       │
│   - デザイントークン適用                     │
└─────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────┐
│ Image Generation Service                     │
│   - DALL-E / Stable Diffusion               │
│   - エージェント固有の画風適用               │
└─────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────┐
│ QA Validator                                 │
│   - コントラストチェック                     │
│   - 可視性検証                               │
│   - 自動修正適用                             │
└─────────────────────────────────────────────┘
     │
     ▼
[Final Output: HTML/CSS/Images]
```

---

## 5. Directory Structure

```
ddpo/
├── apps/
│   └── web/                    # Next.js Frontend
│       ├── app/
│       │   ├── page.tsx        # Home
│       │   ├── create/         # Creation flow
│       │   ├── preview/        # Preview
│       │   └── api/            # API routes
│       └── components/
│           ├── InputForm/
│           ├── AgentSelector/
│           └── PreviewCanvas/
│
├── packages/
│   ├── core/                   # Shared types & utils
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── orchestrator/           # Orchestrator Agent
│   │   ├── goal-seeker.ts
│   │   ├── content-locker.ts
│   │   └── safeguard.ts
│   │
│   ├── designers/              # Designer Agents
│   │   ├── base.ts
│   │   ├── group-a/
│   │   │   ├── kashiwa-sato.ts
│   │   │   ├── kenya-hara.ts
│   │   │   └── ...
│   │   ├── group-b/
│   │   │   ├── paul-rand.ts
│   │   │   └── ...
│   │   └── group-c/
│   │       ├── david-carson.ts
│   │       └── ...
│   │
│   ├── qa/                     # QA Validator
│   │   ├── contrast.ts
│   │   ├── visibility.ts
│   │   └── auto-fix.ts
│   │
│   └── image-gen/              # Image Generation
│       ├── dalle.ts
│       └── stable-diffusion.ts
│
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   └── agents/
│
└── infra/
    ├── docker/
    └── terraform/
```

---

## 6. Security Considerations

| Concern | Mitigation |
|---------|------------|
| API Key露出 | 環境変数 + Secret Manager |
| Prompt Injection | 入力サニタイズ + 構造化プロンプト |
| 過剰リクエスト | Rate Limiting (100 req/min) |
| 生成コンテンツ | Content Moderation API |

---

## 7. Deployment Architecture

```
                    ┌─────────────────────┐
                    │   Cloudflare CDN    │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
    ┌─────────────────┐ ┌─────────────┐ ┌─────────────┐
    │  Static Assets  │ │   Workers   │ │     R2      │
    │   (Next.js)     │ │   (API)     │ │  (Storage)  │
    └─────────────────┘ └──────┬──────┘ └─────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
              ┌───────────┐        ┌───────────┐
              │  Claude   │        │  DALL-E   │
              │   API     │        │   API     │
              └───────────┘        └───────────┘
```
