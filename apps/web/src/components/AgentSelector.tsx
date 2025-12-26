"use client";

import styles from "./AgentSelector.module.css";

interface AgentSelectorProps {
  selectedId: string;
  onSelect: (agentId: string) => void;
}

interface AgentInfo {
  id: string;
  name: string;
  name_en: string;
  category: string;
  group: "A" | "B" | "C";
  isDestructive?: boolean;
}

const agents: AgentInfo[] = [
  // Group A: Japanese Aesthetics
  {
    id: "agent_01",
    name: "佐藤可士和",
    name_en: "Kashiwa Sato",
    category: "Iconic Branding",
    group: "A",
  },
  {
    id: "agent_02",
    name: "原研哉",
    name_en: "Kenya Hara",
    category: "Emptiness (Ku)",
    group: "A",
  },
  {
    id: "agent_03",
    name: "佐藤卓",
    name_en: "Taku Satoh",
    category: "Design Anatomy",
    group: "A",
  },
  {
    id: "agent_04",
    name: "田中一光",
    name_en: "Ikko Tanaka",
    category: "Modern Japonesque",
    group: "A",
  },
  {
    id: "agent_05",
    name: "亀倉雄策",
    name_en: "Yusaku Kamekura",
    category: "Standard & Strength",
    group: "A",
  },
  {
    id: "agent_06",
    name: "浅葉克己",
    name_en: "Katsumi Asaba",
    category: "Humor & Heritage",
    group: "A",
  },
  {
    id: "agent_07",
    name: "佐藤雅彦",
    name_en: "Masahiko Sato",
    category: "Structural Logic",
    group: "A",
  },
  {
    id: "agent_08",
    name: "菊地敦己",
    name_en: "Atsuki Kikuchi",
    category: "Off-balance Rhythm",
    group: "A",
  },
  // Group B: Western Modernism
  {
    id: "agent_09",
    name: "Paul Rand",
    name_en: "Paul Rand",
    category: "Witty Symbolism",
    group: "B",
  },
  {
    id: "agent_10",
    name: "Massimo Vignelli",
    name_en: "Massimo Vignelli",
    category: "Strict Grid",
    group: "B",
  },
  {
    id: "agent_11",
    name: "Josef Müller-Brockmann",
    name_en: "Josef Müller-Brockmann",
    category: "Swiss Objective",
    group: "B",
  },
  {
    id: "agent_12",
    name: "Wim Crouwel",
    name_en: "Wim Crouwel",
    category: "Gridnik System",
    group: "B",
  },
  {
    id: "agent_13",
    name: "Milton Glaser",
    name_en: "Milton Glaser",
    category: "Narrative Illustration",
    group: "B",
  },
  {
    id: "agent_14",
    name: "Saul Bass",
    name_en: "Saul Bass",
    category: "Cinematic Minimal",
    group: "B",
  },
  {
    id: "agent_15",
    name: "Otl Aicher",
    name_en: "Otl Aicher",
    category: "Functional Pictogram",
    group: "B",
  },
  {
    id: "agent_16",
    name: "Dieter Rams",
    name_en: "Dieter Rams",
    category: "Less but Better",
    group: "B",
  },
  // Group C: Post-Modern (Destructive)
  {
    id: "agent_17",
    name: "David Carson",
    name_en: "David Carson",
    category: "Grunge & Intuition",
    group: "C",
    isDestructive: true,
  },
  {
    id: "agent_18",
    name: "Stefan Sagmeister",
    name_en: "Stefan Sagmeister",
    category: "Emotional Body",
    group: "C",
    isDestructive: true,
  },
  {
    id: "agent_19",
    name: "Paula Scher",
    name_en: "Paula Scher",
    category: "Typographic Noise",
    group: "C",
    isDestructive: true,
  },
  {
    id: "agent_20",
    name: "Neville Brody",
    name_en: "Neville Brody",
    category: "Radical Type",
    group: "C",
    isDestructive: true,
  },
];

const groupLabels = {
  A: "Japanese Aesthetics & Structure",
  B: "Western Modernism & Rationality",
  C: "Post-Modern & Experimental",
};

export function AgentSelector({ selectedId, onSelect }: AgentSelectorProps) {
  const groups = ["A", "B", "C"] as const;

  return (
    <div className={styles.selector}>
      {groups.map((group) => (
        <div key={group} className={styles.group}>
          <h3 className={styles.groupTitle}>
            <span className={styles.groupBadge}>{group}</span>
            {groupLabels[group]}
          </h3>
          <div className={styles.agentGrid}>
            {agents
              .filter((a) => a.group === group)
              .map((agent) => (
                <button
                  key={agent.id}
                  className={`${styles.agentCard} ${selectedId === agent.id ? styles.selected : ""} ${agent.isDestructive ? styles.destructive : ""}`}
                  onClick={() => onSelect(agent.id)}
                >
                  <span className={styles.agentName}>{agent.name}</span>
                  <span className={styles.agentCategory}>{agent.category}</span>
                  {agent.isDestructive && (
                    <span className={styles.warningBadge}>実験的</span>
                  )}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
