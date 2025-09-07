// // src/pages/Profile.jsx
// import React, { useEffect, useState } from 'react'

// export default function Profile() {
//   const [profile, setProfile] = useState({
//     crop: '',
//     variety: '',
//     acreage: '',
//     soilType: '',
//     irrigation: '',
//     pests: '',
//     language: '',
//     notes: '',
//   })
//   const [saved, setSaved] = useState(false)

//   useEffect(() => {
//     try {
//       const cached = JSON.parse(localStorage.getItem('farmer_profile'))
//       if (cached) setProfile((p) => ({ ...p, ...cached }))
//     } catch {}
//   }, [])

//   const onChange = (key) => (e) => {
//     setProfile((p) => ({ ...p, [key]: e.target.value }))
//     setSaved(false)
//   }

//   const save = () => {
//     localStorage.setItem('farmer_profile', JSON.stringify(profile))
//     setSaved(true)
//   }

//   const clear = () => {
//     const blank = {
//       crop: '',
//       variety: '',
//       acreage: '',
//       soilType: '',
//       irrigation: '',
//       pests: '',
//       language: '',
//       notes: '',
//     }
//     setProfile(blank)
//     localStorage.setItem('farmer_profile', JSON.stringify(blank))
//     setSaved(true)
//   }

//   return (
//     <div style={styles.wrap}>
//       <h2 style={styles.h2}>Farmer Profile</h2>
//       <p style={styles.sub}>These details personalize advice and will be used in chat requests.</p>

//       <div style={styles.grid}>
//         <input value={profile.crop} onChange={onChange('crop')} placeholder="Crop (e.g., Tomato)" style={styles.input} />
//         <input value={profile.variety} onChange={onChange('variety')} placeholder="Variety (e.g., Pusa Ruby)" style={styles.input} />
//         <input value={profile.acreage} onChange={onChange('acreage')} placeholder="Acreage (e.g., 2 acres)" style={styles.input} />
//         <input value={profile.soilType} onChange={onChange('soilType')} placeholder="Soil type (e.g., loam)" style={styles.input} />
//         <input value={profile.irrigation} onChange={onChange('irrigation')} placeholder="Irrigation (drip/sprinkler/rainfed)" style={styles.input} />
//         <input value={profile.pests} onChange={onChange('pests')} placeholder="Known pests (e.g., fruit borer)" style={styles.input} />
//         <input value={profile.language} onChange={onChange('language')} placeholder="Preferred language (e.g., hi, en)" style={styles.input} />
//         <input value={profile.notes} onChange={onChange('notes')} placeholder="Notes (e.g., organic, last spray date)" style={styles.inputFull} />
//       </div>

//       <div style={styles.row}>
//         <button onClick={save} style={styles.primaryBtn}>Update</button>
//         <button onClick={clear} style={styles.clearBtn}>Clear</button>
//         {saved && <span style={styles.saved}>Saved</span>}
//       </div>
//     </div>
//   )
// }

// const styles = {
//   wrap: { padding: 24, color: '#e7eef7' },
//   h2: { marginBottom: 6 },
//   sub: { color: '#9fb3d2', marginBottom: 16 },
//   grid: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 },
//   input: { padding: '10px 12px', borderRadius: 8, border: '1px solid #1f2b3b', background: '#0f1b2d', color: '#e7eef7' },
//   inputFull: { gridColumn: '1 / -1', padding: '10px 12px', borderRadius: 8, border: '1px solid #1f2b3b', background: '#0f1b2d', color: '#e7eef7' },
//   row: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 },
//   primaryBtn: { padding: '10px 16px', borderRadius: 8, border: 'none', background: '#7aa2f7', color: '#0b1726', fontWeight: 700, cursor: 'pointer' },
//   clearBtn: { padding: '10px 16px', borderRadius: 8, border: '1px solid #ffb4a9', background: 'transparent', color: '#ffb4a9', cursor: 'pointer' },
//   saved: { color: '#9fb3d2' },
// }


// // src/pages/Profile.jsx
// import React, { useEffect, useState } from 'react'
// import { useAuth } from '../state/AuthContext.jsx'
// import { getOrCreateProfile, updateProfile } from '../api.js'

// export default function Profile() {
//   const { token, client } = useAuth()
//   const [form, setForm] = useState({
//     crops: '',
//     soil_type: '',
//     location_pref: '',
//     irrigation_method: '',
//     acreage: '',
//     custom_notes: '',
//   })
//   const [loading, setLoading] = useState(false)
//   const [saved, setSaved] = useState(false)
//   const [err, setErr] = useState('')

//   useEffect(() => {
//     if (!token) return
//     let mounted = true
//     ;(async () => {
//       try {
//         setLoading(true)
//         const data = await getOrCreateProfile(client)
//         if (mounted && data) {
//           setForm({
//             crops: data.crops || '',
//             soil_type: data.soil_type || '',
//             location_pref: data.location_pref || '',
//             irrigation_method: data.irrigation_method || '',
//             acreage: data.acreage || '',
//             custom_notes: data.custom_notes || '',
//           })
//         }
//       } catch (e) {
//         setErr(e?.response?.data?.detail || e.message || 'Failed to load profile')
//       } finally {
//         setLoading(false)
//       }
//     })()
//     return () => { mounted = false }
//   }, [token, client])

//   const onChange = (k) => (e) => {
//     setForm((f) => ({ ...f, [k]: e.target.value }))
//     setSaved(false)
//     setErr('')
//   }

//   const onUpdate = async () => {
//     try {
//       setLoading(true)
//       setErr('')
//       const payload = Object.fromEntries(
//         Object.entries(form).filter(([, v]) => v != null && v !== '')
//       )
//       const data = await updateProfile(client, payload)
//       setForm({
//         crops: data.crops || '',
//         soil_type: data.soil_type || '',
//         location_pref: data.location_pref || '',
//         irrigation_method: data.irrigation_method || '',
//         acreage: data.acreage || '',
//         custom_notes: data.custom_notes || '',
//       })
//       setSaved(true)
//     } catch (e) {
//       setErr(e?.response?.data?.detail || e.message || 'Failed to update profile')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div style={styles.wrap}>
//       <h2 style={styles.h2}>Farmer Profile</h2>
//       {!token && <div style={styles.warn}>Please log in to save your profile.</div>}
//       {err && <div style={styles.err}>{err}</div>}

//       <div style={styles.grid}>
//         <input value={form.crops} onChange={onChange('crops')} placeholder="Crops (e.g., tomato)" style={styles.input} />
//         <input value={form.soil_type} onChange={onChange('soil_type')} placeholder="Soil type (e.g., loam)" style={styles.input} />
//         <input value={form.location_pref} onChange={onChange('location_pref')} placeholder="Location preference (lat,lon or district)" style={styles.input} />
//         <input value={form.irrigation_method} onChange={onChange('irrigation_method')} placeholder="Irrigation (drip/sprinkler/rainfed)" style={styles.input} />
//         <input value={form.acreage} onChange={onChange('acreage')} placeholder="Acreage (e.g., 2 acres)" style={styles.input} />
//         <input value={form.custom_notes} onChange={onChange('custom_notes')} placeholder="Notes (e.g., organic, last spray date)" style={styles.inputFull} />
//       </div>

//       <div style={styles.row}>
//         <button onClick={onUpdate} disabled={!token || loading} style={styles.primaryBtn}>
//           {loading ? 'Saving…' : 'Update'}
//         </button>
//         {saved && <span style={styles.saved}>Saved</span>}
//       </div>
//     </div>
//   )
// }

// const styles = {
//   wrap: { padding: 24, color: '#e7eef7' },
//   h2: { marginBottom: 6 },
//   grid: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 },
//   input: { padding: '10px 12px', borderRadius: 8, border: '1px solid #1f2b3b', background: '#0f1b2d', color: '#e7eef7' },
//   inputFull: { gridColumn: '1 / -1', padding: '10px 12px', borderRadius: 8, border: '1px solid #1f2b3b', background: '#0f1b2d', color: '#e7eef7' },
//   row: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 },
//   primaryBtn: { padding: '10px 16px', borderRadius: 8, border: 'none', background: '#7aa2f7', color: '#0b1726', fontWeight: 700, cursor: 'pointer' },
//   saved: { color: '#9fb3d2' },
//   warn: { color: '#ffb4a9', marginBottom: 8 },
//   err: { color: '#ffb4a9', marginBottom: 8 },
// }


// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";
import { getOrCreateProfile, updateProfile } from "../api.js";

export default function Profile() {
  const { token, client } = useAuth();
  const [form, setForm] = useState({
    crops: "",
    soil_type: "",
    location_pref: "",
    irrigation_method: "",
    acreage: "",
    custom_notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!token) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getOrCreateProfile(client);
        if (mounted && data) {
          setForm({
            crops: data.crops || "",
            soil_type: data.soil_type || "",
            location_pref: data.location_pref || "",
            irrigation_method: data.irrigation_method || "",
            acreage: data.acreage || "",
            custom_notes: data.custom_notes || "",
          });
        }
      } catch (e) {
        setErr(
          e?.response?.data?.detail || e.message || "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [token, client]);

  const onChange = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setSaved(false);
    setErr("");
  };

  const onUpdate = async () => {
    try {
      setLoading(true);
      setErr("");
      const payload = Object.fromEntries(
        Object.entries(form).filter(([, v]) => v != null && v !== "")
      );
      const data = await updateProfile(client, payload);
      setForm({
        crops: data.crops || "",
        soil_type: data.soil_type || "",
        location_pref: data.location_pref || "",
        irrigation_method: data.irrigation_method || "",
        acreage: data.acreage || "",
        custom_notes: data.custom_notes || "",
      });
      setSaved(true);
    } catch (e) {
      setErr(
        e?.response?.data?.detail || e.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrap}>
      <h2 style={styles.h2}>Farmer Profile</h2>
      {!token && (
        <div style={styles.warn}>Please log in to save your profile.</div>
      )}
      {err && <div style={styles.err}>{err}</div>}

      <div style={styles.grid}>
        <input
          className="chat-input"
          value={form.crops}
          onChange={onChange("crops")}
          placeholder="Crops (e.g., tomato)"
          style={styles.input}
        />
        <input
          className="chat-input"
          value={form.soil_type}
          onChange={onChange("soil_type")}
          placeholder="Soil type (e.g., loam)"
          style={styles.input}
        />
        <input
          className="chat-input"
          value={form.location_pref}
          onChange={onChange("location_pref")}
          placeholder="Location preference (lat,lon or district)"
          style={styles.input}
        />
        <input
          className="chat-input"
          value={form.irrigation_method}
          onChange={onChange("irrigation_method")}
          placeholder="Irrigation (drip/sprinkler/rainfed)"
          style={styles.input}
        />
        <input
          className="chat-input"
          value={form.acreage}
          onChange={onChange("acreage")}
          placeholder="Acreage (e.g., 2 acres)"
          style={styles.input}
        />
        <input
          className="chat-input"
          value={form.custom_notes}
          onChange={onChange("custom_notes")}
          placeholder="Notes (e.g., organic, last spray date)"
          style={styles.inputFull}
        />
      </div>

      <div style={styles.row}>
        <button
          onClick={onUpdate}
          disabled={!token || loading}
          style={styles.primaryBtn}
        >
          {loading ? "Saving…" : "Update"}
        </button>
        {saved && <span style={styles.saved}>Saved</span>}
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    padding: 24,
    color: "#e7eef7",
    backgroundColor: "#0b1726",
    minHeight: "100vh",
  },
  h2: { marginBottom: 6 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 10,
  },
  input: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #1f2b3b",
    background: "#0f1b2d",
    color: "#e7eef7",
  },
  inputFull: {
    gridColumn: "1 / -1",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #1f2b3b",
    background: "#0f1b2d",
    color: "#e7eef7",
  },
  row: { display: "flex", alignItems: "center", gap: 10, marginTop: 14 },
  primaryBtn: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#7aa2f7",
    color: "#0b1726",
    fontWeight: 700,
    cursor: "pointer",
  },
  saved: { color: "#9fb3d2" },
  warn: { color: "#ffb4a9", marginBottom: 8 },
  err: { color: "#ffb4a9", marginBottom: 8 },
};
