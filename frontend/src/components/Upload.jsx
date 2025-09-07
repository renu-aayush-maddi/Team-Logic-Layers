// src/components/Upload.jsx
import React, { useRef, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import * as api from "../api";

export default function Upload({ onUploaded }) {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);
  const { token } = useAuth();

  async function handleUpload(e) {
    e.preventDefault();
    const file = fileRef.current.files[0];
    if (!file) {
      alert("Please pick a PDF file.");
      return;
    }
    setUploading(true);
    try {
      const data = await api.uploadPdf(file, token);
      // backend returns { job_id, upload_id, filename, num_pages }
      onUploaded(data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed: " + (err.message || err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="card">
      <h3>Upload PDF</h3>
      <form onSubmit={handleUpload}>
        <input ref={fileRef} type="file" accept="application/pdf" />
        <div style={{ marginTop: 10 }}>
          <button type="submit" disabled={uploading} className="primary">
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
}
