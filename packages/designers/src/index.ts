/**
 * @ddpo/designers
 * Designer Agent implementations for DDPO
 */

// Base class
export { DesignerAgent } from "./base.js";

// Agent implementations - Group A (Japanese Aesthetics & Structure)
export { KashiwaSatoAgent, kashiwaSato } from "./agents/kashiwa-sato.js";
export { KenyaHaraAgent, kenyaHara } from "./agents/kenya-hara.js";
export { TakuSatohAgent, takuSatoh } from "./agents/taku-satoh.js";
export { IkkoTanakaAgent, ikkoTanaka } from "./agents/ikko-tanaka.js";
export {
  YusakuKamekuraAgent,
  yusakuKamekura,
} from "./agents/yusaku-kamekura.js";
export { KatsumiAsabaAgent, katsumiAsaba } from "./agents/katsumi-asaba.js";
export { MasahikoSatoAgent, masahikoSato } from "./agents/masahiko-sato.js";
export { AtsukiKikuchiAgent, atsukiKikuchi } from "./agents/atsuki-kikuchi.js";

// Agent implementations - Group B (Western Modernism & Rationality)
export { PaulRandAgent, paulRand } from "./agents/paul-rand.js";
export {
  MassimoVignelliAgent,
  massimoVignelli,
} from "./agents/massimo-vignelli.js";
export {
  JosefMullerBrockmannAgent,
  josefMullerBrockmann,
} from "./agents/josef-muller-brockmann.js";
export { WimCrouwelAgent, wimCrouwel } from "./agents/wim-crouwel.js";
export { MiltonGlaserAgent, miltonGlaser } from "./agents/milton-glaser.js";
export { SaulBassAgent, saulBass } from "./agents/saul-bass.js";
export { OtlAicherAgent, otlAicher } from "./agents/otl-aicher.js";
export { DieterRamsAgent, dieterRams } from "./agents/dieter-rams.js";

// Agent implementations - Group C (Post-Modern & Experimental - Destructive)
export { DavidCarsonAgent, davidCarson } from "./agents/david-carson.js";
export {
  StefanSagmeisterAgent,
  stefanSagmeister,
} from "./agents/stefan-sagmeister.js";
export { PaulaScherAgent, paulaScher } from "./agents/paula-scher.js";
export { NevilleBrodyAgent, nevilleBrody } from "./agents/neville-brody.js";

// Agent registry imports
import { kashiwaSato } from "./agents/kashiwa-sato.js";
import { kenyaHara } from "./agents/kenya-hara.js";
import { takuSatoh } from "./agents/taku-satoh.js";
import { ikkoTanaka } from "./agents/ikko-tanaka.js";
import { yusakuKamekura } from "./agents/yusaku-kamekura.js";
import { katsumiAsaba } from "./agents/katsumi-asaba.js";
import { masahikoSato } from "./agents/masahiko-sato.js";
import { atsukiKikuchi } from "./agents/atsuki-kikuchi.js";
import { paulRand } from "./agents/paul-rand.js";
import { massimoVignelli } from "./agents/massimo-vignelli.js";
import { josefMullerBrockmann } from "./agents/josef-muller-brockmann.js";
import { wimCrouwel } from "./agents/wim-crouwel.js";
import { miltonGlaser } from "./agents/milton-glaser.js";
import { saulBass } from "./agents/saul-bass.js";
import { otlAicher } from "./agents/otl-aicher.js";
import { dieterRams } from "./agents/dieter-rams.js";
import { davidCarson } from "./agents/david-carson.js";
import { stefanSagmeister } from "./agents/stefan-sagmeister.js";
import { paulaScher } from "./agents/paula-scher.js";
import { nevilleBrody } from "./agents/neville-brody.js";
import { DesignerAgent } from "./base.js";

const agents: Array<[string, DesignerAgent]> = [
  // Group A: Japanese Aesthetics & Structure
  ["agent_01", kashiwaSato],
  ["agent_02", kenyaHara],
  ["agent_03", takuSatoh],
  ["agent_04", ikkoTanaka],
  ["agent_05", yusakuKamekura],
  ["agent_06", katsumiAsaba],
  ["agent_07", masahikoSato],
  ["agent_08", atsukiKikuchi],
  // Group B: Western Modernism & Rationality
  ["agent_09", paulRand],
  ["agent_10", massimoVignelli],
  ["agent_11", josefMullerBrockmann],
  ["agent_12", wimCrouwel],
  ["agent_13", miltonGlaser],
  ["agent_14", saulBass],
  ["agent_15", otlAicher],
  ["agent_16", dieterRams],
  // Group C: Post-Modern & Experimental (Destructive)
  ["agent_17", davidCarson],
  ["agent_18", stefanSagmeister],
  ["agent_19", paulaScher],
  ["agent_20", nevilleBrody],
];

export const agentRegistry = new Map<string, DesignerAgent>(agents);

export function getAgent(id: string): DesignerAgent | undefined {
  return agentRegistry.get(id);
}

export function listAgents(): DesignerAgent[] {
  return Array.from(agentRegistry.values());
}

export function listAgentsByGroup(group: "A" | "B" | "C"): DesignerAgent[] {
  return Array.from(agentRegistry.values()).filter(
    (agent) => agent.group === group,
  );
}

export function listDestructiveAgents(): DesignerAgent[] {
  return Array.from(agentRegistry.values()).filter(
    (agent) => agent.isDestructive,
  );
}
