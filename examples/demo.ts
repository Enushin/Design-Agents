/**
 * DDPO Demo - End-to-End Workflow Example
 *
 * This demonstrates the complete DDPO pipeline:
 * 1. User input → Orchestrator (Goal Seeking + Content Locking)
 * 2. Locked Specification → Designer Agent (Style Generation)
 * 3. Style Definition → QA Validator (Quality Check + Auto-fix)
 * 4. Final Output → HTML/CSS/Images
 */

import { DDPO } from "@ddpo/core";
import { Orchestrator } from "@ddpo/orchestrator";
import { getAgent, listAgents } from "@ddpo/designers";
import { QAValidator } from "@ddpo/qa";
import { ImageGenerator } from "@ddpo/image-gen";
import type { UserRequest } from "@ddpo/core";

async function runDemo() {
  console.log("=".repeat(60));
  console.log("  DDPO - Deep Design Philosophy Orchestra");
  console.log("  E2E Workflow Demo");
  console.log("=".repeat(60));
  console.log();

  // Step 0: List available agents
  console.log("📋 Available Designer Agents:");
  const agents = listAgents();
  agents.forEach((agent) => {
    const marker = DDPO.isDestructiveAgent(agent.id) ? "⚠️" : "✓";
    console.log(`  ${marker} ${agent.id}: ${agent.name} (${agent.category})`);
  });
  console.log();

  // Step 1: Create a user request
  const userRequest: UserRequest = {
    id: "req_demo_001",
    content_text:
      "20代女性向けのオーガニックコスメのLPを作りたい。清潔感があって、信頼できる感じで。",
    target_audience: "20代女性、オーガニック志向",
    media_type: "lp",
    selected_agent_id: "agent_02", // Kenya Hara - Emptiness style
    created_at: new Date(),
  };

  console.log("📝 User Request:");
  console.log(`  Content: ${userRequest.content_text}`);
  console.log(`  Target: ${userRequest.target_audience}`);
  console.log(`  Media: ${userRequest.media_type}`);
  console.log(`  Agent: ${userRequest.selected_agent_id}`);
  console.log();

  // Step 2: Orchestrator - Goal Seeking
  console.log("🎯 Phase 1: Goal Seeking...");
  const orchestrator = new Orchestrator({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const intent = await orchestrator.analyzeIntent(userRequest);
  console.log(`  Goal: ${intent.goal}`);
  console.log(`  Required elements: ${intent.required_elements.length}`);
  console.log(`  Tone: ${intent.tone.join(", ")}`);
  console.log();

  // Step 3: Orchestrator - Content Locking
  console.log("🔒 Phase 2: Content Locking...");
  const specification = await orchestrator.generateLockedSpecification(intent);
  console.log(`  Locked elements: ${specification.protected_elements.length}`);
  console.log(
    `  Style-allowed elements: ${specification.style_allowed_elements.length}`,
  );
  console.log();

  // Step 4: Designer Agent - Style Generation
  console.log("🎨 Phase 3: Style Generation...");
  const designerAgent = getAgent(userRequest.selected_agent_id);

  if (!designerAgent) {
    console.error(`Agent ${userRequest.selected_agent_id} not found!`);
    return;
  }

  console.log(`  Using: ${designerAgent.name} (${designerAgent.category})`);
  const styleDefinition = await designerAgent.generateStyle(specification);
  console.log(`  CSS generated: ${styleDefinition.css.length} chars`);
  console.log(`  Image prompts: ${styleDefinition.imagePrompts.length}`);
  console.log();

  // Step 5: Image Generation (mock)
  console.log("🖼️ Phase 4: Image Generation...");
  const imageGen = new ImageGenerator({ provider: "mock" });
  const images = await imageGen.generateBatch(styleDefinition.imagePrompts);
  console.log(`  Generated: ${images.length} images`);
  console.log();

  // Step 6: QA Validation
  console.log("✅ Phase 5: QA Validation...");
  const qa = new QAValidator();

  // Check if agent is destructive
  const isDestructive = DDPO.isDestructiveAgent(userRequest.selected_agent_id);
  if (isDestructive) {
    console.log("  ⚠️ Destructive agent detected - extra safeguards applied");
  }

  const qaResult = qa.validate({
    html: specification.html_structure,
    css: styleDefinition.css,
    agentId: userRequest.selected_agent_id,
  });

  console.log(`  Passed: ${qaResult.passed}`);
  console.log(`  Score: ${qaResult.score}/100`);
  console.log(`  Issues: ${qaResult.issues.length}`);
  console.log(`  Auto-fixes: ${qaResult.autoFixes.length}`);
  console.log();

  // Step 7: Final Output
  console.log("📦 Final Output:");
  console.log("  HTML: [Generated]");
  console.log("  CSS: [Generated]");
  console.log(`  Images: ${images.length} assets`);
  console.log();

  console.log("=".repeat(60));
  console.log("  Demo Complete!");
  console.log("=".repeat(60));
}

// Run demo
runDemo().catch(console.error);
