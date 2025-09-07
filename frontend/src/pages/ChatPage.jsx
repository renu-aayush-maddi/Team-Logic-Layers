// import React, { useEffect, useState } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { uploadPdf, generateTemplate, refine, downloadUrlFor } from "../api";

// export default function ChatPage() {
//   const { token, email } = useAuth();
//   const [file, setFile] = useState(null);
//   const [uploadResult, setUploadResult] = useState(null); // { job_id, upload_id, filename, num_pages }
//   const [question, setQuestion] = useState("");
//   const [templateResult, setTemplateResult] = useState(null); // { template: {sections, content}, download }
//   const [instruction, setInstruction] = useState("");
//   const [refineResult, setRefineResult] = useState(null);
//   const [messages, setMessages] = useState([]); // optional simple chat log
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setMessages([{ from: "system", text: "Upload a PDF and ask a question to generate a template." }]);
//   }, []);

//   async function handleUpload() {
//     if (!file) return setError("Select a PDF file first.");
//     setError(null);
//     setLoading(true);
//     try {
//       const res = await uploadPdf(file, token);
//       setUploadResult(res);
//       setMessages((m) => [...m, { from: "system", text: `Uploaded: ${res.filename} (pages: ${res.num_pages})` }]);
//     } catch (err) {
//       setError(err.message || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleGenerate() {
//     if (!uploadResult) return setError("Upload a file first.");
//     if (!question || question.trim().length < 3) return setError("Enter a short question or prompt.");
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await generateTemplate({ job_id: uploadResult.job_id, question, top_k: 5 }, token);
//       setTemplateResult(res);
//       setMessages((m) => [...m, { from: "assistant", text: "Generated initial template." }]);
//     } catch (err) {
//       setError(err.message || "Generate failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleRefine() {
//     if (!uploadResult) return setError("Upload a file first.");
//     if (!instruction || instruction.trim().length < 3) return setError("Enter a refinement instruction.");
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await refine({ job_id: uploadResult.job_id, instruction }, token);
//       setRefineResult(res);
//       setMessages((m) => [...m, { from: "assistant", text: "Refinement applied." }]);
//     } catch (err) {
//       setError(err.message || "Refine failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ display: "flex", gap: 20 }}>
//       <div style={{ flex: 1 }}>
//         <div className="card">
//           <h3>Upload PDF</h3>
//           <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
//           <div style={{ marginTop: 8 }}>
//             <button className="primary" onClick={handleUpload} disabled={loading || !file}>
//               {loading ? "Uploading..." : "Upload"}
//             </button>
//           </div>
//           {uploadResult && (
//             <div style={{ marginTop: 10 }}>
//               <div><strong>Uploaded:</strong> {uploadResult.filename}</div>
//               <div><strong>Job ID:</strong> {uploadResult.job_id}</div>
//               <div><strong>Upload ID:</strong> {uploadResult.upload_id}</div>
//             </div>
//           )}
//         </div>

//         <div className="card" style={{ marginTop: 12 }}>
//           <h3>Generate Template (Initial)</h3>
//           <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='Ask something like "Create a consulting template for annual financial review"' rows={3} />
//           <div style={{ marginTop: 8 }}>
//             <button className="primary" onClick={handleGenerate} disabled={loading || !uploadResult}>
//               {loading ? "Generating..." : "Generate Template"}
//             </button>
//           </div>

//           {templateResult && templateResult.template && (
//             <div style={{ marginTop: 12 }}>
//               <h4>Template Sections</h4>
//               <ul>
//                 {templateResult.template.sections.map((s, i) => <li key={i}>{s}</li>)}
//               </ul>
//               <h4>Sample Content</h4>
//               {Object.entries(templateResult.template.content).map(([k, bullets]) => (
//                 <div key={k} style={{ marginBottom: 8 }}>
//                   <strong>{k}</strong>
//                   <ul>
//                     {bullets.map((b, idx) => <li key={idx}><pre style={{ margin: 0 }}>{b}</pre></li>)}
//                   </ul>
//                 </div>
//               ))}
//               <div style={{ marginTop: 8 }}>
//                 <a href={downloadUrlFor(uploadResult.job_id)} target="_blank" rel="noreferrer" className="download">⤓ Download DOCX</a>
//               </div>
//             </div>
//           )}
//         </div>

<<<<<<< HEAD
      //   <div className="card" style={{ marginTop: 12 }}>
      //     <h3>Refine (Conversational)</h3>
      //     <input value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder='E.g., "Add a Risk Analysis section before Recommendations"' />
      //     <div style={{ marginTop: 8 }}>
      //       <button className="primary" onClick={handleRefine} disabled={loading || !uploadResult}>
      //         {loading ? "Applying..." : "Apply Refinement"}
      //       </button>
      //     </div>

      //     {refineResult && refineResult.template && (
      //       <div style={{ marginTop: 12 }}>
      //         <h4>Refined Template Sections</h4>
      //         <ul>
      //           {refineResult.template.sections.map((s, i) => <li key={i}>{s}</li>)}
      //         </ul>
      //         <div style={{ marginTop: 8 }}>
      //           <a href={downloadUrlFor(uploadResult.job_id)} target="_blank" rel="noreferrer" className="download">⤓ Download Refined DOCX</a>
      //         </div>
      //       </div>
      //     )}
      //   </div>
      // </div>
=======
//         <div className="card" style={{ marginTop: 12 }}>
//           <h3>Refine (Conversational)</h3>
//           <input value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder='E.g., "Add a Risk Analysis section before Recommendations"' />
//           <div style={{ marginTop: 8 }}>
//             <button className="primary" onClick={handleRefine} disabled={loading || !uploadResult}>
//               {loading ? "Applying..." : "Apply Refinement"}
//             </button>
//           </div>

//           {refineResult && refineResult.template && (
//             <div style={{ marginTop: 12 }}>
//               <h4>Refined Template Sections</h4>
//               <ul>
//                 {refineResult.template.sections.map((s, i) => <li key={i}>{s}</li>)}
//               </ul>
//               <div style={{ marginTop: 8 }}>
//                 <a href={downloadUrlFor(uploadResult.job_id)} target="_blank" rel="noreferrer" className="download">⤓ Download Refined DOCX</a>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55

//       <aside style={{ width: 340 }}>
//         <div className="card">
//           <h3>User</h3>
//           <div><strong>{email}</strong></div>
//         </div>

//         <div className="card">
//           <h3>Conversation</h3>
//           <div style={{ maxHeight: 380, overflow: "auto" }}>
//             {messages.map((m, i) => (
//               <div key={i} style={{ marginBottom: 8 }}>
//                 <strong style={{ color: m.from === "user" ? "#111827" : "#2563eb" }}>{m.from}</strong>
//                 <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
//       </aside>
//     </div>
//   );
// }



<<<<<<< HEAD
// import React, { useEffect, useState, useRef } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { uploadFiles as uploadFilesApi, generateTemplate, refine, downloadUrlFor } from "../api";
// import "./ChatPage.css";

// export default function ChatPage() {
//   const { token, email } = useAuth();
//   const [files, setFiles] = useState([]); // array of File
//   const [uploadResult, setUploadResult] = useState(null); // { job_id, upload_id, filenames[], num_chunks }
//   const [question, setQuestion] = useState("");
//   const [templateResult, setTemplateResult] = useState(null);
//   const [instruction, setInstruction] = useState("");
//   const [refineResult, setRefineResult] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const dropRef = useRef(null);

//   useEffect(() => {
//     setMessages([{ from: "system", text: "Upload files and ask a question to generate a template." }]);
//   }, []);

//   // Drag & Drop handlers
//   useEffect(() => {
//     const el = dropRef.current;
//     if (!el) return;
//     const onDragOver = (e) => {
//       e.preventDefault();
//       el.classList.add("drag-over");
//     };
//     const onDragLeave = (e) => {
//       e.preventDefault();
//       el.classList.remove("drag-over");
//     };
//     const onDrop = (e) => {
//       e.preventDefault();
//       el.classList.remove("drag-over");
//       const dropped = Array.from(e.dataTransfer.files || []);
//       if (dropped.length) {
//         setFiles((prev) => [...prev, ...dropped]);
//       }
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

//   async function handleUpload() {
//     if (!files.length) return setError("Select one or more files first.");
//     setError(null);
//     setLoading(true);
//     try {
//       // uploadFilesApi should accept FormData with files[] and token
//       const form = new FormData();
//       files.forEach((f) => form.append("files", f, f.name));
//       const res = await uploadFilesApi(form, token); // expects { job_id, upload_id, filenames, num_chunks }
//       setUploadResult(res);
//       setMessages((m) => [...m, { from: "system", text: `Uploaded ${res.filenames?.length || files.length} files.` }]);
//     } catch (err) {
//       console.error(err);
//       setError((err && err.message) || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleGenerate() {
//     if (!uploadResult) return setError("Upload files first.");
//     if (!question || question.trim().length < 3) return setError("Enter a short question.");
//     setLoading(true);
//     setError(null);
//     try {
//       const payload = { job_id: uploadResult.job_id, question, top_k: 5, template: selectedTemplate };
//       const res = await generateTemplate(payload, token);
//       setTemplateResult(res);
//       setMessages((m) => [...m, { from: "assistant", text: "Generated initial template." }]);
//     } catch (err) {
//       console.error(err);
//       setError((err && err.message) || "Generate failed");
//     } finally {
//       setLoading(false);
//     }
//   }

  // async function handleRefine() {
  //   if (!uploadResult) return setError("Upload files first.");
  //   if (!instruction || instruction.trim().length < 3) return setError("Enter a refinement instruction.");
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const res = await refine({ job_id: uploadResult.job_id, instruction }, token);
  //     setRefineResult(res);
  //     setMessages((m) => [...m, { from: "assistant", text: "Refinement applied." }]);
  //   } catch (err) {
  //     console.error(err);
  //     setError((err && err.message) || "Refine failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

//   function handleStartWithAI() {
//     // quick shortcut: if upload exists and a template selected, open generate flow
//     if (!uploadResult) return setError("Upload files first.");
//     setQuestion(selectedTemplate ? `Create a ${selectedTemplate} template` : "Create a custom template");
//     handleGenerate();
//   }

//   function clearAll() {
//     setFiles([]);
//     setUploadResult(null);
//     setTemplateResult(null);
//     setRefineResult(null);
//     setMessages([{ from: "system", text: "Upload files and ask a question to generate a template." }]);
//   }

//   return (
//     <div className="app-shell">
//       <aside className="sidebar">
//         <div className="brand">AI Productivity</div>
//         <nav>
//           <ul>
//             <li className="active">Dashboard</li>
//             <li>Projects</li>
//             <li>Templates</li>
//             <li>History</li>
//             <li>Settings</li>
//           </ul>
//         </nav>
//       </aside>

//       <main className="main">
//         <header className="main-header">
//           <h1>Welcome back, {email?.split?.("@")?.[0] || "User"}!</h1>
//           <p className="muted">Transform your documents with AI-powered productivity tools</p>
//         </header>

//         <section className="upload-area">
//           <div className="upload-inner">
//             <div
//               className="drop-zone"
//               ref={dropRef}
//               onClick={() => document.getElementById("file-input").click()}
//             >
//               <div className="cloud-icon">☁️</div>
//               <h3>Drag & drop your files here</h3>
//               <p className="muted">or click to browse from your device</p>

//               <div className="file-types">
//                 <span className="type">PDF</span>
//                 <span className="type">Excel</span>
//                 <span className="type">PPT</span>
//                 <span className="type">Images</span>
//               </div>

//               <button className="btn-choose" type="button">Choose Files</button>
//               <input
//                 id="file-input"
//                 type="file"
//                 multiple
//                 accept=".pdf,.docx,.pptx,.ppt,.xlsx,.xls,.csv,image/*,.txt"
//                 onChange={onFileInputChange}
//                 style={{ display: "none" }}
//               />
//             </div>

//             <div className="upload-right">
//               <div className="files-list card">
//                 <h4>Uploaded Files</h4>
//                 {files.length === 0 ? (
//                   <div className="muted">No files selected yet</div>
//                 ) : (
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
//                   <button className="primary" onClick={handleUpload} disabled={loading || !files.length}>
//                     {loading ? "Uploading..." : "Upload"}
//                   </button>
//                   <button className="secondary" onClick={clearAll}>Clear</button>
//                 </div>

//                 {uploadResult && (
//                   <div className="upload-meta">
//                     <div><strong>Job:</strong> {uploadResult.job_id}</div>
//                     <div><strong>Upload ID:</strong> {uploadResult.upload_id}</div>
//                     <div><strong>Files:</strong> {uploadResult.filenames?.join(", ")}</div>
//                   </div>
//                 )}
//               </div>

//               <div className="choose-template card">
//                 <h4>Choose a Template</h4>
//                 <div className="template-grid">
//                   {["Proposal", "Report", "Pitch Deck", "Custom Template"].map((t) => (
//                     <div
//                       key={t}
//                       className={`template-card ${selectedTemplate === t ? "selected" : ""}`}
//                       onClick={() => setSelectedTemplate(t)}
//                     >
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

//                 <div className="start-row">
//                   <button className="primary" onClick={handleStartWithAI} disabled={!uploadResult}>
//                     Start with AI →
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="work-area">
//           <div className="left-col">
//             <div className="card">
//               <h3>Generate Template (Initial)</h3>
//               <textarea value={question} onChange={(e) => setQuestion(e.target.value)}
//                 placeholder='Ask something like "Create a consulting template for annual financial review"' />
//               <div className="btn-row">
//                 <button className="primary" onClick={handleGenerate} disabled={loading || !uploadResult}>
//                   {loading ? "Generating..." : "Generate Template"}
//                 </button>
//               </div>

//               {templateResult && templateResult.template && (
//                 <div className="result card result-block">
//                   <h4>Template Sections</h4>
//                   <ul className="section-list">
//                     {templateResult.template.sections.map((s, i) => <li key={i}>{s}</li>)}
//                   </ul>

//                   <h4>Sample Content</h4>
//                   {Object.entries(templateResult.template.content).map(([k, bullets]) => (
//                     <div key={k} className="section-sample">
//                       <strong>{k}</strong>
//                       <ul>
//                         {bullets.map((b, idx) => <li key={idx}><pre>{b}</pre></li>)}
//                       </ul>
//                     </div>
//                   ))}

//                   <div style={{ marginTop: 8 }}>
//                     <a className="download" href={downloadUrlFor(uploadResult.job_id)} target="_blank" rel="noreferrer">⤓ Download DOCX</a>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="card" style={{ marginTop: 12 }}>
//               <h3>Refine (Conversational)</h3>
//               <input value={instruction} onChange={(e) => setInstruction(e.target.value)}
//                 placeholder='E.g., "Add a Risk Analysis section before Recommendations"' />
//               <div className="btn-row">
//                 <button className="primary" onClick={handleRefine} disabled={loading || !uploadResult}>
//                   {loading ? "Applying..." : "Apply Refinement"}
//                 </button>
//               </div>

//               {refineResult && refineResult.template && (
//                 <div style={{ marginTop: 12 }}>
//                   <h4>Refined Template Sections</h4>
//                   <ul>
//                     {refineResult.template.sections.map((s, i) => <li key={i}>{s}</li>)}
//                   </ul>
//                   <div style={{ marginTop: 8 }}>
//                     <a className="download" href={downloadUrlFor(uploadResult.job_id)} target="_blank" rel="noreferrer">⤓ Download Refined DOCX</a>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <aside className="right-col">
//             <div className="card user-card">
//               <h4>User</h4>
//               <div className="user-email">{email}</div>
//             </div>

//             <div className="card convo-card">
//               <h4>Conversation</h4>
//               <div className="messages">
//                 {messages.map((m, i) => (
//                   <div key={i} className={`message ${m.from}`}>
//                     <div className="message-from">{m.from}</div>
//                     <div className="message-text">{m.text}</div>
//                   </div>
//                 ))}
//               </div>
//               {error && <div className="error">{error}</div>}
//             </div>
//           </aside>
//         </section>
//       </main>
//     </div>
//   );
// }

// src/pages/ChatPage.jsx

// import TemplatePreview from "../components/TemplatePreview";
// import { downloadJSON, downloadDocx, downloadPptx } from "../utils/exporters";
// import TemplatePreview from "../components/TemplatePreview";
// import React, { useEffect, useState, useRef } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { generateFromFiles } from "../api";
// import "./ChatPage.css";

// export default function ChatPage() {
//   const { token, email } = useAuth();
//   const [files, setFiles] = useState([]); // array of File
//   const [question, setQuestion] = useState("");
//   const [templateResult, setTemplateResult] = useState(null); // parsed JSON from LLM
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
//       if (!res.ok) {
//         // show raw output if available for debugging
//         setError(res.error || res.raw || `Server returned status ${res.status}`);
//         setTemplateResult(res.parsed || { raw: res.raw || res.rawText || "" });
//         setMessages((m) => [...m, { from: "assistant", text: "LLM returned non-JSON or error. See raw output." }]);
//       } else {
//         setTemplateResult(res.parsed || res);
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
//     setMessages([{ from: "system", text: "Select files and ask a question to generate a template." }]);
//     setError(null);
//     setQuestion("");
//   }

//   return (
//     <div className="app-shell">
//       <aside className="sidebar">
//         <div className="brand">AI Productivity</div>
//         <nav>
//           <ul>
//             <li className="active">Dashboard</li>
//             <li>Projects</li>
//             <li>Templates</li>
//             <li>History</li>
//             <li>Settings</li>
//           </ul>
//         </nav>
//       </aside>

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
//               <input id="file-input" type="file" multiple accept=".pdf,.docx,.pptx,.ppt,.xlsx,.xls,.csv,image/*,.txt"
//                      onChange={onFileInputChange} style={{ display: "none" }} />
//             </div>

//             <div className="upload-right">
//               <div className="files-list card">
//                 <h4>Selected Files</h4>
//                 {files.length === 0 ? (
//                   <div className="muted">No files selected yet</div>
//                 ) : (
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

//                 <div className="controls" style={{ marginTop: 12 }}>
//                   <button className="primary" onClick={handleGenerate} disabled={loading || !files.length}>
//                     {loading ? "Generating..." : "Generate Template"}
//                   </button>
//                   <button className="secondary" onClick={clearAll} style={{ marginLeft: 8 }}>Clear</button>
//                 </div>
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

//               {error && <div style={{ marginTop: 12, color: "crimson" }}>{error}</div>}

//               {templateResult && templateResult.parsed && (
//                 <div className="result card result-block" style={{ marginTop: 12 }}>
//                   <TemplatePreview parsed={templateResult.parsed} />
//                 </div>
//               )}

//               {templateResult && !templateResult.parsed && templateResult.raw && (
//                 <div className="result card" style={{ marginTop: 12 }}>
//                   <h4>LLM raw output</h4>
//                   <pre style={{ whiteSpace: "pre-wrap" }}>{templateResult.raw}</pre>
//                 </div>
//               )}

//               {templateResult && templateResult.template && (
//                 <div className="result card result-block" style={{ marginTop: 12 }}>
//                   {/* fallback when backend returned parsed directly at top-level */}
//                   <TemplatePreview parsed={templateResult} />
//                 </div>
//               )}
//             </div>
//           </div>

//           <aside className="right-col">
//             <div className="card user-card"><h4>User</h4><div className="user-email">{email}</div></div>
//             <div className="card convo-card">
//               <h4>Conversation</h4>
//               <div className="messages">
//                 {messages.map((m, i) => (<div key={i} className={`message ${m.from}`}><div className="message-from">{m.from}</div><div className="message-text">{m.text}</div></div>))}
//               </div>
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
import { downloadJSON, downloadDocx, downloadPptx } from "../utils/exporters";
import "./ChatPage.css";


export default function ChatPage() {
  const { token, email } = useAuth();
  const [refineResult, setRefineResult] = useState(null);
  const [files, setFiles] = useState([]); // File[]
  const [question, setQuestion] = useState("");
  const [templateResult, setTemplateResult] = useState(null); // parsed JSON returned by backend
  const [filesSummary, setFilesSummary] = useState([]); // files_payload_summary from backend
  const [rawOutput, setRawOutput] = useState(null); // raw llm if needed
=======
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import { uploadFiles as uploadFilesApi, generateTemplate, refine, downloadUrlFor } from "../api";
import "./ChatPage.css";

export default function ChatPage() {
  const { token, email } = useAuth();
  const [files, setFiles] = useState([]); // array of File
  const [uploadResult, setUploadResult] = useState(null); // { job_id, upload_id, filenames[], num_chunks }
  const [question, setQuestion] = useState("");
  const [templateResult, setTemplateResult] = useState(null);
  const [instruction, setInstruction] = useState("");
  const [refineResult, setRefineResult] = useState(null);
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const dropRef = useRef(null);
<<<<<<< HEAD
  const [backendAnswers, setBackendAnswers] = useState([]);
  const [instruction, setInstruction] = useState("");
const [uploadResult, setUploadResult] = useState(null);
  useEffect(() => {
    setMessages([{ from: "system", text: "Select files and ask a question to generate a template." }]);
  }, []);

  // drag & drop handlers
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    const onDragOver = (e) => { e.preventDefault(); el.classList.add("drag-over"); };
    const onDragLeave = (e) => { e.preventDefault(); el.classList.remove("drag-over"); };
=======

  useEffect(() => {
    setMessages([{ from: "system", text: "Upload files and ask a question to generate a template." }]);
  }, []);

  // Drag & Drop handlers
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    const onDragOver = (e) => {
      e.preventDefault();
      el.classList.add("drag-over");
    };
    const onDragLeave = (e) => {
      e.preventDefault();
      el.classList.remove("drag-over");
    };
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
    const onDrop = (e) => {
      e.preventDefault();
      el.classList.remove("drag-over");
      const dropped = Array.from(e.dataTransfer.files || []);
<<<<<<< HEAD
      if (dropped.length) setFiles((prev) => [...prev, ...dropped]);
=======
      if (dropped.length) {
        setFiles((prev) => [...prev, ...dropped]);
      }
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
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
<<<<<<< HEAD
  function removeFile(index) {
    setFiles((p) => p.filter((_, i) => i !== index));
  }
// inside ChatPage.jsx - replace the handleGenerate function
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
    return;
  }
  setLoading(true);
  try {
    const res = await generateFromFiles({ files, question }, token);

    if (!res || res.ok === false) {
      // If res.body exists (structured error from backend), pretty-print it.
      if (res.body) {
        // show status + pretty JSON
        const errMsg = `HTTP ${res.status}: ${JSON.stringify(res.body, null, 2)}`;
        setError(errMsg);
      } else {
        setError(res?.error || "Generate failed or LLM returned invalid response.");
      }
      setRawOutput(res?.raw || null);
      setTemplateResult(res?.parsed || null);
      return;
    }

    // success path
    // If backend returned answers array, prefer that
    if (Array.isArray(res.answers) && res.answers.length > 0) {
      setBackendAnswers(res.answers);

      const first = String(res.answers[0] || "");
      const fencedRegex = /```(?:json)?\s*([\s\S]*?)```/i;
      const match = first.match(fencedRegex);

      if (match && match[1]) {
        const candidate = match[1].trim();
        try {
          const parsed = JSON.parse(candidate);
          setTemplateResult(parsed);
          setRawOutput(null);
        } catch (err) {
          setRawOutput(first);
          setTemplateResult(null);
        }
      } else {
        try {
          const parsedWhole = JSON.parse(first);
          setTemplateResult(parsedWhole);
          setRawOutput(null);
        } catch (err) {
          setRawOutput(first);
          setTemplateResult(null);
        }
      }
      

      if (res.files_payload_summary) setFilesSummary(res.files_payload_summary);
      setMessages((m) => [...m, { from: "assistant", text: "Received answers from backend." }]);
      return;
    }

    const parsed = res.parsed || res;
    setTemplateResult(parsed);
    setRawOutput(res.raw || null);
    setFilesSummary(res.files_payload_summary || []);
    setMessages((m) => [...m, { from: "assistant", text: "Generated initial template." }]);
  } catch (err) {
    console.error("Generate error:", err);
    // ensure error is a string
    setError(err?.message ? err.message : JSON.stringify(err, null, 2));
  } finally {
    setLoading(false);
  }
}

  // async function handleGenerate() {
  //   setError(null);
  //   if (!files || files.length === 0) {
  //     setError("Select one or more files first.");
  //     return;
  //   }
  //   if (!question || question.trim().length < 3) {
  //     setError("Enter a short question.");
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const res = await generateFromFiles({ files, question }, token);
  //     // backend returns: { ok: true, parsed: {...}, raw: "...", files_payload_summary: [...] }
  //     if (!res || res.ok === false) {
  //       setError(res?.error || "Generate failed or LLM returned invalid response.");
  //       setRawOutput(res?.raw || null);
  //       setTemplateResult(res?.parsed || null);
  //     } else {
  //       const parsed = res.parsed || res;
  //       // Ensure structure: { title, sections: [{id?, title, body}] }
  //       const normalized = normalizeParsed(parsed);
  //       setTemplateResult(normalized);
  //       setRawOutput(res.raw || null);
  //       setFilesSummary(res.files_payload_summary || []);
  //       setMessages((m) => [...m, { from: "assistant", text: "Generated initial template." }]);
  //     }
  //   } catch (err) {
  //     console.error("Generate error:", err);
  //     setError(err.message || "Generate failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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
    setMessages([{ from: "system", text: "Select files and ask a question to generate a template." }]);
    setError(null);
    setQuestion("");
    setSelectedTemplate(null);
  }

  // called when TemplatePreview sends edits
  function handleTemplateEdit(edited) {
    setTemplateResult(edited);
  }
    async function handleRefine() {
=======

  function removeFile(index) {
    setFiles((p) => p.filter((_, i) => i !== index));
  }

  async function handleUpload() {
    if (!files.length) return setError("Select one or more files first.");
    setError(null);
    setLoading(true);
    try {
      // uploadFilesApi should accept FormData with files[] and token
      const form = new FormData();
      files.forEach((f) => form.append("files", f, f.name));
      const res = await uploadFilesApi(form, token); // expects { job_id, upload_id, filenames, num_chunks }
      setUploadResult(res);
      setMessages((m) => [...m, { from: "system", text: `Uploaded ${res.filenames?.length || files.length} files.` }]);
    } catch (err) {
      console.error(err);
      setError((err && err.message) || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerate() {
    if (!uploadResult) return setError("Upload files first.");
    if (!question || question.trim().length < 3) return setError("Enter a short question.");
    setLoading(true);
    setError(null);
    try {
      const payload = { job_id: uploadResult.job_id, question, top_k: 5, template: selectedTemplate };
      const res = await generateTemplate(payload, token);
      setTemplateResult(res);
      setMessages((m) => [...m, { from: "assistant", text: "Generated initial template." }]);
    } catch (err) {
      console.error(err);
      setError((err && err.message) || "Generate failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleRefine() {
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
    if (!uploadResult) return setError("Upload files first.");
    if (!instruction || instruction.trim().length < 3) return setError("Enter a refinement instruction.");
    setLoading(true);
    setError(null);
    try {
      const res = await refine({ job_id: uploadResult.job_id, instruction }, token);
      setRefineResult(res);
      setMessages((m) => [...m, { from: "assistant", text: "Refinement applied." }]);
    } catch (err) {
      console.error(err);
      setError((err && err.message) || "Refine failed");
    } finally {
      setLoading(false);
    }
  }

<<<<<<< HEAD
  // helper to normalize incoming parsed JSON from backend
  function normalizeParsed(parsed) {
    if (!parsed) return null;
    // if parsed already has title & sections, keep it; else attempt to map
    const out = { title: parsed.title || parsed.name || "Document", sections: [] };
    if (Array.isArray(parsed.sections) && parsed.sections.length) {
      out.sections = parsed.sections.map((s, i) => ({
        id: s.id ?? `${i}-${Date.now()}`,
        title: s.title ?? s.heading ?? `Section ${i + 1}`,
        body: s.body ?? s.content ?? (typeof s === "string" ? s : ""),
      }));
    } else if (Array.isArray(parsed.items) && parsed.items.length) {
      out.sections = parsed.items.map((s, i) => ({
        id: `${i}-${Date.now()}`,
        title: s.title ?? `Section ${i + 1}`,
        body: s.text ?? s.content ?? "",
      }));
    } else if (parsed.template && Array.isArray(parsed.template.sections)) {
      out.sections = parsed.template.sections.map((s, i) => ({
        id: s.id ?? `${i}-${Date.now()}`,
        title: s.title ?? `Section ${i + 1}`,
        body: s.body ?? s.content ?? "",
      }));
    } else {
      // fallback: take raw text if present
      const rawBody = parsed.text || parsed.raw || parsed.content || JSON.stringify(parsed);
      out.sections = [{ id: `0-${Date.now()}`, title: "Content", body: typeof rawBody === "string" ? rawBody : JSON.stringify(rawBody) }];
    }
    return out;
  }

  const truncatedFiles = (filesSummary || []).filter((f) => f.truncated);

  return (
    <div className="app-shell">
      <aside className="sidebar"> ... </aside>
=======
  function handleStartWithAI() {
    // quick shortcut: if upload exists and a template selected, open generate flow
    if (!uploadResult) return setError("Upload files first.");
    setQuestion(selectedTemplate ? `Create a ${selectedTemplate} template` : "Create a custom template");
    handleGenerate();
  }

  function clearAll() {
    setFiles([]);
    setUploadResult(null);
    setTemplateResult(null);
    setRefineResult(null);
    setMessages([{ from: "system", text: "Upload files and ask a question to generate a template." }]);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">AI Productivity</div>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Projects</li>
            <li>Templates</li>
            <li>History</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55

      <main className="main">
        <header className="main-header">
          <h1>Welcome back, {email?.split?.("@")?.[0] || "User"}!</h1>
          <p className="muted">Transform your documents with AI-powered productivity tools</p>
        </header>

        <section className="upload-area">
          <div className="upload-inner">
<<<<<<< HEAD
            <div className="drop-zone" ref={dropRef} onClick={() => document.getElementById("file-input").click()}>
              <div className="cloud-icon">☁️</div>
              <h3>Drag & drop your files here</h3>
              <p className="muted">or click to browse from your device</p>
              <div className="file-types">
                <span className="type">PDF</span><span className="type">Excel</span><span className="type">PPT</span><span className="type">Images</span>
              </div>
              <button className="btn-choose" type="button">Choose Files</button>
              <input id="file-input" type="file" multiple accept=".pdf,.docx,.pptx,.ppt,.xlsx,.xls,.csv,image/*,.txt" onChange={onFileInputChange} style={{ display: "none" }} />
=======
            <div
              className="drop-zone"
              ref={dropRef}
              onClick={() => document.getElementById("file-input").click()}
            >
              <div className="cloud-icon">☁️</div>
              <h3>Drag & drop your files here</h3>
              <p className="muted">or click to browse from your device</p>

              <div className="file-types">
                <span className="type">PDF</span>
                <span className="type">Excel</span>
                <span className="type">PPT</span>
                <span className="type">Images</span>
              </div>

              <button className="btn-choose" type="button">Choose Files</button>
              <input
                id="file-input"
                type="file"
                multiple
                accept=".pdf,.docx,.pptx,.ppt,.xlsx,.xls,.csv,image/*,.txt"
                onChange={onFileInputChange}
                style={{ display: "none" }}
              />
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
            </div>

            <div className="upload-right">
              <div className="files-list card">
<<<<<<< HEAD
                <h4>Selected Files</h4>
                {files.length === 0 ? <div className="muted">No files selected yet</div> : (
=======
                <h4>Uploaded Files</h4>
                {files.length === 0 ? (
                  <div className="muted">No files selected yet</div>
                ) : (
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
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
<<<<<<< HEAD
                <div className="controls">
                  <button className="primary" onClick={handleGenerate} disabled={loading || !files.length}>
                    {loading ? "Generating..." : "Generate Template"}
=======

                <div className="controls">
                  <button className="primary" onClick={handleUpload} disabled={loading || !files.length}>
                    {loading ? "Uploading..." : "Upload"}
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
                  </button>
                  <button className="secondary" onClick={clearAll}>Clear</button>
                </div>

<<<<<<< HEAD
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
=======
                {uploadResult && (
                  <div className="upload-meta">
                    <div><strong>Job:</strong> {uploadResult.job_id}</div>
                    <div><strong>Upload ID:</strong> {uploadResult.upload_id}</div>
                    <div><strong>Files:</strong> {uploadResult.filenames?.join(", ")}</div>
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
                  </div>
                )}
              </div>

<<<<<<< HEAD
              <div className="choose-template card" style={{ marginTop: 12 }}>
                <h4>Choose a Template</h4>
                <div className="template-grid">
                  {["Proposal", "Report", "Pitch Deck", "Custom Template"].map((t) => (
                    <div key={t} className={`template-card ${selectedTemplate === t ? "selected" : ""}`} onClick={() => setSelectedTemplate(t)}>
=======
              <div className="choose-template card">
                <h4>Choose a Template</h4>
                <div className="template-grid">
                  {["Proposal", "Report", "Pitch Deck", "Custom Template"].map((t) => (
                    <div
                      key={t}
                      className={`template-card ${selectedTemplate === t ? "selected" : ""}`}
                      onClick={() => setSelectedTemplate(t)}
                    >
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
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
<<<<<<< HEAD
                <div className="start-row" style={{ marginTop: 8 }}>
                  <button className="primary" onClick={handleStartWithAI} disabled={!files.length}>Start with AI →</button>
=======

                <div className="start-row">
                  <button className="primary" onClick={handleStartWithAI} disabled={!uploadResult}>
                    Start with AI →
                  </button>
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="work-area">
          <div className="left-col">
            <div className="card">
              <h3>Generate Template (Initial)</h3>
<<<<<<< HEAD
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='Ask something like "Create a consulting template for annual financial review"' />

              <div className="btn-row" style={{ marginTop: 8 }}>
                <button className="primary" onClick={handleGenerate} disabled={loading || !files.length}>
=======
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)}
                placeholder='Ask something like "Create a consulting template for annual financial review"' />
              <div className="btn-row">
                <button className="primary" onClick={handleGenerate} disabled={loading || !uploadResult}>
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
                  {loading ? "Generating..." : "Generate Template"}
                </button>
              </div>

<<<<<<< HEAD
              {error && <div className="error" style={{ marginTop: 8 }}>{error}</div>}

              {templateResult?.meta?.notes && (
                <div className="warning" style={{ marginTop: 12, padding: 10, background: "#fff6e6", borderLeft: "4px solid #f5a623" }}>
                  <strong>Note:</strong> {templateResult.meta.notes}
                </div>
              )}

              {truncatedFiles.length > 0 && !templateResult?.meta?.notes && (
                <div className="warning" style={{ marginTop: 12, padding: 10, background: "#fff6e6", borderLeft: "4px solid #f5a623" }}>
                  <strong>Note:</strong> Some files were truncated when inlined into the prompt; details beyond the preview may be missing.
                </div>
              )}

              {templateResult && (
                <div style={{ marginTop: 12 }}>
                  <TemplatePreview
                    parsed={templateResult}
                    onChange={handleTemplateEdit}
                  />

                  <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                    <button className="primary" onClick={() => downloadJSON(templateResult, "template.json")}>Download JSON</button>

                    <button
                      className="secondary"
                      onClick={async () => {
                        try {
                          await downloadDocx(templateResult, "template.docx");
                        } catch (err) {
                          console.error("DOCX export failed", err);
                          alert("DOCX export failed. Make sure the docx library is installed.");
                        }
                      }}
                    >
                      Download DOCX
                    </button>

                    <button className="secondary" onClick={() => downloadPptx(templateResult, "template.pptx")}>Download PPTX</button>

                    {/* Optionally: server-side render */}
                    <button
                      className="secondary"
                      onClick={async () => {
                        if (!templateResult) return;
                        try {
                          // Your backend route that takes template JSON and returns a download URL
                          const resp = await downloadUrlFor(templateResult, token); // implement server-side endpoint /api/download
                          if (resp?.url) window.open(resp.url, "_blank");
                        } catch (err) {
                          console.error("server download failed", err);
                          alert("Server-side download failed.");
                        }
                      }}
                    >
                      Server Generate & Download
                    </button>
                  </div>
                </div>
              )}

              {(!templateResult || !templateResult.template) && rawOutput && (
                <div className="result card" style={{ marginTop: 12 }}>
                  <h4>LLM raw output</h4>
                  <pre style={{ whiteSpace: "pre-wrap" }}>{rawOutput}</pre>
                </div>
              )}
            </div>

        <div className="card" style={{ marginTop: 12 }}>
          <h3>Refine (Conversational)</h3>
          <input value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder='E.g., "Add a Risk Analysis section before Recommendations"' />
          <div style={{ marginTop: 8 }}>
            <button className="primary" onClick={handleRefine} disabled={loading || !uploadResult}>
              {loading ? "Applying..." : "Apply Refinement"}
            </button>
          </div>

          {refineResult && refineResult.template && (
            <div style={{ marginTop: 12 }}>
              <h4>Refined Template Sections</h4>
              <ul>
                {refineResult.template.sections.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
              <div style={{ marginTop: 8 }}>
                <a href={downloadUrlFor(uploadResult.job_id)} target="_blank" rel="noreferrer" className="download">⤓ Download Refined DOCX</a>
              </div>
            </div>
          )}
        </div>
      </div>


          <aside className="right-col">
            <div className="card user-card"><h4>User</h4><div className="user-email">{email}</div></div>
            <div className="card convo-card">
              <h4>Conversation</h4>
              <div className="messages">{messages.map((m,i)=>(<div key={i} className={`message ${m.from}`}><div className="message-from">{m.from}</div><div className="message-text">{m.text}</div></div>))}</div>
=======
              {templateResult && templateResult.template && (
                <div className="result card result-block">
                  <h4>Template Sections</h4>
                  <ul className="section-list">
                    {templateResult.template.sections.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>

                  <h4>Sample Content</h4>
                  {Object.entries(templateResult.template.content).map(([k, bullets]) => (
                    <div key={k} className="section-sample">
                      <strong>{k}</strong>
                      <ul>
                        {bullets.map((b, idx) => <li key={idx}><pre>{b}</pre></li>)}
                      </ul>
                    </div>
                  ))}

                  <div style={{ marginTop: 8 }}>
                    <a className="download" href={downloadUrlFor(uploadResult.job_id)} target="_blank" rel="noreferrer">⤓ Download DOCX</a>
                  </div>
                </div>
              )}
            </div>

            <div className="card" style={{ marginTop: 12 }}>
              <h3>Refine (Conversational)</h3>
              <input value={instruction} onChange={(e) => setInstruction(e.target.value)}
                placeholder='E.g., "Add a Risk Analysis section before Recommendations"' />
              <div className="btn-row">
                <button className="primary" onClick={handleRefine} disabled={loading || !uploadResult}>
                  {loading ? "Applying..." : "Apply Refinement"}
                </button>
              </div>

              {refineResult && refineResult.template && (
                <div style={{ marginTop: 12 }}>
                  <h4>Refined Template Sections</h4>
                  <ul>
                    {refineResult.template.sections.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                  <div style={{ marginTop: 8 }}>
                    <a className="download" href={downloadUrlFor(uploadResult.job_id)} target="_blank" rel="noreferrer">⤓ Download Refined DOCX</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="right-col">
            <div className="card user-card">
              <h4>User</h4>
              <div className="user-email">{email}</div>
            </div>

            <div className="card convo-card">
              <h4>Conversation</h4>
              <div className="messages">
                {messages.map((m, i) => (
                  <div key={i} className={`message ${m.from}`}>
                    <div className="message-from">{m.from}</div>
                    <div className="message-text">{m.text}</div>
                  </div>
                ))}
              </div>
              {error && <div className="error">{error}</div>}
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
