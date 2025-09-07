<<<<<<< HEAD
// // src/pages/ComposePage.jsx
// import React from "react";
// import SectionsEditor from "../components/SectionsEditor";
// import ChatBox from "../components/ChatBox";
// import { useUpload } from "../UploadContext";
// import * as api from "../api";

// export default function ComposePage() {
//   const {
//     uploadId,
//     // note: uploadId is the upload_id from /upload; your /generate endpoint expects job_id in the backend code.
//     // The backend's /generate and /generate_template require job_id. Ensure you pass job_id in context (job_id).
//     jobId, // if you stored job_id in context; if not, use uploadResult.job_id where you stored it
//     sections,
//     setSections,
//     topK,
//     setTopK,
//     setGenerated,
//     setDownloadUrl,
//     setLoading,
//     loading,
//     token
//   } = useUpload();

//   // If your context stores uploadResult with job_id, adapt accordingly.
//   async function generateReport() {
//     const job_id = jobId || uploadId; // adapt if you stored jobId elsewhere
//     if (!job_id) {
//       alert("Upload a PDF first (go to Upload).");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await api.generateReport({ job_id, sections, tone: "formal" }, token);
//       setGenerated(res.template?.content || {});
//       setDownloadUrl(res.download || api.downloadUrlFor(job_id));
//     } catch (err) {
//       console.error("Generate failed:", err);
//       alert("Generate failed: " + (err.message || err));
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ display: "flex", gap: 20 }}>
//       <div style={{ flex: 1 }}>
//         <div className="card">
//           <h3>Template Sections</h3>
//           <SectionsEditor sections={sections} setSections={setSections} />
//           <div style={{ marginTop: 12 }}>
//             <label>
//               Top sentences per section:
//               <input
//                 type="number"
//                 min="1"
//                 max="6"
//                 value={topK}
//                 onChange={(e) => setTopK(Number(e.target.value))}
//                 style={{ marginLeft: 8 }}
//               />
//             </label>
//             <div style={{ marginTop: 10 }}>
//               <button className="primary" onClick={generateReport} disabled={loading}>
//                 {loading ? "Generating..." : "Generate Report"}
//               </button>
//             </div>
//           </div>
//         </div>

//         <ChatBox
//           onAddSection={(sec) => {
//             if (!sec) return;
//             setSections((s) => [...s, sec]);
//           }}
//         />
//       </div>

//       <aside style={{ width: 420 }}>
//         <div className="card">
//           <h3>Preview Sections</h3>
//           {sections.map((s, i) => (
//             <div key={i} style={{ marginBottom: 8 }}>
//               <strong>{s}</strong>
//             </div>
//           ))}
//         </div>
//       </aside>
//     </div>
//   );
// }


// src/pages/ComposePage.jsx
// import React, { useEffect, useMemo } from "react";
// import SectionsEditor from "../components/SectionsEditor";
// import ChatBox from "../components/ChatBox";
// import { useUpload } from "../UploadContext";
// import { generateFromFiles, uploadFiles as uploadFilesApi } from "../api";

// export default function ComposePage() {
//   const {
//     uploadId,
//     jobId,
//     files, // if your UploadContext exposes selected files; else use local file state in ChatPage
//     sections,
//     setSections,
//     topK,
//     setTopK,
//     setGenerated,
//     setDownloadUrl,
//     setLoading,
//     loading,
//     token
//   } = useUpload();

//   // Normalize incoming sections to object form [{ title, bullets }]
//   const normalizedSections = useMemo(() => {
//     if (!sections) return [];
//     return sections.map((s) => (typeof s === "string" ? { title: s, bullets: [] } : { title: s.title || s, bullets: s.bullets || [] }));
//   }, [sections]);

//   useEffect(() => {
//     const areAllStrings = Array.isArray(sections) && sections.every((s) => typeof s === "string");
//     if (areAllStrings) {
//       setSections(normalizedSections);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // run once on mount

//   function sectionsAsStrings(arr) {
//     if (!arr) return [];
//     return arr.map((s) => (typeof s === "string" ? s : s.title || ""));
//   }

//   async function generateReport() {
//     const job_id = jobId || uploadId;
//     // If you want single-shot using files from context:
//     if (files && files.length) {
//       setLoading(true);
//       try {
//         const res = await generateFromFiles({ files, question: "Generate a template using the uploaded files" }, token);
//         if (!res.ok) throw new Error(res.error || "Generation failed");
//         setGenerated(res.parsed || res);
//       } catch (err) {
//         console.error(err);
//         alert("Generate failed: " + (err.message || err));
//       } finally {
//         setLoading(false);
//       }
//       return;
//     }

//     // fallback to server-side job-based generate (if you still have /generate)
//     if (!job_id) {
//       alert("Upload a PDF first (go to Upload).");
//       return;
//     }
//     setLoading(true);
//     try {
//       const sectionNames = sectionsAsStrings(sections || normalizedSections);
//       // call your existing generate endpoint if you have it (not included here)
//       // const res = await api.generateReport({ job_id, sections: sectionNames, tone: "formal" }, token);
//       // setGenerated(res.template?.content || {});
//       alert("Server-side generate path is not wired in this ComposePage example. Use /generate_from_files instead.");
//     } catch (err) {
//       console.error("Generate failed:", err);
//       alert("Generate failed: " + (err.message || err));
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleSaveTemplate({ writeDocx = true } = {}) {
//     const job_id = jobId || uploadId;
//     if (!job_id) {
//       alert("Upload a PDF first (go to Upload).");
//       return;
//     }
//     setLoading(true);
//     try {
//       const payloadSections = (sections || normalizedSections).map((s) =>
//         typeof s === "string" ? { title: s, bullets: [] } : { title: s.title || "", bullets: s.bullets || [] }
//       );
//       // TODO: call API to save template (endpoint not included in this snippet).
//       alert("Save template endpoint not implemented in this snippet. Implement /save_template on backend or adapt.");
//     } catch (err) {
//       console.error("Save template failed:", err);
//       alert("Save failed: " + (err.message || err));
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ display: "flex", gap: 20 }}>
//       <div style={{ flex: 1 }}>
//         <div className="card">
//           <h3>Template Sections</h3>
//           <SectionsEditor
//             sections={normalizedSections}
//             setSections={(next) => { setSections(next); }}
//           />

//           <div style={{ marginTop: 12 }}>
//             <label>
//               Top sentences per section:
//               <input
//                 type="number"
//                 min="1"
//                 max="6"
//                 value={topK}
//                 onChange={(e) => setTopK(Number(e.target.value))}
//                 style={{ marginLeft: 8 }}
//               />
//             </label>

//             <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
//               <button className="primary" onClick={generateReport} disabled={loading}>
//                 {loading ? "Generating..." : "Generate Report"}
//               </button>

//               <button className="secondary" onClick={() => handleSaveTemplate({ writeDocx: false })} disabled={loading}>
//                 Save Template
//               </button>

//               <button className="secondary" onClick={() => handleSaveTemplate({ writeDocx: true })} disabled={loading}>
//                 Save & Create DOCX
//               </button>
//             </div>
//           </div>
//         </div>

//         <ChatBox
//           onAddSection={(sec) => {
//             if (!sec) return;
//             const newSection = typeof sec === "string" ? { title: sec, bullets: [] } : sec;
//             setSections((s) => {
//               const curr = s || normalizedSections;
//               return [...curr, newSection];
//             });
//           }}
//         />
//       </div>

//       <aside style={{ width: 420 }}>
//         <div className="card">
//           <h3>Preview Sections</h3>
//           {(sections || normalizedSections).map((s, i) => {
//             const title = typeof s === "string" ? s : s.title;
//             const bullets = typeof s === "string" ? [] : s.bullets || [];
//             return (
//               <div key={i} style={{ marginBottom: 12 }}>
//                 <strong>{title}</strong>
//                 {bullets.length > 0 && (
//                   <ul style={{ marginTop: 6 }}>
//                     {bullets.map((b, idx) => (
//                       <li key={idx} style={{ fontSize: 13, color: "#333" }}>
//                         {b}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </aside>
//     </div>
//   );
// }



// // src/pages/ChatPage.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { generateFromFiles, downloadUrlFor } from "../api";
// import TemplatePreview from "../components/TemplatePreview";
// import "./ChatPage.css";

// export default function ChatPage() {
//   const { token, email } = useAuth();
//   const [files, setFiles] = useState([]); // File[]
//   const [question, setQuestion] = useState("");
//   const [templateResult, setTemplateResult] = useState(null); // parsed JSON returned by backend
//   const [filesSummary, setFilesSummary] = useState([]); // files_payload_summary from backend
//   const [rawOutput, setRawOutput] = useState(null); // raw llm if needed
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const dropRef = useRef(null);

//   useEffect(() => {
//     setMessages([{ from: "system", text: "Select files and ask a question to generate a template." }]);
//   }, []);

//   // drag & drop handlers
//   useEffect(() => {
//     const el = dropRef.current;
//     if (!el) return;
//     const onDragOver = (e) => { e.preventDefault(); el.classList.add("drag-over"); };
//     const onDragLeave = (e) => { e.preventDefault(); el.classList.remove("drag-over"); };
//     const onDrop = (e) => {
//       e.preventDefault();
//       el.classList.remove("drag-over");
//       const dropped = Array.from(e.dataTransfer.files || []);
//       if (dropped.length) setFiles((prev) => [...prev, ...dropped]);
//     };
//     el.addEventListener("dragover", onDragOver);
//     el.addEventListener("dragleave", onDragLeave);
//     el.addEventListener("drop", onDrop);
//     return () => {
//       el.removeEventListener("dragover", onDragOver);
//       el.removeEventListener("dragleave", onDragLeave);
//       el.removeEventListener("drop", onDrop);
//     };
//   }, []);

//   function onFileInputChange(e) {
//     const f = Array.from(e.target.files || []);
//     if (f.length) setFiles((p) => [...p, ...f]);
//   }
//   function removeFile(index) {
//     setFiles((p) => p.filter((_, i) => i !== index));
//   }

//   async function handleGenerate() {
//     setError(null);
//     if (!files || files.length === 0) {
//       setError("Select one or more files first.");
//       return;
//     }
//     if (!question || question.trim().length < 3) {
//       setError("Enter a short question.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await generateFromFiles({ files, question }, token);
//       // backend returns: { ok: true, parsed: {...}, raw: "...", files_payload_summary: [...] }
//       if (!res || res.ok === false) {
//         // show raw llm output if present
//         setError(res?.error || "Generate failed or LLM returned invalid response.");
//         setRawOutput(res?.raw || null);
//         setTemplateResult(res?.parsed || null);
//       } else {
//         const parsed = res.parsed || res;
//         setTemplateResult(parsed);
//         setRawOutput(res.raw || null);
//         setFilesSummary(res.files_payload_summary || []);
//         setMessages((m) => [...m, { from: "assistant", text: "Generated initial template." }]);
//       }
//     } catch (err) {
//       console.error("Generate error:", err);
//       setError(err.message || "Generate failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   function handleStartWithAI() {
//     if (!files || files.length === 0) {
//       setError("Select files first.");
//       return;
//     }
//     setQuestion(selectedTemplate ? `Create a ${selectedTemplate} template` : "Create a custom template");
//     handleGenerate();
//   }

//   function clearAll() {
//     setFiles([]);
//     setTemplateResult(null);
//     setFilesSummary([]);
//     setRawOutput(null);
//     setMessages([{ from: "system", text: "Select files and ask a question to generate a template." }]);
//     setError(null);
//   }

//   // UI helpers
//   const truncatedFiles = (filesSummary || []).filter((f) => f.truncated);

//   return (
//     <div className="app-shell">
//       <aside className="sidebar"> ... </aside>

//       <main className="main">
//         <header className="main-header">
//           <h1>Welcome back, {email?.split?.("@")?.[0] || "User"}!</h1>
//           <p className="muted">Transform your documents with AI-powered productivity tools</p>
//         </header>

//         <section className="upload-area">
//           <div className="upload-inner">
//             <div className="drop-zone" ref={dropRef} onClick={() => document.getElementById("file-input").click()}>
//               <div className="cloud-icon">☁️</div>
//               <h3>Drag & drop your files here</h3>
//               <p className="muted">or click to browse from your device</p>
//               <div className="file-types">
//                 <span className="type">PDF</span><span className="type">Excel</span><span className="type">PPT</span><span className="type">Images</span>
//               </div>
//               <button className="btn-choose" type="button">Choose Files</button>
//               <input id="file-input" type="file" multiple accept=".pdf,.docx,.pptx,.ppt,.xlsx,.xls,.csv,image/*,.txt" onChange={onFileInputChange} style={{ display: "none" }} />
//             </div>

//             <div className="upload-right">
//               <div className="files-list card">
//                 <h4>Selected Files</h4>
//                 {files.length === 0 ? <div className="muted">No files selected yet</div> : (
//                   <ul>
//                     {files.map((f, idx) => (
//                       <li key={idx}>
//                         <div className="file-name">{f.name}</div>
//                         <div className="file-actions">
//                           <small>{(f.size / 1024).toFixed(1)} KB</small>
//                           <button onClick={() => removeFile(idx)} className="link">Remove</button>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//                 <div className="controls">
//                   <button className="primary" onClick={handleGenerate} disabled={loading || !files.length}>
//                     {loading ? "Generating..." : "Generate Template"}
//                   </button>
//                   <button className="secondary" onClick={clearAll}>Clear</button>
//                 </div>

//                 {filesSummary && filesSummary.length > 0 && (
//                   <div className="upload-meta" style={{ marginTop: 8 }}>
//                     <strong>Upload summary:</strong>
//                     <ul style={{ marginTop: 6 }}>
//                       {filesSummary.map((s, i) => (
//                         <li key={i}>
//                           {s.filename} — {s.original_size} bytes — inlined: {s.inlined_bytes} — {s.truncated ? "TRUNCATED" : "inlined"}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <div className="choose-template card" style={{ marginTop: 12 }}>
//                 <h4>Choose a Template</h4>
//                 <div className="template-grid">
//                   {["Proposal", "Report", "Pitch Deck", "Custom Template"].map((t) => (
//                     <div key={t} className={`template-card ${selectedTemplate === t ? "selected" : ""}`} onClick={() => setSelectedTemplate(t)}>
//                       <div className="tmpl-icon">📄</div>
//                       <div className="tmpl-title">{t}</div>
//                       <div className="tmpl-desc muted">
//                         {t === "Proposal" && "Create professional proposals."}
//                         {t === "Report" && "Generate comprehensive reports."}
//                         {t === "Pitch Deck" && "Build compelling pitch decks."}
//                         {t === "Custom Template" && "Let AI suggest the best format."}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="start-row" style={{ marginTop: 8 }}>
//                   <button className="primary" onClick={handleStartWithAI} disabled={!files.length}>Start with AI →</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="work-area">
//           <div className="left-col">
//             <div className="card">
//               <h3>Generate Template (Initial)</h3>
//               <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='Ask something like "Create a consulting template for annual financial review"' />
//               <div className="btn-row" style={{ marginTop: 8 }}>
//                 <button className="primary" onClick={handleGenerate} disabled={loading || !files.length}>
//                   {loading ? "Generating..." : "Generate Template"}
//                 </button>
//               </div>

//               {error && <div className="error" style={{ marginTop: 8 }}>{error}</div>}

//               {/* show truncation/meta notes if present */}
//               {templateResult?.meta?.notes && (
//                 <div className="warning" style={{ marginTop: 12, padding: 10, background: "#fff6e6", borderLeft: "4px solid #f5a623" }}>
//                   <strong>Note:</strong> {templateResult.meta.notes}
//                 </div>
//               )}

//               {/* if files were truncated server-side but meta.notes missing, show general banner */}
//               {truncatedFiles.length > 0 && !templateResult?.meta?.notes && (
//                 <div className="warning" style={{ marginTop: 12, padding: 10, background: "#fff6e6", borderLeft: "4px solid #f5a623" }}>
//                   <strong>Note:</strong> Some files were truncated when inlined into the prompt; details beyond the preview may be missing.
//                 </div>
//               )}

//               {/* Template preview (component handles format -> doc/ppt rendering) */}
//               {templateResult && (
//                 <div style={{ marginTop: 12 }}>
//                   <TemplatePreview parsed={templateResult} />
//                 </div>
//               )}

//               {/* raw LLM output for debugging */}
//               {(!templateResult || !templateResult.template) && rawOutput && (
//                 <div className="result card" style={{ marginTop: 12 }}>
//                   <h4>LLM raw output</h4>
//                   <pre style={{ whiteSpace: "pre-wrap" }}>{rawOutput}</pre>
//                 </div>
//               )}
//             </div>

//             <div className="card" style={{ marginTop: 12 }}>
//               <h3>Refine (Conversational)</h3>
//               <input placeholder='E.g., "Add a Risk Analysis section before Recommendations"' disabled />
//               <div className="btn-row">
//                 <button className="primary" onClick={() => alert(" ")} disabled>Apply Refinement</button>
//               </div>
//             </div>
//           </div>

//           <aside className="right-col">
//             <div className="card user-card"><h4>User</h4><div className="user-email">{email}</div></div>
//             <div className="card convo-card">
//               <h4>Conversation</h4>
//               <div className="messages">{messages.map((m,i)=>(
//                 <div key={i} className={`message ${m.from}`}><div className="message-from">{m.from}</div><div className="message-text">{m.text}</div></div>
//               ))}</div>
//             </div>
//           </aside>
//         </section>
//       </main>
//     </div>
//   );
// }


// src/pages/ChatPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import { generateFromFiles, downloadUrlFor } from "../api";
import TemplatePreview from "../components/TemplatePreview";
import "./ChatPage.css";

export default function ChatPage() {
  const { token, email } = useAuth();
  const [files, setFiles] = useState([]); // File[]
  const [question, setQuestion] = useState("");
  const [templateResult, setTemplateResult] = useState(null); // parsed JSON returned by backend (if parsed)
  const [filesSummary, setFilesSummary] = useState([]); // files_payload_summary from backend
  const [rawOutput, setRawOutput] = useState(null); // raw llm if needed
  const [backendAnswers, setBackendAnswers] = useState([]); // store backend.answers array
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const dropRef = useRef(null);
  const [refineText, setRefineText] = useState("");

  useEffect(() => {
    setMessages([{ from: "system", text: "Select files and ask a question to generate a template." }]);
  }, []);

  // drag & drop handlers
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    const onDragOver = (e) => { e.preventDefault(); el.classList.add("drag-over"); };
    const onDragLeave = (e) => { e.preventDefault(); el.classList.remove("drag-over"); };
    const onDrop = (e) => {
      e.preventDefault();
      el.classList.remove("drag-over");
      const dropped = Array.from(e.dataTransfer.files || []);
      if (dropped.length) setFiles((prev) => [...prev, ...dropped]);
    };
    el.addEventListener("dragover", onDragOver);
    el.addEventListener("dragleave", onDragLeave);
    el.addEventListener("drop", onDrop);
    return () => {
      el.removeEventListener("dragover", onDragOver);
      el.removeEventListener("dragleave", onDragLeave);
      el.removeEventListener("drop", onDrop);
    };
  }, []);

  function onFileInputChange(e) {
    const f = Array.from(e.target.files || []);
    if (f.length) setFiles((p) => [...p, ...f]);
  }
  function removeFile(index) {
    setFiles((p) => p.filter((_, i) => i !== index));
  }

  // -------------------------
  // Updated: handleGenerate
  // -------------------------
  async function handleGenerate() {
    setError(null);
    setBackendAnswers([]);
    setTemplateResult(null);
    setRawOutput(null);

    if (!files || files.length === 0) {
      setError("Select one or more files first.");
      return;
    }
    if (!question || question.trim().length < 3) {
      setError("Enter a short question.");
=======
// src/pages/ComposePage.jsx
import React from "react";
import SectionsEditor from "../components/SectionsEditor";
import ChatBox from "../components/ChatBox";
import { useUpload } from "../UploadContext";
import * as api from "../api";

export default function ComposePage() {
  const {
    uploadId,
    // note: uploadId is the upload_id from /upload; your /generate endpoint expects job_id in the backend code.
    // The backend's /generate and /generate_template require job_id. Ensure you pass job_id in context (job_id).
    jobId, // if you stored job_id in context; if not, use uploadResult.job_id where you stored it
    sections,
    setSections,
    topK,
    setTopK,
    setGenerated,
    setDownloadUrl,
    setLoading,
    loading,
    token
  } = useUpload();

  // If your context stores uploadResult with job_id, adapt accordingly.
  async function generateReport() {
    const job_id = jobId || uploadId; // adapt if you stored jobId elsewhere
    if (!job_id) {
      alert("Upload a PDF first (go to Upload).");
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
      return;
    }
    setLoading(true);
    try {
<<<<<<< HEAD
      const res = await generateFromFiles({ files, question }, token);
      // backend may return:
      // - { ok: true, parsed: {...}, raw: "...", files_payload_summary: [...] }
      // - or { answers: [...] } (your RAG output)
      if (!res || res.ok === false) {
        setError(res?.error || "Generate failed or LLM returned invalid response.");
        setRawOutput(res?.raw || null);
        setTemplateResult(res?.parsed || null);
        return;
      }

      // If backend returned answers array, prefer that
      if (Array.isArray(res.answers) && res.answers.length > 0) {
        setBackendAnswers(res.answers);

        // Try to extract a fenced JSON block (```json ... ``` or ``` ... ```) from the first answer
        const first = String(res.answers[0] || "");
        const fencedRegex = /```(?:json)?\s*([\s\S]*?)```/i;
        const match = first.match(fencedRegex);

        if (match && match[1]) {
          const candidate = match[1].trim();
          try {
            const parsed = JSON.parse(candidate);
            // if parsed is the shape you expect, set templateResult; otherwise keep parsed anyway
            setTemplateResult(parsed);
            setRawOutput(null);
          } catch (err) {
            // not valid JSON — just keep the raw answer text
            setRawOutput(first);
            setTemplateResult(null);
          }
        } else {
          // no fenced JSON — try to parse the whole answer as JSON (some backends return JSON without fences)
          try {
            const parsedWhole = JSON.parse(first);
            setTemplateResult(parsedWhole);
            setRawOutput(null);
          } catch (err) {
            // fallback: show raw answer text
            setRawOutput(first);
            setTemplateResult(null);
          }
        }

        // keep files summary if backend provided it
        if (res.files_payload_summary) setFilesSummary(res.files_payload_summary);
        setMessages((m) => [...m, { from: "assistant", text: "Received answers from backend." }]);
        return;
      }

      // Otherwise fallback to original parsed/raw handling
      const parsed = res.parsed || res;
      setTemplateResult(parsed);
      setRawOutput(res.raw || null);
      setFilesSummary(res.files_payload_summary || []);
      setMessages((m) => [...m, { from: "assistant", text: "Generated initial template." }]);
    } catch (err) {
      console.error("Generate error:", err);
      setError(err.message || "Generate failed");
=======
      const res = await api.generateReport({ job_id, sections, tone: "formal" }, token);
      setGenerated(res.template?.content || {});
      setDownloadUrl(res.download || api.downloadUrlFor(job_id));
    } catch (err) {
      console.error("Generate failed:", err);
      alert("Generate failed: " + (err.message || err));
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
    } finally {
      setLoading(false);
    }
  }

<<<<<<< HEAD
  function handleStartWithAI() {
    if (!files || files.length === 0) {
      setError("Select files first.");
      return;
    }
    setQuestion(selectedTemplate ? `Create a ${selectedTemplate} template` : "Create a custom template");
    handleGenerate();
  }

  function clearAll() {
    setFiles([]);
    setTemplateResult(null);
    setFilesSummary([]);
    setRawOutput(null);
    setBackendAnswers([]);
    setMessages([{ from: "system", text: "Select files and ask a question to generate a template." }]);
    setError(null);
  }

  // UI helpers
  const truncatedFiles = (filesSummary || []).filter((f) => f.truncated);

  return (
    <div className="app-shell">
      <aside className="sidebar"> ... </aside>

      <main className="main">
        <header className="main-header">
          <h1>Welcome back, {email?.split?.("@")?.[0] || "User"}!</h1>
          <p className="muted">Transform your documents with AI-powered productivity tools</p>
        </header>

        <section className="upload-area">
          <div className="upload-inner">
            <div className="drop-zone" ref={dropRef} onClick={() => document.getElementById("file-input").click()}>
              <div className="cloud-icon">☁️</div>
              <h3>Drag & drop your files here</h3>
              <p className="muted">or click to browse from your device</p>
              <div className="file-types">
                <span className="type">PDF</span><span className="type">Excel</span><span className="type">PPT</span><span className="type">Images</span>
              </div>
              <button className="btn-choose" type="button">Choose Files</button>
              <input id="file-input" type="file" multiple accept=".pdf,.docx,.pptx,.ppt,.xlsx,.xls,.csv,image/*,.txt" onChange={onFileInputChange} style={{ display: "none" }} />
            </div>

            <div className="upload-right">
              <div className="files-list card">
                <h4>Selected Files</h4>
                {files.length === 0 ? <div className="muted">No files selected yet</div> : (
                  <ul>
                    {files.map((f, idx) => (
                      <li key={idx}>
                        <div className="file-name">{f.name}</div>
                        <div className="file-actions">
                          <small>{(f.size / 1024).toFixed(1)} KB</small>
                          <button onClick={() => removeFile(idx)} className="link">Remove</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="controls">
                  <button className="primary" onClick={handleGenerate} disabled={loading || !files.length}>
                    {loading ? "Generating..." : "Generate Template"}
                  </button>
                  <button className="secondary" onClick={clearAll}>Clear</button>
                </div>

                {filesSummary && filesSummary.length > 0 && (
                  <div className="upload-meta" style={{ marginTop: 8 }}>
                    <strong>Upload summary:</strong>
                    <ul style={{ marginTop: 6 }}>
                      {filesSummary.map((s, i) => (
                        <li key={i}>
                          {s.filename} — {s.original_size} bytes — inlined: {s.inlined_bytes} — {s.truncated ? "TRUNCATED" : "inlined"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="choose-template card" style={{ marginTop: 12 }}>
                <h4>Choose a Template</h4>
                <div className="template-grid">
                  {["Proposal", "Report", "Pitch Deck", "Custom Template"].map((t) => (
                    <div key={t} className={`template-card ${selectedTemplate === t ? "selected" : ""}`} onClick={() => setSelectedTemplate(t)}>
                      <div className="tmpl-icon">📄</div>
                      <div className="tmpl-title">{t}</div>
                      <div className="tmpl-desc muted">
                        {t === "Proposal" && "Create professional proposals."}
                        {t === "Report" && "Generate comprehensive reports."}
                        {t === "Pitch Deck" && "Build compelling pitch decks."}
                        {t === "Custom Template" && "Let AI suggest the best format."}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="start-row" style={{ marginTop: 8 }}>
                  <button className="primary" onClick={handleStartWithAI} disabled={!files.length}>Start with AI →</button>
                </div>
              </div>
            </div>
          </div>
        </section>

       
      </main>
    </div>
  );
}

=======
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ flex: 1 }}>
        <div className="card">
          <h3>Template Sections</h3>
          <SectionsEditor sections={sections} setSections={setSections} />
          <div style={{ marginTop: 12 }}>
            <label>
              Top sentences per section:
              <input
                type="number"
                min="1"
                max="6"
                value={topK}
                onChange={(e) => setTopK(Number(e.target.value))}
                style={{ marginLeft: 8 }}
              />
            </label>
            <div style={{ marginTop: 10 }}>
              <button className="primary" onClick={generateReport} disabled={loading}>
                {loading ? "Generating..." : "Generate Report"}
              </button>
            </div>
          </div>
        </div>

        <ChatBox
          onAddSection={(sec) => {
            if (!sec) return;
            setSections((s) => [...s, sec]);
          }}
        />
      </div>

      <aside style={{ width: 420 }}>
        <div className="card">
          <h3>Preview Sections</h3>
          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <strong>{s}</strong>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
