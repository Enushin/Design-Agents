# Product Requirements Document (PRD)
## Deep Design Philosophy Orchestra (DDPO) v3.0.0

---

## 1. Executive Summary

### 1.1 Product Vision
ユーザーの曖昧なデザイン要望を、20名の世界的デザイナーの哲学に基づいて高品質なビジュアルに変換するAIマルチエージェントシステム

### 1.2 Problem Statement
- デザイン発注時、クライアントの要望は曖昧で不完全
- デザイナーの解釈により成果物にブレが生じる
- 必須要素（CTA、価格等）がデザイン優先で犠牲になる

### 1.3 Solution
- **Orchestrator**: 要件を構造化・確定し、コンテンツをロック
- **Designer Agents**: 確定コンテンツに対し、巨匠の哲学でスタイルを適用
- **QA Layer**: 可読性・アクセシビリティを自動検証

---

## 2. User Stories

### 2.1 Primary User (クライアント/マーケター)
```
As a マーケター
I want to 曖昧な要望を入力するだけで
So that プロフェッショナルなデザインが得られる
```

### 2.2 Use Cases

| ID | ユースケース | 入力例 | 期待出力 |
|----|-------------|--------|----------|
| UC-01 | LP作成 | 「20代女性向けコスメのLP」 | 完全なHTML/CSS/Images |
| UC-02 | ポスター作成 | 「音楽フェスのポスター」 | 印刷用デザイン |
| UC-03 | ロゴ作成 | 「テック企業のロゴ」 | SVG/PNG ロゴセット |
| UC-04 | パッケージ | 「オーガニック食品のパッケージ」 | 展開図デザイン |
| UC-05 | UI Design | 「フィンテックアプリのUI」 | Figma/コンポーネント |

---

## 3. Functional Requirements

### 3.1 Input Layer (FR-100)

| ID | 要件 | Priority |
|----|------|----------|
| FR-101 | テキスト入力フィールド（自由記述） | P0 |
| FR-102 | ターゲット層選択（プリセット + カスタム） | P0 |
| FR-103 | 媒体タイプ選択（LP/Poster/Logo/Package/UI） | P0 |
| FR-104 | デザイナー選択UI（20名のカード） | P0 |
| FR-105 | 画像アップロード（参考画像、ロゴ等） | P1 |

### 3.2 Orchestrator Agent (FR-200)

| ID | 要件 | Priority |
|----|------|----------|
| FR-201 | Goal Seeking: 目的の推論・確定 | P0 |
| FR-202 | 必須要素の自動抽出 | P0 |
| FR-203 | 情報優先順位の決定 | P0 |
| FR-204 | Content Locking: HTML/JSON構造化 | P0 |
| FR-205 | 破壊的デザイナー用のセーフガード | P0 |

### 3.3 Designer Agents (FR-300)

| ID | 要件 | Priority |
|----|------|----------|
| FR-301 | 20名のエージェント定義 | P0 |
| FR-302 | CSS/Style生成機能 | P0 |
| FR-303 | 画像生成プロンプト生成 | P0 |
| FR-304 | テキスト変更の禁止（バリデーション） | P0 |
| FR-305 | エージェント固有のデザイントークン | P1 |

### 3.4 QA Layer (FR-400)

| ID | 要件 | Priority |
|----|------|----------|
| FR-401 | コントラスト比チェック（WCAG準拠） | P0 |
| FR-402 | 必須要素の可視性検証 | P0 |
| FR-403 | フォールバック処理（座布団挿入等） | P0 |
| FR-404 | レスポンシブ対応チェック | P1 |

### 3.5 Output Layer (FR-500)

| ID | 要件 | Priority |
|----|------|----------|
| FR-501 | HTML/CSS出力 | P0 |
| FR-502 | 画像アセット出力 | P0 |
| FR-503 | プレビュー機能 | P0 |
| FR-504 | エクスポート（ZIP） | P1 |
| FR-505 | Figma連携 | P2 |

---

## 4. Non-Functional Requirements

### 4.1 Performance
| ID | 要件 | Target |
|----|------|--------|
| NFR-01 | 初回生成時間 | < 60秒 |
| NFR-02 | 再生成時間 | < 30秒 |
| NFR-03 | 同時処理数 | 10リクエスト |

### 4.2 Reliability
| ID | 要件 | Target |
|----|------|--------|
| NFR-04 | 可用性 | 99.5% |
| NFR-05 | エラー率 | < 1% |

### 4.3 Security
| ID | 要件 |
|----|------|
| NFR-06 | ユーザーデータの暗号化 |
| NFR-07 | API認証（JWT） |
| NFR-08 | レート制限 |

---

## 5. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │  Input   │  │   Agent      │  │      Preview          │  │
│  │  Form    │  │   Selector   │  │      Canvas           │  │
│  └──────────┘  └──────────────┘  └───────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │ REST API / WebSocket
┌─────────────────────────▼───────────────────────────────────┐
│                     Backend (Node.js/Python)                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   Orchestrator Agent                    │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌────────────────┐  │ │
│  │  │Goal Seeking │  │Content Lock │  │  QA Validator  │  │ │
│  │  └─────────────┘  └─────────────┘  └────────────────┘  │ │
│  └────────────────────────┬───────────────────────────────┘ │
│                           │                                  │
│  ┌────────────────────────▼───────────────────────────────┐ │
│  │                  Designer Agent Pool                    │ │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐          │ │
│  │  │Agent 01│ │Agent 02│ │  ...   │ │Agent 20│          │ │
│  │  │佐藤可士和│ │ 原研哉 │ │        │ │ Brody  │          │ │
│  │  └────────┘ └────────┘ └────────┘ └────────┘          │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    External Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Claude API  │  │  Image Gen   │  │   Storage (S3)   │   │
│  │  (LLM)       │  │  (DALL-E/SD) │  │                  │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Data Models

### 6.1 UserRequest
```typescript
interface UserRequest {
  id: string;
  content_text: string;
  target_audience: string;
  media_type: 'lp' | 'poster' | 'logo' | 'package' | 'ui';
  selected_agent_id: string;
  reference_images?: string[];
  created_at: Date;
}
```

### 6.2 LockedSpecification
```typescript
interface LockedSpecification {
  id: string;
  request_id: string;
  goal: 'conversion' | 'awareness' | 'branding';
  required_elements: RequiredElement[];
  content_hierarchy: ContentNode[];
  html_structure: string;
  locked_at: Date;
}
```

### 6.3 DesignOutput
```typescript
interface DesignOutput {
  id: string;
  specification_id: string;
  agent_id: string;
  html: string;
  css: string;
  images: ImageAsset[];
  qa_passed: boolean;
  qa_issues?: QAIssue[];
  created_at: Date;
}
```

---

## 7. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/requests` | 新規リクエスト作成 |
| GET | `/api/v1/requests/:id` | リクエスト詳細取得 |
| POST | `/api/v1/requests/:id/generate` | デザイン生成開始 |
| GET | `/api/v1/requests/:id/status` | 生成状況確認 |
| GET | `/api/v1/requests/:id/output` | 出力取得 |
| GET | `/api/v1/agents` | エージェント一覧 |
| GET | `/api/v1/agents/:id` | エージェント詳細 |

---

## 8. Designer Agents Summary

### Group A: Japanese Aesthetics (8名)
| ID | Name | Category | Key Style |
|----|------|----------|-----------|
| 01 | 佐藤可士和 | Iconic Branding | 原色、極太ゴシック |
| 02 | 原研哉 | Emptiness | 70%余白、繊細明朝 |
| 03 | 佐藤卓 | Design Anatomy | 親しみやすさ、温かみ |
| 04 | 田中一光 | Modern Japonesque | 色面分割、明朝 |
| 05 | 亀倉雄策 | Standard & Strength | 放射線、重厚サンセリフ |
| 06 | 浅葉克己 | Humor & Heritage | 手書き、エスニック |
| 07 | 佐藤雅彦 | Structural Logic | ピクトグラム、図解 |
| 08 | 菊地敦己 | Off-balance Rhythm | 等幅フォント、不均衡 |

### Group B: Western Modernism (8名)
| ID | Name | Category | Key Style |
|----|------|----------|-----------|
| 09 | Paul Rand | Witty Symbolism | 幾何学、言葉遊び |
| 10 | Massimo Vignelli | Strict Grid | Helvetica/Bodoni |
| 11 | Josef Müller-Brockmann | Swiss Objective | モジュラーグリッド |
| 12 | Wim Crouwel | Gridnik System | 機械的書体 |
| 13 | Milton Glaser | Narrative Illustration | イラスト、曲線 |
| 14 | Saul Bass | Cinematic Minimal | 切り絵、単色背景 |
| 15 | Otl Aicher | Functional Pictogram | ピクトグラム |
| 16 | Dieter Rams | Less but Better | 極ミニマル |

### Group C: Post-Modern (4名)
| ID | Name | Category | Key Style |
|----|------|----------|-----------|
| 17 | David Carson | Grunge & Intuition | グリッド破壊 |
| 18 | Stefan Sagmeister | Emotional Body | 身体性、手書き |
| 19 | Paula Scher | Typographic Noise | 巨大タイポ |
| 20 | Neville Brody | Radical Type | 文字加工、ネオン |

---

## 9. Milestones

| Phase | Deliverables |
|-------|--------------|
| **Phase 1: Foundation** | Orchestrator基盤、3エージェント（佐藤可士和、原研哉、Dieter Rams） |
| **Phase 2: Core Agents** | 残り17エージェント実装、QA Layer |
| **Phase 3: UI/UX** | Webフロントエンド、プレビュー機能 |
| **Phase 4: Polish** | パフォーマンス最適化、エクスポート機能 |

---

## 10. Success Metrics

| Metric | Target |
|--------|--------|
| 生成成功率 | > 95% |
| QA Pass率 | > 90% |
| ユーザー満足度 | > 4.0/5.0 |
| 平均生成時間 | < 45秒 |
