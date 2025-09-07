// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// export default function Home() {
//   const { user } = useAuth();
//   return (
//     <div className="card">
//       <h2>Welcome to Template Engine Demo</h2>
//       <p>
//         This is a minimal demo. Use the navigation above to signup/login and then go to the Chat page.
//       </p>

//       {user ? (
//         <p>
//           You are signed in as <strong>{user.name}</strong> ({user.email}). Go to <Link to="/chat">Chat</Link>.
//         </p>
//       ) : (
//         <p>
//           New here? <Link to="/signup">Signup</Link>. Already have an account? <Link to="/login">Login</Link>.
//         </p>
//       )}
//     </div>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="page">
      {/* In-page CSS only */}
      <style>{`
:root{
  --bg: #ffffff;
  --text: #0f172a;
  --muted: #475569;
  --line: #e2e8f0;
  --soft: #f8fafc;
  --brand: #0f172a;
  --brand-600: #1f2937;
  --radius: 12px;
  --shadow: 0 1px 2px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.06);
}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,Helvetica Neue,Arial;color:var(--text);background:var(--bg)}
.page{min-height:100%}

/* Header */
.site-header{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.85);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.nav{max-width:1120px;margin:0 auto;padding:0 20px;height:64px;display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:12px}
.logo{width:32px;height:32px;border-radius:8px;background:var(--brand);color:#fff;display:grid;place-items:center;font-weight:700}
.brand-name{font-weight:600;letter-spacing:.1px}
.nav-links{display:none;list-style:none;gap:24px;padding:0;margin:0}
.nav-links a{color:var(--text);text-decoration:none;opacity:.9}
.nav-links a:hover{opacity:1}
.nav-ctas{display:flex;align-items:center;gap:10px}
.signed-in{color:var(--muted);font-size:14px}

/* Buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 16px;font-size:14px;font-weight:600;border-radius:8px;border:1px solid transparent;text-decoration:none;cursor:pointer;transition:background .15s,color .15s,border-color .15s}
.btn-primary{background:var(--brand);color:#fff}
.btn-primary:hover{background:var(--brand-600)}
.btn-outline{background:#fff;color:var(--text);border-color:var(--line)}
.btn-outline:hover{background:#f9fafb}
.btn-ghost{background:transparent;color:var(--text)}
.btn-ghost:hover{background:#f1f5f9}

/* Containers and sections */
.container{max-width:1120px;margin:0 auto;padding:0 20px}
.section{padding:56px 0}
.section-title{font-size:24px;font-weight:800;text-align:center;margin:0}

/* Hero */
.hero{background:linear-gradient(to bottom,#f8fafc 0%,#ffffff 70%)}
.hero-grid{display:grid;grid-template-columns:1fr;gap:40px;padding:64px 0 88px}
.pill{display:inline-flex;align-items:center;gap:8px;padding:6px 10px;font-size:12px;border-radius:999px;background:#f1f5f9;color:#334155}
.hero-title{margin:16px 0 8px;font-size:clamp(28px,3.8vw,48px);font-weight:800;line-height:1.1;letter-spacing:-.02em}
.hero-sub{color:var(--muted);max-width:640px}
.hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}
.hero-media{display:none}
.media-card{width:100%;background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);padding:24px;display:grid;place-items:center}
.media-placeholder{width:100%;height:260px;border-radius:12px;background:linear-gradient(135deg,#e2e8f0,#f8fafc 60%,#ffffff)}

/* Grids and cards */
.grid-4{display:grid;grid-template-columns:1fr;gap:16px;margin-top:28px}
.grid-2{display:grid;grid-template-columns:1fr;gap:16px;margin-top:28px}
.card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:18px;box-shadow:var(--shadow)}
.icon{width:36px;height:36px;border-radius:8px;background:var(--brand);color:#fff;display:grid;place-items:center;font-size:12px;font-weight:700}
.card-title{margin:12px 0 4px;font-weight:700}
.card-sub{margin:0;color:var(--muted);font-size:14px}

/* Dropzone */
.dropzone{border:1px dashed #cbd5e1;border-radius:16px;background:#f8fafc;padding:24px;margin-top:16px}
.dropzone-head{text-align:center}
.drop-icon{width:48px;height:48px;background:#fff;border:1px solid var(--line);border-radius:12px;display:grid;place-items:center;margin:0 auto;box-shadow:var(--shadow)}
.dz-title{margin:10px 0 4px;color:var(--muted);font-size:14px}
.dz-sub{margin:0;color:#94a3b8;font-size:12px}
.file-grid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:18px}
.file{background:#fff;border:1px solid var(--line);border-radius:10px;padding:12px;display:flex;align-items:center;justify-content:space-between}
.file-left{display:flex;align-items:center;gap:12px}
.file-badge{width:32px;height:32px;border-radius:6px;background:var(--brand);color:#fff;display:grid;place-items:center;font-size:12px}
.file-name{margin:0;font-size:14px;font-weight:600}
.progress{width:200px;height:6px;background:#eef2f7;border-radius:999px;margin-top:6px;overflow:hidden}
.progress-bar{width:50%;height:100%;background:#10b981}

/* Chat card */
.chat-card{border:1px solid var(--line);background:#fff;border-radius:16px;box-shadow:var(--shadow);padding:16px;margin-top:16px}
.chat{background:#f8fafc;border:1px solid var(--line);border-radius:12px;padding:12px}
.chat-header{font-size:12px;color:var(--muted)}
.bubble{max-width:680px;padding:10px 12px;border-radius:10px;margin-top:10px;font-size:14px;border:1px solid var(--line);box-shadow:var(--shadow);background:#fff}
.bubble.user{margin-left:auto;background:var(--brand);color:#fff;border-color:var(--brand)}
.chat-input{width:100%;margin-top:10px;border:1px solid var(--line);border-radius:8px;padding:10px 12px;font-size:14px;outline:none}
.chat-input:focus{box-shadow:0 0 0 3px #e2e8f0}

/* Footer CTA */
.section-cta{text-align:center;margin-top:28px}
.cta-row{display:flex;align-items:center;justify-content:center;gap:12px}

/* Responsive */
@media (min-width: 768px){
  .nav-links{display:flex}
  .hero-grid{grid-template-columns:1.1fr .9fr}
  .hero-media{display:block}
  .grid-4{grid-template-columns:repeat(4,1fr)}
  .grid-2{grid-template-columns:repeat(2,1fr)}
  .file-grid{grid-template-columns:repeat(3,1fr)}
}
      `}</style>

      {/* Header */}
      <header className="site-header" role="banner">
        <nav className="nav" aria-label="Primary">
          <div className="brand">
            <div className="logo">D</div>
            <span className="brand-name">Draftly</span>
          </div>

          <ul className="nav-links">
            <li><a href="#why">Why Draftly?</a></li>
            <li><a href="#consultant">Features</a></li>
            <li><a href="#processing">Processing</a></li>
            <li><a href="#refine">Refinement</a></li>
          </ul>

          <div className="nav-ctas">
            {user ? (
              <>
                <span className="signed-in">
                  Signed in as <strong>{user.name}</strong>
                </span>
                <Link to="/chat" className="btn btn-primary">Go to Chat</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">Sign in</Link>
                <Link to="/signup" className="btn btn-primary">Get Started</Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="main" role="main">
        {/* Hero */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="pill">Powered by Advanced AI Technology</span>
              <h1 className="hero-title">
                Draftly: AI‑Powered Template Generation Engine
              </h1>
              <p className="hero-sub">
                Craft consultant‑grade deliverables by structuring, populating, and refining documents from PDFs, PPTs, Excel, images, videos, and transcripts—with evidence‑backed outputs.
              </p>

              <div className="hero-actions">
                {user ? (
                  <Link to="/chat" className="btn btn-primary">Start New Project</Link>
                ) : (
                  <Link to="/signup" className="btn btn-primary">Start New Project</Link>
                )}
                <a href="#templates" className="btn btn-outline">Explore Templates</a>
              </div>
            </div>

            <div className="hero-media">
              <div className="media-card">
                <div className="media-placeholder" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section id="why" className="section">
          <div className="container">
            <h2 className="section-title">Why Choose Draftly?</h2>
            <div className="grid-4">
              <div className="card">
                <div className="icon">★</div>
                <h3 className="card-title">Multimodal Input</h3>
                <p className="card-sub">Upload PDFs, PPTs, Excel, images, videos, audio transcripts.</p>
              </div>
              <div className="card">
                <div className="icon">★</div>
                <h3 className="card-title">Real‑Time Adaptability</h3>
                <p className="card-sub">Templates evolve instantly via conversation.</p>
              </div>
              <div className="card">
                <div className="icon">★</div>
                <h3 className="card-title">Evidence‑Backed</h3>
                <p className="card-sub">Clear citations for every claim.</p>
              </div>
              <div className="card">
                <div className="icon">★</div>
                <h3 className="card-title">Customizable Outputs</h3>
                <p className="card-sub">Control tone, structure, and exports.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Consultant */}
        <section id="consultant" className="section">
          <div className="container">
            <h2 className="section-title">Your AI Consultant for Premium Outputs</h2>
            <div className="grid-2">
              <div className="card">
                <h3 className="card-title">Dynamic Template Engine</h3>
                <p className="card-sub">Adjust templates conversationally with instant preview.</p>
              </div>
              <div className="card">
                <h3 className="card-title">Multimodal Ingestion</h3>
                <p className="card-sub">Parse PDFs, images, videos, Excel, and PPT decks.</p>
              </div>
              <div className="card">
                <h3 className="card-title">Evidence‑Backed Outputs</h3>
                <p className="card-sub">Deliver source‑linked, traceable content.</p>
              </div>
              <div className="card">
                <h3 className="card-title">Scope Clarification</h3>
                <p className="card-sub">Proactively asks for missing info to ensure accuracy.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Multimodal Processing */}
        <section id="processing" className="section">
          <div className="container">
            <h2 className="section-title">Multimodal Content Processing</h2>

            <div className="dropzone">
              <div className="dropzone-head">
                <div className="drop-icon">⬆</div>
                <p className="dz-title">Drop files here or click to upload</p>
                <p className="dz-sub">Supports PDFs, PPTs, Excel, Images, Videos, Audio</p>
              </div>

              <div className="file-grid">
                {["Market_Analysis.pdf","Interview_Recording.mp4","Sales_Data.xlsx"].map((f) => (
                  <div key={f} className="file">
                    <div className="file-left">
                      <div className="file-badge">📄</div>
                      <div>
                        <p className="file-name">{f}</p>
                        <div className="progress"><div className="progress-bar" /></div>
                      </div>
                    </div>
                    <span className="file-meta">Uploading…</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Conversational Refinement */}
        <section id="refine" className="section">
          <div className="container">
            <h2 className="section-title">Conversational Template Refinement</h2>

            <div className="chat-card">
              <div className="chat">
                <div className="chat-header">Draftly AI Assistant</div>

                <div className="bubble bot">
                  Analyzed uploaded files and can create a business proposal template. Focus on quarterly projections or annual forecast?
                </div>
                <div className="bubble user">
                  Focus on quarterly projections and include key insights from the video interview.
                </div>
                <div className="bubble bot">
                  Extracted quotes and integrated them with the quarterly data. The template now includes executive summary, Q4 projections, and market analysis.
                </div>

                <input className="chat-input" placeholder="Ask me to refine the template..." />
              </div>
            </div>

            <div className="section-cta">
              {user ? (
                <Link to="/chat" className="btn btn-primary">Get Started Free</Link>
              ) : (
                <div className="cta-row">
                  <Link to="/signup" className="btn btn-primary">Get Started Free</Link>
                  <Link to="/login" className="btn btn-outline">Contact Sales</Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
