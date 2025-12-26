/**
 * @ddpo/designers
 * Designer Agent implementations for DDPO
 */

// Base class
export { DesignerAgent } from "./base.js";

// Agent implementations
export { KashiwaSatoAgent, kashiwaSato } from "./agents/kashiwa-sato.js";
export { KenyaHaraAgent, kenyaHara } from "./agents/kenya-hara.js";
export { DieterRamsAgent, dieterRams } from "./agents/dieter-rams.js";

// Agent registry
import { kashiwaSato } from "./agents/kashiwa-sato.js";
import { kenyaHara } from "./agents/kenya-hara.js";
import { dieterRams } from "./agents/dieter-rams.js";
import type { DesignerAgent } from "./base.js";

export const agentRegistry: Map<string, DesignerAgent> = new Map([
  ["agent_01", kashiwaSato],
  ["agent_02", kenyaHara],
  ["agent_16", dieterRams],
]);

export function getAgent(id: string): DesignerAgent | undefined {
  return agentRegistry.get(id);
}

export function listAgents(): DesignerAgent[] {
  return Array.from(agentRegistry.values());
}
