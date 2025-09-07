<<<<<<< HEAD
// import React from "react";

// export default function SectionsEditor({ sections, setSections }) {
//   function updateSection(i, val) {
//     const copy = [...sections];
//     copy[i] = val;
//     setSections(copy);
//   }
//   function removeSection(i) {
//     setSections(sections.filter((_, idx) => idx !== i));
//   }
//   function addSection() {
//     setSections([...sections, "New Section"]);
//   }

//   return (
//     <div className="card">
//       <h3>Template Sections</h3>
//       {sections.map((s, idx) => (
//         <div key={idx} className="section-row">
//           <input
//             value={s}
//             onChange={(e) => updateSection(idx, e.target.value)}
//             className="section-input"
//           />
//           <button onClick={() => removeSection(idx)} className="danger small">
//             Remove
//           </button>
//         </div>
//       ))}
//       <div style={{ marginTop: 8 }}>
//         <button onClick={addSection} className="secondary small">
//           + Add Section
//         </button>
//       </div>
//     </div>
//   );
// }



// src/components/SectionsEditor.jsx
import React, { useState, useEffect } from "react";
import EditableSection from "./EditableSection";

/**
 * sections: array of section titles (string) OR
 *    if you have content, pass structure like:
 *    [{ title: "Executive Summary", bullets: [...] }, ...]
 *
 * On change emits updated structure: [{ title, bullets }]
 */
export default function SectionsEditor({ sections = [], setSections }) {
  // Normalise to objects
  const [local, setLocal] = useState(() =>
    sections.map((s) => (typeof s === "string" ? { title: s, bullets: [] } : s))
  );

  useEffect(() => {
    setLocal(sections.map((s) => (typeof s === "string" ? { title: s, bullets: [] } : s)));
  }, [sections]);

  function updateSection(idx, data) {
    const next = local.map((it, i) => (i === idx ? { ...it, ...data } : it));
    setLocal(next);
    setSections?.(next);
  }
  function addSection() {
    const next = [...local, { title: "New Section", bullets: [""] }];
    setLocal(next);
    setSections?.(next);
  }
  function removeSection(idx) {
    const next = local.filter((_, i) => i !== idx);
    setLocal(next);
    setSections?.(next);
  }

  return (
    <div>
      {local.map((s, i) => (
        <div key={i}>
          <EditableSection
            sectionName={s.title}
            bullets={s.bullets}
            onChange={(data) => updateSection(i, data)}
          />
          <div style={{ textAlign: "right", marginBottom: 8 }}>
            <button className="secondary" onClick={() => removeSection(i)}>Remove section</button>
          </div>
        </div>
      ))}
      <div>
        <button className="primary" onClick={addSection}>Add Section</button>
=======
import React from "react";

export default function SectionsEditor({ sections, setSections }) {
  function updateSection(i, val) {
    const copy = [...sections];
    copy[i] = val;
    setSections(copy);
  }
  function removeSection(i) {
    setSections(sections.filter((_, idx) => idx !== i));
  }
  function addSection() {
    setSections([...sections, "New Section"]);
  }

  return (
    <div className="card">
      <h3>Template Sections</h3>
      {sections.map((s, idx) => (
        <div key={idx} className="section-row">
          <input
            value={s}
            onChange={(e) => updateSection(idx, e.target.value)}
            className="section-input"
          />
          <button onClick={() => removeSection(idx)} className="danger small">
            Remove
          </button>
        </div>
      ))}
      <div style={{ marginTop: 8 }}>
        <button onClick={addSection} className="secondary small">
          + Add Section
        </button>
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
      </div>
    </div>
  );
}
