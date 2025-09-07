import React, { useState } from "react";

export default function ChatBox({ onAddSection }) {
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim()) return;
    // For this MVP frontend, we interpret chat only for "Add section: <name>"
    // but we provide a simple add-section flow.
    onAddSection(text.trim());
    setText("");
  }

  return (
    <div className="card">
      <h3>Conversational Add (demo)</h3>
      <p>Type a new section name and press Add. (E.g., "Risk Analysis")</p>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new section..."
        />
        <button onClick={submit} className="secondary">
          Add
        </button>
      </div>
    </div>
  );
}
