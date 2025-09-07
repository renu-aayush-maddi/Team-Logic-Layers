// src/components/LanguagePrompt.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguagePrompt({ suggested, onAccept, onReject }) {
  const { t } = useTranslation();
  if (!suggested) return null;

  return (
    <div style={{
      position: "fixed", top: 16, right: 16, zIndex: 9999,
      background: "#0f1b2d", color: "#e7eef7",
      border: "1px solid #1f2b3b", borderRadius: 8, padding: 16, width: 320,
      boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
    }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{t("changeLanguage")}</div>
      <div style={{ marginBottom: 12 }}>
        {t("languageDetected", { lang: suggested })}
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button onClick={onReject} style={{ padding: "8px 12px", borderRadius: 6, background: "transparent", color: "#9fb3d2", border: "1px solid #1f2b3b", cursor: "pointer" }}>
          {t("no")}
        </button>
        <button onClick={onAccept} style={{ padding: "8px 12px", borderRadius: 6, background: "#7aa2f7", border: "none", color: "#0b1726", fontWeight: 700, cursor: "pointer" }}>
          {t("yes")}
        </button>
      </div>
    </div>
  );
}
