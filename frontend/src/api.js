<<<<<<< HEAD
// src/api.js
const API_BASE = "http://localhost:8080";

// export async function generateFromFiles({ files = [], question = "" }, token) {
//   try {
//     const url = `${API_BASE.replace(/\/$/,"")}/api/v1/hackrx/run`;
//     const fd = new FormData();
//     fd.append("question", question || "");
//     (files || []).forEach((f) => fd.append("files", f, f.name));

//     const resp = await fetch(url, {
//       method: "POST",
//       headers: {
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       body: fd,
//     });

//     if (!resp.ok) {
//       const text = await resp.text().catch(() => null);
//       let json = null;
//       try { json = text ? JSON.parse(text) : null; } catch {}
//       return { ok: false, status: resp.status, error: json?.detail || text || resp.statusText };
//     }

//     return await resp.json();
//   } catch (err) {
//     console.error("generateFromFiles error:", err);
//     return { ok: false, error: err.message || "Network error" };
//   }
// }

// api.js
export async function generateFromFiles({ files, question }, token) {
  // Ensure we send the first file only since the backend expects a single 'file' UploadFile
  if (!files || files.length === 0) {
    throw new Error("No files provided");
  }
  const fd = new FormData();
  fd.append("file", files[0]); // backend expects field name 'file'
  // send questions as a JSON array string if you want multiple; here we send a single question
  fd.append("questions", question);

  const res = await fetch("http://localhost:8080/api/v1/hackrx/run", {
    method: "POST",
    headers: {
      // don't set Content-Type; browser will set multipart/form-data boundary
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: fd,
  });

  // Attempt to parse JSON body safely even on non-2xx responses
  let body;
  try {
    body = await res.json();
  } catch (err) {
    // non-JSON response
    const text = await res.text();
    return { ok: false, error: `Non-JSON response: ${text}` };
  }

  if (!res.ok) {
    // return structured error so frontend can show it
    return { ok: false, status: res.status, body };
  }
  // success
  return { ok: true, ...body };
}


export async function downloadUrlFor(templateJson, token) {
  try {
    const url = `${API_BASE.replace(/\/$/,"")}/generate_download`;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ template: templateJson }),
    });
    if (!resp.ok) {
      const t = await resp.text().catch(() => null);
      throw new Error(t || resp.statusText || `status ${resp.status}`);
    }
    return await resp.json();
  } catch (err) {
    console.error("downloadUrlFor failed:", err);
    throw err;
  }
}



// src/api.js  — add this function

/**
 * Log in with email/password (or username/password).
 * Adjust `loginUrl` to match your backend route.
 *
 * Returns: { ok: true, token, body } on success
 *          { ok: false, status, body } on HTTP errors
 *          throws on network failures
 */
export async function login({ username, password } = {}) {
  if (!username || !password) {
    return { ok: false, error: "username and password required" };
  }

  // change this to your actual login endpoint if different
  const loginUrl = `${API_BASE.replace(/\/$/, "")}/api/v1/auth/login`;

  try {
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    let body;
    try {
      body = await res.json();
    } catch (err) {
      body = null;
    }

    if (!res.ok) {
      return { ok: false, status: res.status, body };
    }

    // assume backend returns something like { access_token: "...", token_type: "bearer", user: {...} }
    const token = body?.access_token || body?.token || body?.auth_token || null;

    return { ok: true, token, body };
  } catch (err) {
    console.error("login error:", err);
    return { ok: false, error: err.message || "Network error" };
  }
}
=======
// src/shared/api.js
import axios from 'axios'

export const BASE_URL = 'http://localhost:8080'
// src/api.js
// const BASE_URL = "http://localhost:8000"; // <- change this if your backend runs elsewhere

function handleResp(resp) {
  if (!resp.ok) {
    // try to parse JSON error body
    return resp.json().then((body) => {
      const msg = body?.detail || body?.message || `Request failed (${resp.status})`;
      throw new Error(msg);
    }).catch(() => {
      throw new Error(`Request failed (${resp.status})`);
    });
  }
  return resp.json();
}

// Auth
export async function signup({ name, email, password }) {
  const resp = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResp(resp);
}

export async function login({ email, password }) {
  const resp = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResp(resp);
}

// Helper to build Authorization header
function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Upload PDF
export async function uploadPdf(file, token) {
  const fd = new FormData();
  fd.append("file", file, file.name);
  const resp = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: { ...authHeaders(token) }, // DO NOT set Content-Type here; browser will set multipart boundary
    body: fd,
  });
  return handleResp(resp);
}

export async function uploadFiles(formData, token) {
  const resp = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: { ...authHeaders(token) }, // don't set Content-Type
    body: formData,
  });
  return handleResp(resp);
}

// generate_template (FormData expected)
export async function generateTemplate({ job_id, question, top_k = 5 }, token) {
  const fd = new FormData();
  fd.append("job_id", job_id);
  fd.append("question", question);
  fd.append("top_k", String(top_k));
  const resp = await fetch(`${BASE_URL}/generate_template`, {
    method: "POST",
    headers: { ...authHeaders(token) },
    body: fd,
  });
  return handleResp(resp);
}

// /generate (form fields job_id, sections (stringified) optional)
export async function generateReport({ job_id, sections = null, tone = "formal" }, token) {
  const fd = new FormData();
  fd.append("job_id", job_id);
  if (sections) fd.append("sections", Array.isArray(sections) ? JSON.stringify(sections) : sections);
  fd.append("tone", tone);
  const resp = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: { ...authHeaders(token) },
    body: fd,
  });
  return handleResp(resp);
}

// refine
export async function refine({ job_id, instruction }, token) {
  const fd = new FormData();
  fd.append("job_id", job_id);
  fd.append("instruction", instruction);
  const resp = await fetch(`${BASE_URL}/refine`, {
    method: "POST",
    headers: { ...authHeaders(token) },
    body: fd,
  });
  return handleResp(resp);
}

export function downloadUrlFor(job_id) {
  return `${BASE_URL}/download/${job_id}`;
}
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
