// // src/components/TemplatePreview.jsx
// import React from "react";

// /**
//  * TemplatePreview
//  * Props:
//  *  - parsed: { format, template: [titles], content: { title: [strings] }, meta: {...} }
//  *
//  * Renders a different view depending on parsed.format (ppt vs research_paper vs meeting_summary etc).
//  */
// export default function TemplatePreview({ parsed }) {
//   if (!parsed) return null;

//   const fmt = (parsed.format || "").toLowerCase();
//   const template = parsed.template || [];
//   const content = parsed.content || {};
//   const meta = parsed.meta || {};

//   const renderResearchPaper = () => (
//     <div>
//       <h3>Research Paper Preview</h3>
//       {template.map((title, idx) => (
//         <section key={idx} style={{ marginBottom: 16 }}>
//           <h4 style={{ margin: "8px 0" }}>{title}</h4>
//           {(content[title] || []).map((p, i) => (
//             <p key={i} style={{ margin: "6px 0", whiteSpace: "pre-wrap" }}>{p}</p>
//           ))}
//         </section>
//       ))}
//       {meta.notes && <div style={{ marginTop: 10, color: "#666" }}><strong>Notes:</strong> {meta.notes}</div>}
//     </div>
//   );

//   const renderMeetingSummary = () => (
//     <div>
//       <h3>Meeting Summary Preview</h3>
//       {template.map((title, idx) => (
//         <div key={idx} style={{ marginBottom: 12 }}>
//           <strong>{title}</strong>
//           <ul>
//             {(content[title] || []).map((b, i) => <li key={i} style={{ whiteSpace: "pre-wrap" }}>{b}</li>)}
//           </ul>
//         </div>
//       ))}
//       {meta.notes && <div style={{ marginTop: 10, color: "#666" }}><strong>Notes:</strong> {meta.notes}</div>}
//     </div>
//   );

//   const renderPpt = () => (
//     <div>
//       <h3>Slides Preview (PPT)</h3>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
//         {template.map((title, idx) => (
//           <div key={idx} style={{ border: "1px solid #ddd", borderRadius: 6, padding: 10, background: "#fafafa" }}>
//             <strong style={{ display: "block", marginBottom: 8 }}>{title}</strong>
//             <ul style={{ paddingLeft: 18 }}>
//               {(content[title] || []).map((b, i) => <li key={i} style={{ fontSize: 13 }}>{b}</li>)}
//             </ul>
//           </div>
//         ))}
//       </div>
//       {meta.notes && <div style={{ marginTop: 10, color: "#666" }}><strong>Notes:</strong> {meta.notes}</div>}
//     </div>
//   );

//   const renderGenericReport = () => (
//     <div>
//       <h3>Report Preview</h3>
//       {template.map((title, idx) => (
//         <div key={idx} style={{ marginBottom: 12 }}>
//           <h4 style={{ margin: "6px 0" }}>{title}</h4>
//           {(content[title] || []).map((b, i) => <p key={i} style={{ margin: "6px 0", whiteSpace: "pre-wrap" }}>{b}</p>)}
//         </div>
//       ))}
//       {meta.notes && <div style={{ marginTop: 10, color: "#666" }}><strong>Notes:</strong> {meta.notes}</div>}
//     </div>
//   );

//   const renderProposal = () => (
//     <div>
//       <h3>Proposal Preview</h3>
//       {template.map((title, idx) => (
//         <div key={idx} style={{ marginBottom: 12 }}>
//           <h4 style={{ margin: "6px 0" }}>{title}</h4>
//           <ul>
//             {(content[title] || []).map((b, i) => <li key={i}>{b}</li>)}
//           </ul>
//         </div>
//       ))}
//       {meta.notes && <div style={{ marginTop: 10, color: "#666" }}><strong>Notes:</strong> {meta.notes}</div>}
//     </div>
//   );

//   const renderEmail = () => (
//     <div>
//       <h3>Email Preview</h3>
//       {template.map((title, idx) => (
//         <div key={idx} style={{ marginBottom: 12 }}>
//           <h4 style={{ margin: "6px 0" }}>{title}</h4>
//           {(content[title] || []).map((b, i) => <p key={i} style={{ margin: "6px 0" }}>{b}</p>)}
//         </div>
//       ))}
//     </div>
//   );

//   // decide renderer
//   switch (fmt) {
//     case "research_paper":
//     case "research-paper":
//     case "research paper":
//       return renderResearchPaper();
//     case "meeting_summary":
//     case "meeting-summary":
//     case "meeting summary":
//       return renderMeetingSummary();
//     case "ppt":
//     case "presentation":
//     case "slides":
//       return renderPpt();
//     case "report":
//       return renderGenericReport();
//     case "proposal":
//       return renderProposal();
//     case "email":
//       return renderEmail();
//     case "notes":
//       return renderGenericReport();
//     default:
//       // fallback generic
//       return (
//         <div>
//           <h3>Auto preview (detected format: {parsed.format || "unknown"})</h3>
//           {template.map((title, idx) => (
//             <div key={idx} style={{ marginBottom: 12 }}>
//               <h4 style={{ margin: "6px 0" }}>{title}</h4>
//               <ul>
//                 {(content[title] || []).map((b, i) => <li key={i} style={{ whiteSpace: "pre-wrap" }}>{b}</li>)}
//               </ul>
//             </div>
//           ))}
//           {meta.notes && <div style={{ marginTop: 10, color: "#666" }}><strong>Notes:</strong> {meta.notes}</div>}
//         </div>
//       );
//   }
// }



// // src/components/TemplatePreview.jsx
// import React, { useState, useEffect } from "react";

// /**
//  * Props:
//  *  - parsed: the parsed template JSON from backend
//  *  - onChange: (newParsed) => void  // called whenever user edits the template
//  */
// export default function TemplatePreview({ parsed, onChange }) {
//   const [local, setLocal] = useState(parsed || { title: "", sections: [] });

//   // sync when backend updates
//   useEffect(() => setLocal(parsed || { title: "", sections: [] }), [parsed]);

//   // helper to notify parent
//   function updateAndNotify(next) {
//     setLocal(next);
//     if (onChange) onChange(next);
//   }

//   // add a new section
//   function addSection() {
//     const next = {
//       ...local,
//       sections: [...(local.sections || []), { id: Date.now(), title: "New section", body: "Write content..." }],
//     };
//     updateAndNotify(next);
//   }

//   function updateSection(idx, patch) {
//     const sections = [...local.sections];
//     sections[idx] = { ...sections[idx], ...patch };
//     updateAndNotify({ ...local, sections });
//   }

//   function removeSection(idx) {
//     const sections = [...local.sections];
//     sections.splice(idx, 1);
//     updateAndNotify({ ...local, sections });
//   }

//   function moveSection(from, to) {
//     if (to < 0 || to >= (local.sections || []).length) return;
//     const sections = [...local.sections];
//     const [item] = sections.splice(from, 1);
//     sections.splice(to, 0, item);
//     updateAndNotify({ ...local, sections });
//   }

//   // simple inline editable text component
//   function Editable({ value, onChange, placeholder, rows = 1 }) {
//     return (
//       <textarea
//         className="editable-input"
//         value={value || ""}
//         placeholder={placeholder}
//         rows={rows}
//         onChange={(e) => onChange(e.target.value)}
//         style={{ width: "100%", fontFamily: "inherit", fontSize: 14, padding: 8, resize: "vertical" }}
//       />
//     );
//   }

//   return (
//     <div className="template-preview">
//       <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
//         <h2 style={{ margin: 0 }}>Editable Template</h2>
//         <button className="secondary" onClick={addSection} style={{ marginLeft: "auto" }}>+ Add section</button>
//       </div>

//       <div style={{ marginBottom: 12 }}>
//         <label style={{ fontSize: 12, color: "#666" }}>Title</label>
//         <Editable
//           value={local.title}
//           onChange={(v) => updateAndNotify({ ...local, title: v })}
//           placeholder="Document title"
//           rows={1}
//         />
//       </div>

//       <div className="sections">
//         {(local.sections || []).map((s, i) => (
//           <div key={s.id ?? i} className="section card" style={{ padding: 12, marginBottom: 10 }}>
//             <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//               <strong style={{ marginRight: 8 }}>{i + 1}.</strong>
//               <div style={{ flex: 1 }}>
//                 <Editable
//                   value={s.title}
//                   onChange={(v) => updateSection(i, { title: v })}
//                   placeholder="Section title"
//                 />
//               </div>

//               <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
//                 <button className="link" onClick={() => moveSection(i, i - 1)} disabled={i === 0}>↑</button>
//                 <button className="link" onClick={() => moveSection(i, i + 1)} disabled={i === (local.sections || []).length - 1}>↓</button>
//                 <button className="link danger" onClick={() => removeSection(i)}>Remove</button>
//               </div>
//             </div>

//             <div style={{ marginTop: 8 }}>
//               <label style={{ fontSize: 12, color: "#666" }}>Content</label>
//               <Editable
//                 value={s.body}
//                 onChange={(v) => updateSection(i, { body: v })}
//                 placeholder="Section content"
//                 rows={6}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* quick raw JSON view (collapsible would be nicer) */}
//       <details style={{ marginTop: 8 }}>
//         <summary style={{ cursor: "pointer" }}>View JSON</summary>
//         <pre style={{ whiteSpace: "pre-wrap", maxHeight: 240, overflow: "auto" }}>{JSON.stringify(local, null, 2)}</pre>
//       </details>
//     </div>
//   );
// }





// src/components/TemplatePreview.jsx
import React, { useState, useEffect } from "react";

/**
 * Props:
 *  - parsed: the parsed template JSON from backend
 *  - onChange: (newParsed) => void  // called whenever user edits the template
 */
export default function TemplatePreview({ parsed, onChange }) {
  const [local, setLocal] = useState(parsed || { title: "", sections: [] });
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState(null);

  // sync when backend updates
  useEffect(() => setLocal(parsed || { title: "", sections: [] }), [parsed]);

  // helper to notify parent
  function updateAndNotify(next) {
    setLocal(next);
    if (onChange) onChange(next);
  }

  // add a new section
  function addSection() {
    const next = {
      ...local,
      sections: [...(local.sections || []), { id: Date.now(), title: "New section", body: "Write content..." }],
    };
    updateAndNotify(next);
  }

  function updateSection(idx, patch) {
    const sections = [...(local.sections || [])];
    sections[idx] = { ...sections[idx], ...patch };
    updateAndNotify({ ...local, sections });
  }

  function removeSection(idx) {
    const sections = [...(local.sections || [])];
    sections.splice(idx, 1);
    updateAndNotify({ ...local, sections });
  }

  function moveSection(from, to) {
    if (to < 0 || to >= (local.sections || []).length) return;
    const sections = [...(local.sections || [])];
    const [item] = sections.splice(from, 1);
    sections.splice(to, 0, item);
    updateAndNotify({ ...local, sections });
  }

  // simple inline editable text component
  function Editable({ value, onChange, placeholder, rows = 1 }) {
    return (
      <textarea
        className="editable-input"
        value={value || ""}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", fontFamily: "inherit", fontSize: 14, padding: 8, resize: "vertical" }}
      />
    );
  }

  // helper: posts JSON to /convert and saves returned file
  async function postAndDownload(queryFormat = "auto") {
    setLoading(true);
    setLastError(null);
    try {
      // adjust URL if backend runs on different host/port (e.g. http://localhost:8000/convert)
      const url = `http://localhost:8080/convert${queryFormat && queryFormat !== "auto" ? `?format=${queryFormat}` : ""}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(local),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server error: ${res.status} ${txt}`);
      }

      const blob = await res.blob();
      // try to parse filename from header
      const cd = res.headers.get("Content-Disposition") || "";
      let filename = "download";
      const match = cd.match(/filename\*=UTF-8''(.+)|filename="(.+)"|filename=(.+)/);
      if (match) {
        filename = decodeURIComponent(match[1] || match[2] || match[3]);
      } else {
        // fallback based on mime
        const type = blob.type || "";
        if (type.includes("presentation")) filename = "presentation.pptx";
        else if (type.includes("pdf")) filename = "document.pdf";
        else filename = "download.bin";
      }

      const urlBlob = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(urlBlob);
    } catch (err) {
      console.error("Download error:", err);
      setLastError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="template-preview">
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <h2 style={{ margin: 0 }}>Editable Template</h2>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="secondary" onClick={() => postAndDownload("auto")} disabled={loading}>
            {loading ? "Generating..." : "Download (auto-detect)"}
          </button>
          <button className="secondary" onClick={() => postAndDownload("pptx")} disabled={loading}>
            {loading ? "..." : "Download as PPTX"}
          </button>
          <button className="secondary" onClick={() => postAndDownload("pdf")} disabled={loading}>
            {loading ? "..." : "Download as PDF"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, color: "#666" }}>Title</label>
        <Editable
          value={local.title}
          onChange={(v) => updateAndNotify({ ...local, title: v })}
          placeholder="Document title"
          rows={1}
        />
      </div>

      <div className="sections">
        {(local.sections || []).map((s, i) => (
          <div key={s.id ?? i} className="section card" style={{ padding: 12, marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <strong style={{ marginRight: 8 }}>{i + 1}.</strong>
              <div style={{ flex: 1 }}>
                <Editable
                  value={s.title}
                  onChange={(v) => updateSection(i, { title: v })}
                  placeholder="Section title"
                />
              </div>

              <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
                <button className="link" onClick={() => moveSection(i, i - 1)} disabled={i === 0}>↑</button>
                <button className="link" onClick={() => moveSection(i, i + 1)} disabled={i === (local.sections || []).length - 1}>↓</button>
                <button className="link danger" onClick={() => removeSection(i)}>Remove</button>
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <label style={{ fontSize: 12, color: "#666" }}>Content</label>
              <Editable
                value={s.body}
                onChange={(v) => updateSection(i, { body: v })}
                placeholder="Section content"
                rows={6}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button className="secondary" onClick={addSection}>+ Add section</button>
      </div>

      {lastError && (
        <div style={{ marginTop: 10, color: "crimson" }}>
          <strong>Error:</strong> {lastError}
        </div>
      )}

      <details style={{ marginTop: 8 }}>
        <summary style={{ cursor: "pointer" }}>View JSON</summary>
        <pre style={{ whiteSpace: "pre-wrap", maxHeight: 240, overflow: "auto" }}>{JSON.stringify(local, null, 2)}</pre>
      </details>
    </div>
  );
}
