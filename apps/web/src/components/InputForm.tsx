"use client";

import type { FormData } from "@/app/page";
import styles from "./InputForm.module.css";

interface InputFormProps {
  formData: FormData;
  onChange: (data: FormData) => void;
}

const mediaTypes = [
  { value: "lp", label: "ランディングページ" },
  { value: "poster", label: "ポスター" },
  { value: "logo", label: "ロゴ" },
  { value: "package", label: "パッケージ" },
  { value: "ui", label: "UIデザイン" },
] as const;

export function InputForm({ formData, onChange }: InputFormProps) {
  return (
    <div className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>作成したい内容</label>
        <textarea
          className={styles.textarea}
          placeholder="例：20代女性向けのオーガニックコスメのLPを作りたい。清潔感があって、信頼できる感じで。"
          value={formData.content}
          onChange={(e) => onChange({ ...formData, content: e.target.value })}
          rows={4}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>ターゲット層</label>
        <input
          type="text"
          className={styles.input}
          placeholder="例：20代女性、オーガニック志向"
          value={formData.targetAudience}
          onChange={(e) =>
            onChange({ ...formData, targetAudience: e.target.value })
          }
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>媒体タイプ</label>
        <div className={styles.radioGroup}>
          {mediaTypes.map((type) => (
            <label key={type.value} className={styles.radioLabel}>
              <input
                type="radio"
                name="mediaType"
                value={type.value}
                checked={formData.mediaType === type.value}
                onChange={(e) =>
                  onChange({
                    ...formData,
                    mediaType: e.target.value as FormData["mediaType"],
                  })
                }
                className={styles.radio}
              />
              <span>{type.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
