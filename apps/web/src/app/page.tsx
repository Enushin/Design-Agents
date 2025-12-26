"use client";

import { useState } from "react";
import { AgentSelector } from "@/components/AgentSelector";
import { InputForm } from "@/components/InputForm";
import { PreviewPanel } from "@/components/PreviewPanel";
import styles from "./page.module.css";

export interface FormData {
  content: string;
  targetAudience: string;
  mediaType: "lp" | "poster" | "logo" | "package" | "ui";
  agentId: string;
}

export interface GenerationResult {
  html: string;
  css: string;
  agentName: string;
  qaScore: number;
  qaIssues: string[];
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    content: "",
    targetAudience: "",
    mediaType: "lp",
    agentId: "agent_01",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formData.content.trim()) {
      setError("作成したい内容を入力してください");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("生成に失敗しました");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>DDPO</h1>
        <p className={styles.subtitle}>Deep Design Philosophy Orchestra</p>
      </header>

      <div className={styles.container}>
        <section className={styles.inputSection}>
          <h2 className={styles.sectionTitle}>1. プロジェクト情報</h2>
          <InputForm formData={formData} onChange={setFormData} />

          <h2 className={styles.sectionTitle}>2. アートディレクター選択</h2>
          <AgentSelector
            selectedId={formData.agentId}
            onSelect={(agentId) => setFormData({ ...formData, agentId })}
          />

          <button
            className={styles.generateButton}
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            {isGenerating ? "生成中..." : "デザインを生成"}
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </section>

        <section className={styles.previewSection}>
          <h2 className={styles.sectionTitle}>プレビュー</h2>
          <PreviewPanel result={result} isLoading={isGenerating} />
        </section>
      </div>
    </main>
  );
}
