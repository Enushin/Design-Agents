import { NextRequest, NextResponse } from "next/server";

// Agent configurations for demo response generation
const agentStyles: Record<
  string,
  {
    name: string;
    colors: { primary: string; secondary: string; bg: string; text: string };
    font: string;
    layout: string;
  }
> = {
  agent_01: {
    name: "佐藤可士和",
    colors: {
      primary: "#FF0000",
      secondary: "#0000FF",
      bg: "#FFFFFF",
      text: "#000000",
    },
    font: '"Helvetica Neue", sans-serif',
    layout: "grid",
  },
  agent_02: {
    name: "原研哉",
    colors: {
      primary: "#FAFAFA",
      secondary: "#E0E0E0",
      bg: "#FFFFFF",
      text: "#333333",
    },
    font: '"Hiragino Mincho ProN", serif',
    layout: "minimal",
  },
  agent_16: {
    name: "Dieter Rams",
    colors: {
      primary: "#F5F5F5",
      secondary: "#E5E5E5",
      bg: "#FFFFFF",
      text: "#1A1A1A",
    },
    font: '"SF Pro Display", sans-serif',
    layout: "functional",
  },
  agent_17: {
    name: "David Carson",
    colors: {
      primary: "#1A1A1A",
      secondary: "#8B0000",
      bg: "#2C2C2C",
      text: "#E5E5E5",
    },
    font: '"Impact", sans-serif',
    layout: "chaotic",
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, targetAudience, mediaType, agentId } = body;

    // Get agent style or use default
    const agent = agentStyles[agentId] || {
      name: "Default Agent",
      colors: {
        primary: "#0066CC",
        secondary: "#6B7280",
        bg: "#FFFFFF",
        text: "#1A1A1A",
      },
      font: "sans-serif",
      layout: "standard",
    };

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate demo HTML based on agent style
    const html = generateDemoHTML(content, targetAudience, mediaType, agent);
    const css = generateDemoCSS(agent);

    // Simulate QA validation
    const isDestructive = [
      "agent_17",
      "agent_18",
      "agent_19",
      "agent_20",
    ].includes(agentId);
    const qaScore = isDestructive
      ? Math.floor(Math.random() * 20) + 65
      : Math.floor(Math.random() * 15) + 85;
    const qaIssues = isDestructive
      ? [
          "コントラスト比が低い箇所があります",
          "テキストサイズが小さい箇所があります",
        ]
      : [];

    return NextResponse.json({
      html,
      css,
      agentName: agent.name,
      qaScore,
      qaIssues,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json({ error: "生成に失敗しました" }, { status: 500 });
  }
}

function generateDemoHTML(
  content: string,
  targetAudience: string,
  mediaType: string,
  agent: (typeof agentStyles)[string],
): string {
  const headline = content.slice(0, 50) || "あなたのブランドを、次のレベルへ。";

  return `
<div class="container">
  <header class="hero">
    <h1 class="headline">${headline}</h1>
    <p class="subheadline">ターゲット: ${targetAudience || "すべてのお客様"}</p>
  </header>

  <section class="content">
    <div class="feature-grid">
      <div class="feature">
        <div class="feature-icon">✨</div>
        <h3>特徴 1</h3>
        <p>高品質なデザインを、短時間で。</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🎨</div>
        <h3>特徴 2</h3>
        <p>20人の巨匠デザイナーの哲学を適用。</p>
      </div>
      <div class="feature">
        <div class="feature-icon">⚡</div>
        <h3>特徴 3</h3>
        <p>AIによる自動品質チェック。</p>
      </div>
    </div>
  </section>

  <footer class="cta-section" data-protected="true">
    <button class="cta-button">今すぐ始める</button>
  </footer>
</div>
  `.trim();
}

function generateDemoCSS(agent: (typeof agentStyles)[string]): string {
  const { colors, font, layout } = agent;

  const layoutStyles =
    layout === "minimal"
      ? `
    .container { padding: 80px 40px; }
    .headline { font-size: 24px; font-weight: 300; letter-spacing: 0.1em; }
    .feature-grid { gap: 60px; }
  `
      : layout === "chaotic"
        ? `
    .container { padding: 20px; }
    .headline { font-size: 48px; transform: rotate(-2deg); }
    .feature { transform: rotate(1deg); }
  `
        : `
    .container { padding: 40px; }
    .headline { font-size: 36px; }
  `;

  return `
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: ${font};
  background: ${colors.bg};
  color: ${colors.text};
  line-height: 1.6;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 60px 20px;
  background: ${colors.primary};
  color: ${colors.text};
}

.headline {
  margin-bottom: 16px;
}

.subheadline {
  opacity: 0.7;
  font-size: 14px;
}

.content {
  padding: 40px 20px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature {
  text-align: center;
  padding: 24px;
  background: ${colors.secondary};
  border-radius: 8px;
}

.feature-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.feature h3 {
  margin-bottom: 8px;
}

.cta-section {
  text-align: center;
  padding: 40px 20px;
}

.cta-button {
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  background: ${colors.primary};
  color: ${colors.bg};
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

[data-protected="true"] {
  position: relative;
  z-index: 100;
}

${layoutStyles}
  `.trim();
}
