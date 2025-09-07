import React from "react";

export default function ExtractedPages({ pages }) {
  if (!pages || pages.length === 0) {
    return (
      <div className="card">
        <h3>Extracted Pages</h3>
        <p>No uploaded file yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Extracted Pages</h3>
      <div className="pages">
        {pages.map((p) => (
          <div className="page" key={p.page_num}>
            <div className="page-header">Page {p.page_num}</div>
            <div className="page-text">{p.text || "(no text)"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
