// src/components/EditableSection.jsx
import React, { useState, useEffect, useRef } from "react";

/**
 * EditableSection
 * props:
 *  - sectionName: string
 *  - bullets: string[] (each bullet is plain text or small markdown)
 *  - onChange({ title, bullets })  => called when user edits
 */
export default function EditableSection({ sectionName, bullets = [], onChange }) {
  const [title, setTitle] = useState(sectionName);
  const [items, setItems] = useState(bullets);

  useEffect(() => { setTitle(sectionName); }, [sectionName]);
  useEffect(() => { setItems(bullets); }, [bullets]);

  function setBullet(idx, val) {
    const next = [...items];
    next[idx] = val;
    setItems(next);
    onChange?.({ title, bullets: next });
  }
  function addBullet() {
    const next = [...items, ""];
    setItems(next);
    onChange?.({ title, bullets: next });
  }
  function removeBullet(idx) {
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    onChange?.({ title, bullets: next });
  }
  function onTitleBlur() {
    onChange?.({ title, bullets: items });
  }

  return (
    <div className="editable-section card" style={{ padding: 10, marginBottom: 12 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={onTitleBlur}
        className="section-title-input"
        style={{ fontWeight: "700", fontSize: 16, width: "100%", marginBottom: 8 }}
      />
      <div className="bullets">
        {items.map((b, idx) => (
          <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <textarea
              value={b}
              onChange={(e) => setBullet(idx, e.target.value)}
              rows={2}
              style={{ flex: 1 }}
            />
            <button onClick={() => removeBullet(idx)} className="secondary">Remove</button>
          </div>
        ))}
        <div style={{ marginTop: 6 }}>
          <button onClick={addBullet} className="primary small">Add bullet</button>
        </div>
      </div>
    </div>
  );
}
