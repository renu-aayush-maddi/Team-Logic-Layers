// import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios'

// const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

// export default function Chat() {
//   const [messages, setMessages] = useState([
//     { role: 'assistant', text: 'Namaste! Ask any agriculture question in your language.' },
//   ])
//   const [input, setInput] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const listEndRef = useRef(null)
//   const [location, setLocation] = useState(null)

//   useEffect(() => {
//     listEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages, loading])

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
//         },
//         (err) => {
//           console.warn('Location access denied:', err.message)
//         }
//       )
//     }
//   }, [])

//   const ask = async (e) => {
//     e.preventDefault()
//     const q = input.trim()
//     if (!q) return
//     setError('')
//     setMessages((m) => [...m, { role: 'user', text: q }])
//     setInput('')
//     setLoading(true)
//     try {
//       const res = await axios.post(`${API_BASE}/answer`, { question: q, location }, { timeout: 60000 })
//       const ans = res?.data?.answer ?? 'No answer received.'
//       setMessages((m) => [...m, { role: 'assistant', text: ans }])
//     } catch (err) {
//       const msg = err?.response?.data?.detail || err.message || 'Request failed'
//       setError(msg)
//       setMessages((m) => [...m, { role: 'assistant', text: 'Sorry, I couldn’t process that.' }])
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div style={styles.container}>
//       {/* <header style={styles.header}>
//         Agri Advisor
//         <span style={styles.sub}> - RAG + Gemini - India-ready</span>
//       </header> */}

//       <main style={styles.chat}>
//         {messages.map((m, i) => (
//           <div key={i} style={{ ...styles.bubble, ...(m.role === 'user' ? styles.user : styles.assistant) }}>
//             {m.text}
//           </div>
//         ))}
//         {loading && <div style={{ ...styles.bubble, ...styles.assistant }}>Thinking…</div>}
//         <div ref={listEndRef} />
//       </main>

//       {error && <div style={styles.error}>{error}</div>}

//       <form onSubmit={ask} style={styles.inputRow}>
//         <input
//           style={styles.input}
//           placeholder="e.g., अगले हफ्ते के तापमान से मेरी टमाटर फसल पर क्या असर पड़ेगा?"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button style={styles.button} type="submit" disabled={loading}>
//           Ask
//         </button>
//       </form>

//       <footer style={styles.footer}>
//         Tips: Ask about irrigation timing, seed varieties, pest risk, mandi prices, or policy eligibility.
//       </footer>
//     </div>
//   )
// }

// const styles = {
//   container: { display: 'flex', flexDirection: 'column', height: '100vh', background: '#0b1726', color: '#e7eef7' },
//   header: { padding: '12px 16px', fontWeight: 700, borderBottom: '1px solid #1f2b3b' },
//   sub: { color: '#7aa2f7', fontWeight: 400, marginLeft: 6, fontSize: 14 },
//   chat: { flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 },
//   bubble: { maxWidth: '75%', padding: '10px 12px', borderRadius: 12, whiteSpace: 'pre-wrap', lineHeight: 1.4 },
//   user: { alignSelf: 'flex-end', background: '#244d8a' },
//   assistant: { alignSelf: 'flex-start', background: '#13233a' },
//   inputRow: { display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #1f2b3b' },
//   input: { flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #1f2b3b', background: '#0f1b2d', color: '#e7eef7' },
//   button: { padding: '10px 16px', borderRadius: 8, border: 'none', background: '#7aa2f7', color: '#0b1726', fontWeight: 700, cursor: 'pointer' },
//   error: { color: '#ffb4a9', padding: '4px 16px' },
//   footer: { padding: '8px 16px', color: '#9fb3d2', fontSize: 12 },
// }



// import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios'

// const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

// export default function Chat() {
//   const [messages, setMessages] = useState([
//     { role: 'assistant', text: 'Namaste! Ask any agriculture question in your language.' },
//   ])
//   const [input, setInput] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const listEndRef = useRef(null)
//   const [location, setLocation] = useState(null)

//   // NEW: farmer context (persisted)
//   const [farmerOpen, setFarmerOpen] = useState(false)
//   const [farmer, setFarmer] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem('farmer_ctx')) || {
//         crop: '',
//         variety: '',
//         acreage: '',
//         soilType: '',
//         irrigation: '',
//         pests: '',
//         language: '',
//         notes: '',
//       }
//     } catch {
//       return {
//         crop: '',
//         variety: '',
//         acreage: '',
//         soilType: '',
//         irrigation: '',
//         pests: '',
//         language: '',
//         notes: '',
//       }
//     }
//   })

//   useEffect(() => {
//     listEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages, loading])

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
//         (err) => console.warn('Location access denied:', err.message)
//       )
//     }
//   }, [])

//   // Persist farmer context
//   useEffect(() => {
//     localStorage.setItem('farmer_ctx', JSON.stringify(farmer))
//   }, [farmer])

//   const ask = async (e) => {
//     e.preventDefault()
//     const q = input.trim()
//     if (!q) return
//     setError('')
//     setMessages((m) => [...m, { role: 'user', text: q }])
//     setInput('')
//     setLoading(true)
//     try {
//       const res = await axios.post(
//         `${API_BASE}/answer`,
//         {
//           question: q,
//           location,      // existing
//           farmerContext: // NEW: send farmer details
//             Object.fromEntries(
//               Object.entries(farmer).filter(([_, v]) => v !== '' && v != null)
//             ),
//         },
//         { timeout: 60000 }
//       )
//       const ans = res?.data?.answer ?? 'No answer received.'
//       setMessages((m) => [...m, { role: 'assistant', text: ans }])
//     } catch (err) {
//       const msg = err?.response?.data?.detail || err.message || 'Request failed'
//       setError(msg)
//       setMessages((m) => [...m, { role: 'assistant', text: 'Sorry, I couldn’t process that.' }])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onChange = (key) => (e) => {
//     setFarmer((f) => ({ ...f, [key]: e.target.value }))
//   }

//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         Agri Advisor
//         <span style={styles.sub}> - RAG + Gemini - India-ready</span>
//       </header>

//       {/* NEW: Farmer details panel */}
//       <section style={styles.panel}>
//         <button style={styles.panelToggle} onClick={() => setFarmerOpen((s) => !s)}>
//           {farmerOpen ? 'Hide' : 'Show'} farmer details
//         </button>
//         {farmerOpen && (
//           <div style={styles.grid}>
//             <input value={farmer.crop} onChange={onChange('crop')} placeholder="Crop (e.g., Tomato)" style={styles.input} />
//             <input value={farmer.variety} onChange={onChange('variety')} placeholder="Variety (e.g., Pusa Ruby)" style={styles.input} />
//             <input value={farmer.acreage} onChange={onChange('acreage')} placeholder="Acreage (e.g., 2 acres)" style={styles.input} />
//             <input value={farmer.soilType} onChange={onChange('soilType')} placeholder="Soil type (e.g., loam)" style={styles.input} />
//             <input value={farmer.irrigation} onChange={onChange('irrigation')} placeholder="Irrigation (drip/sprinkler/rainfed)" style={styles.input} />
//             <input value={farmer.pests} onChange={onChange('pests')} placeholder="Known pests (e.g., fruit borer)" style={styles.input} />
//             <input value={farmer.language} onChange={onChange('language')} placeholder="Preferred language (e.g., hi, en)" style={styles.input} />
//             <input value={farmer.notes} onChange={onChange('notes')} placeholder="Notes (e.g., organic, last spray date)" style={styles.inputFull} />
//           </div>
//         )}
//       </section>

//       <main style={styles.chat}>
//         {messages.map((m, i) => (
//           <div key={i} style={{ ...styles.bubble, ...(m.role === 'user' ? styles.user : styles.assistant) }}>
//             {m.text}
//           </div>
//         ))}
//         {loading && <div style={{ ...styles.bubble, ...styles.assistant }}>Thinking…</div>}
//         <div ref={listEndRef} />
//       </main>

//       {error && <div style={styles.error}>{error}</div>}

//       <form onSubmit={ask} style={styles.inputRow}>
//         <input
//           style={styles.input}
//           placeholder="e.g., अगले हफ्ते के तापमान से मेरी टमाटर फसल पर क्या असर पड़ेगा?"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button style={styles.button} type="submit" disabled={loading}>
//           Ask
//         </button>
//       </form>

//       <footer style={styles.footer}>
//         Tips: Add crop, acreage, irrigation etc. in farmer details for better advice.
//       </footer>
//     </div>
//   )
// }

// const styles = {
//   container: { display: 'flex', flexDirection: 'column', height: '100vh', background: '#0b1726', color: '#e7eef7' },
//   header: { padding: '12px 16px', fontWeight: 700, borderBottom: '1px solid #1f2b3b' },
//   sub: { color: '#7aa2f7', fontWeight: 400, marginLeft: 6, fontSize: 14 },

//   panel: { padding: '8px 16px', borderBottom: '1px solid #1f2b3b' },
//   panelToggle: { padding: '6px 10px', borderRadius: 6, border: '1px solid #1f2b3b', background: '#0f1b2d', color: '#e7eef7', cursor: 'pointer' },
//   grid: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8, marginTop: 8 },
//   input: { padding: '10px 12px', borderRadius: 8, border: '1px solid #1f2b3b', background: '#0f1b2d', color: '#e7eef7' },
//   inputFull: { gridColumn: '1 / -1', padding: '10px 12px', borderRadius: 8, border: '1px solid #1f2b3b', background: '#0f1b2d', color: '#e7eef7' },

//   chat: { flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 },
//   bubble: { maxWidth: '75%', padding: '10px 12px', borderRadius: 12, whiteSpace: 'pre-wrap', lineHeight: 1.4 },
//   user: { alignSelf: 'flex-end', background: '#244d8a' },
//   assistant: { alignSelf: 'flex-start', background: '#13233a' },

//   inputRow: { display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #1f2b3b' },
//   button: { padding: '10px 16px', borderRadius: 8, border: 'none', background: '#7aa2f7', color: '#0b1726', fontWeight: 700, cursor: 'pointer' },
//   error: { color: '#ffb4a9', padding: '4px 16px' },
//   footer: { padding: '8px 16px', color: '#9fb3d2', fontSize: 12 },
// }



// src/pages/Chat.jsx
// import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios'
// import { useTranslation } from 'react-i18next'
// import LanguagePrompt from '../components/LanguagePrompt.jsx'
// import useLanguageSuggestion from '../hooks/useLanguageSuggestion.js'


// const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

// export default function Chat() {
//   const [messages, setMessages] = useState([
//     { role: 'assistant', text: 'Namaste! Ask any agriculture question in your language.' },
//   ])
//   const [input, setInput] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const listEndRef = useRef(null)
//   const [location, setLocation] = useState(null)

//   // Farmer profile UI state (frontend shape)
//   const [profileOpen, setProfileOpen] = useState(false)
//   const [profile, setProfile] = useState({
//     crop: '',          // maps -> crops
//     variety: '',       // stays only in UI; not in backend schema
//     acreage: '',       // maps -> acreage
//     soilType: '',      // maps -> soil_type
//     irrigation: '',    // maps -> irrigation_method
//     pests: '',         // stays only in UI; not in backend schema
//     language: '',      // stays only in UI; not in backend schema
//     notes: '',         // maps -> custom_notes
//   })
//   const [profileSaving, setProfileSaving] = useState(false)
//   const [profileSaved, setProfileSaved] = useState(false)

//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''

//   // Scroll on new messages
//   useEffect(() => {
//     listEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages, loading])

//   // Get location once
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
//         },
//         (err) => {
//           console.warn('Location access denied:', err.message)
//         }
//       )
//     }
//   }, [])

//   // Load profile from server if logged in
//   useEffect(() => {
//     if (!token) return
//     ;(async () => {
//       try {
//         // Per your API, POST /me with empty body returns the current profile or empty
//         const { data } = await axios.post(
//           `${API_BASE}/me`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//         // Map backend -> UI fields
//         setProfile((p) => ({
//           ...p,
//           crop: data?.crops || '',
//           acreage: data?.acreage || '',
//           soilType: data?.soil_type || '',
//           irrigation: data?.irrigation_method || '',
//           notes: data?.custom_notes || '',
//           // keep UI-only fields as-is
//           variety: p.variety,
//           pests: p.pests,
//           language: p.language,
//         }))
//       } catch (e) {
//         console.warn('Failed to load profile from server:', e?.message || e)
//       }
//     })()
//   }, [token])

//   // Save profile to server (maps UI -> backend schema)
//   const saveProfile = async () => {
//     if (!token) {
//       setError('Login required to update farmer profile.')
//       return
//     }
//     setProfileSaving(true)
//     setProfileSaved(false)
//     setError('')
//     try {
//       const payload = {
//         // Only include fields your backend supports
//         ...(profile.crop ? { crops: profile.crop } : {}),
//         ...(profile.soilType ? { soil_type: profile.soilType } : {}),
//         ...(profile.irrigation ? { irrigation_method: profile.irrigation } : {}),
//         ...(profile.acreage ? { acreage: profile.acreage } : {}),
//         ...(profile.notes ? { custom_notes: profile.notes } : {}),
//         // If you ever support location preference from UI, map to location_pref here
//         // ...(profile.locationPref ? { location_pref: profile.locationPref } : {}),
//       }
//       const { data } = await axios.post(
//         `${API_BASE}/me`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       // Round-trip set from server response to be canonical
//       setProfile((p) => ({
//         ...p,
//         crop: data?.crops || '',
//         acreage: data?.acreage || '',
//         soilType: data?.soil_type || '',
//         irrigation: data?.irrigation_method || '',
//         notes: data?.custom_notes || '',
//       }))
//       setProfileSaved(true)
//     } catch (e) {
//       setError(e?.response?.data?.detail || e.message || 'Failed to update profile')
//     } finally {
//       setProfileSaving(false)
//     }
//   }

//   // Chat ask
//   const ask = async (e) => {
//     e.preventDefault()
//     const q = input.trim()
//     if (!q) return
//     setError('')
//     setMessages((m) => [...m, { role: 'user', text: q }])
//     setInput('')
//     setLoading(true)
//     try {
//       // Build farmerProfile sent to /answer. Include both backend-supported
//       // and UI-only fields so your /answer logic can use them if desired.
//       const farmerProfile = Object.fromEntries(
//         Object.entries({
//           crop: profile.crop,
//           variety: profile.variety,
//           acreage: profile.acreage,
//           soilType: profile.soilType,
//           irrigation: profile.irrigation,
//           pests: profile.pests,
//           language: profile.language,
//           notes: profile.notes,
//         }).filter(([, v]) => v !== '' && v != null)
//       )

//       const res = await axios.post(
//         `${API_BASE}/ask`,
//         { question: q, location, farmerProfile },
//         {
//           timeout: 60000,
//           headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//         }
//       )
//       const ans = res?.data?.answer ?? 'No answer received.'
//       setMessages((m) => [...m, { role: 'assistant', text: ans }])
//     } catch (err) {
//       const msg = err?.response?.data?.detail || err.message || 'Request failed'
//       setError(msg)
//       setMessages((m) => [...m, { role: 'assistant', text: 'Sorry, I couldn’t process that.' }])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onProfileChange = (key) => (e) => {
//     setProfile((p) => ({ ...p, [key]: e.target.value }))
//     setProfileSaved(false)
//   }

//   const summaryChips = () => {
//     const chips = []
//     if (profile.crop) chips.push(profile.crop)
//     if (profile.acreage) chips.push(profile.acreage)
//     if (profile.irrigation) chips.push(profile.irrigation)
//     if (profile.soilType) chips.push(profile.soilType)
//     return chips.join(' • ')
//   }

//   const clearProfile = () => {
//     setProfile({
//       crop: '',
//       variety: '',
//       acreage: '',
//       soilType: '',
//       irrigation: '',
//       pests: '',
//       language: '',
//       notes: '',
//     })
//     setProfileSaved(false)
//   }

//   return (
//     <div style={styles.container}>
//       {/* Profile panel */}
//       <section style={styles.panel}>
//         <div style={styles.panelHeader}>
//           <button style={styles.panelToggle} onClick={() => setProfileOpen((s) => !s)}>
//             {profileOpen ? 'Hide' : 'Show'} farmer details
//           </button>
//           {!profileOpen && (
//             <span style={styles.chips}>{summaryChips() || 'Add details for better advice'}</span>
//           )}
//         </div>

//         {profileOpen && (
//           <div style={styles.grid}>
//             <input value={profile.crop} onChange={onProfileChange('crop')} placeholder="Crop (e.g., Tomato)" style={styles.input} />
//             <input value={profile.variety} onChange={onProfileChange('variety')} placeholder="Variety (e.g., Pusa Ruby)" style={styles.input} />
//             <input value={profile.acreage} onChange={onProfileChange('acreage')} placeholder="Acreage (e.g., 2 acres)" style={styles.input} />
//             <input value={profile.soilType} onChange={onProfileChange('soilType')} placeholder="Soil type (e.g., loam)" style={styles.input} />
//             <input value={profile.irrigation} onChange={onProfileChange('irrigation')} placeholder="Irrigation (drip/sprinkler/rainfed)" style={styles.input} />
//             <input value={profile.pests} onChange={onProfileChange('pests')} placeholder="Known pests (e.g., fruit borer)" style={styles.input} />
//             <input value={profile.language} onChange={onProfileChange('language')} placeholder="Preferred language (e.g., hi, en)" style={styles.input} />
//             <input value={profile.notes} onChange={onProfileChange('notes')} placeholder="Notes (e.g., organic, last spray date)" style={styles.inputFull} />
//             <div style={styles.row}>
//               <button type="button" onClick={saveProfile} disabled={profileSaving} style={styles.primaryBtn}>
//                 {profileSaving ? 'Saving…' : 'Update'}
//               </button>
//               <button type="button" onClick={clearProfile} style={styles.clearBtn}>Clear</button>
//               {profileSaved && <span style={styles.saved}>Saved</span>}
//             </div>
//           </div>
//         )}
//       </section>

//       {/* Chat */}
//       <main style={styles.chat}>
//         {messages.map((m, i) => (
//           <div key={i} style={{ ...styles.bubble, ...(m.role === 'user' ? styles.user : styles.assistant) }}>
//             {m.text}
//           </div>
//         ))}
//         {loading && <div style={{ ...styles.bubble, ...styles.assistant }}>Thinking…</div>}
//         <div ref={listEndRef} />
//       </main>

//       {error && <div style={styles.error}>{error}</div>}

//       <form onSubmit={ask} style={styles.inputRow}>
//         <input
//           style={styles.textInput}
//           placeholder="e.g., अगले हफ्ते के तापमान से मेरी टमाटर फसल पर क्या असर पड़ेगा?"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button style={styles.button} type="submit" disabled={loading}>
//           Ask
//         </button>
//       </form>

//       <footer style={styles.footer}>
//         Tips: Add crop, acreage, irrigation, soil type, and language in farmer details for better advice.
//       </footer>
//     </div>
//   )
// }

// const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

// export default function Chat() {
//   const { t, i18n } = useTranslation()

//   const [messages, setMessages] = useState([
//     { role: 'assistant', text: t('welcome', 'Namaste! Ask any agriculture question in your language.') },
//   ])
//   const [input, setInput] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const listEndRef = useRef(null)
//   const [location, setLocation] = useState(null)

//   // Farmer profile UI state (frontend shape)
//   const [profileOpen, setProfileOpen] = useState(false)
//   const [profile, setProfile] = useState({
//     crop: '',          // maps -> crops
//     variety: '',       // stays only in UI; not in backend schema
//     acreage: '',       // maps -> acreage
//     soilType: '',      // maps -> soil_type
//     irrigation: '',    // maps -> irrigation_method
//     pests: '',         // stays only in UI; not in backend schema
//     language: '',      // stays only in UI; not in backend schema
//     notes: '',         // maps -> custom_notes
//   })
//   const [profileSaving, setProfileSaving] = useState(false)
//   const [profileSaved, setProfileSaved] = useState(false)

//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''

//   // Scroll on new messages
//   useEffect(() => {
//     listEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages, loading])

//   // Get location once
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
//         },
//         (err) => {
//           console.warn('Location access denied:', err.message)
//         }
//       )
//     }
//   }, [])

//   // Load profile from server if logged in
//   useEffect(() => {
//     if (!token) return
//     ;(async () => {
//       try {
//         // Per your API, POST /me with empty body returns the current profile or empty
//         const { data } = await axios.post(
//           `${API_BASE}/me`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//         // Map backend -> UI fields
//         setProfile((p) => ({
//           ...p,
//           crop: data?.crops || '',
//           acreage: data?.acreage || '',
//           soilType: data?.soil_type || '',
//           irrigation: data?.irrigation_method || '',
//           notes: data?.custom_notes || '',
//           // keep UI-only fields as-is
//           variety: p.variety,
//           pests: p.pests,
//           language: p.language,
//         }))
//       } catch (e) {
//         console.warn('Failed to load profile from server:', e?.message || e)
//       }
//     })()
//   }, [token])

//   // Save profile to server (maps UI -> backend schema)
//   const saveProfile = async () => {
//     if (!token) {
//       setError(t('loginRequired', 'Login required to update farmer profile.'))
//       return
//     }
//     setProfileSaving(true)
//     setProfileSaved(false)
//     setError('')
//     try {
//       const payload = {
//         // Only include fields your backend supports
//         ...(profile.crop ? { crops: profile.crop } : {}),
//         ...(profile.soilType ? { soil_type: profile.soilType } : {}),
//         ...(profile.irrigation ? { irrigation_method: profile.irrigation } : {}),
//         ...(profile.acreage ? { acreage: profile.acreage } : {}),
//         ...(profile.notes ? { custom_notes: profile.notes } : {}),
//         // Example: if you decide to persist language
//         ...(profile.language ? { language: profile.language } : {}),
//       }
//       const { data } = await axios.post(
//         `${API_BASE}/me`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       // Round-trip set from server response to be canonical
//       setProfile((p) => ({
//         ...p,
//         crop: data?.crops || '',
//         acreage: data?.acreage || '',
//         soilType: data?.soil_type || '',
//         irrigation: data?.irrigation_method || '',
//         notes: data?.custom_notes || '',
//       }))
//       setProfileSaved(true)
//     } catch (e) {
//       setError(e?.response?.data?.detail || e.message || t('updateFailed', 'Failed to update profile'))
//     } finally {
//       setProfileSaving(false)
//     }
//   }

//   // Chat ask
//   const ask = async (e) => {
//     e.preventDefault()
//     const q = input.trim()
//     if (!q) return
//     setError('')
//     setMessages((m) => [...m, { role: 'user', text: q }])
//     setInput('')
//     setLoading(true)
//     try {
//       // Build farmerProfile sent to /answer. Include both backend-supported
//       // and UI-only fields so your /answer logic can use them if desired.
//       const farmerProfile = Object.fromEntries(
//         Object.entries({
//           crop: profile.crop,
//           variety: profile.variety,
//           acreage: profile.acreage,
//           soilType: profile.soilType,
//           irrigation: profile.irrigation,
//           pests: profile.pests,
//           language: profile.language || i18n.language,
//           notes: profile.notes,
//         }).filter(([, v]) => v !== '' && v != null)
//       )

//       const res = await axios.post(
//         `${API_BASE}/ask`,
//         { question: q, location, farmerProfile },
//         {
//           timeout: 60000,
//           headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//         }
//       )
//       const ans = res?.data?.answer ?? t('noAnswer', 'No answer received.')
//       setMessages((m) => [...m, { role: 'assistant', text: ans }])
//     } catch (err) {
//       const msg = err?.response?.data?.detail || err.message || t('requestFailed', 'Request failed')
//       setError(msg)
//       setMessages((m) => [...m, { role: 'assistant', text: t('sorryCouldNotProcess', 'Sorry, I couldn’t process that.') }])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onProfileChange = (key) => (e) => {
//     setProfile((p) => ({ ...p, [key]: e.target.value }))
//     setProfileSaved(false)
//   }

//   const summaryChips = () => {
//     const chips = []
//     if (profile.crop) chips.push(profile.crop)
//     if (profile.acreage) chips.push(profile.acreage)
//     if (profile.irrigation) chips.push(profile.irrigation)
//     if (profile.soilType) chips.push(profile.soilType)
//     return chips.join(' • ')
//   }

//   const clearProfile = () => {
//     setProfile({
//       crop: '',
//       variety: '',
//       acreage: '',
//       soilType: '',
//       irrigation: '',
//       pests: '',
//       language: '',
//       notes: '',
//     })
//     setProfileSaved(false)
//   }

//   // Always default UI to English on first load; never auto-switch.
//   // Compute a suggestion and show popup first.
//   const profileLang = profile.language || null
//   const { suggested, accept, reject } = useLanguageSuggestion({ location, profileLang })

//   // When user accepts suggestion, also reflect to profile.language (UI-only) and optionally persist
//   const onAcceptLanguage = async () => {
//     const lng = suggested
//     accept(lng) // this calls i18n.changeLanguage and persists to localStorage
//     setProfile((p) => ({ ...p, language: lng }))
//     // Optionally persist to backend profile (behind auth)
//     if (token) {
//       try {
//         await axios.post(
//           `${API_BASE}/me`,
//           { language: lng },
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//       } catch {
//         // non-blocking
//       }
//     }
//   }

//   return (
//     <div style={styles.container}>
//       {/* Language popup (always before changing language) */}
//       {suggested && (
//         <LanguagePrompt
//           suggested={suggested}
//           onAccept={onAcceptLanguage}
//           onReject={reject}
//         />
//       )}

//       {/* Profile panel */}
//       <section style={styles.panel}>
//         <div style={styles.panelHeader}>
//           <button style={styles.panelToggle} onClick={() => setProfileOpen((s) => !s)}>
//             {profileOpen ? t('hideDetails', 'Hide') : t('showDetails', 'Show')} {t('farmerDetails', 'farmer details')}
//           </button>
//           {!profileOpen && (
//             <span style={styles.chips}>{summaryChips() || t('addDetails', 'Add details for better advice')}</span>
//           )}
//         </div>

//         {profileOpen && (
//           <div style={styles.grid}>
//             <input value={profile.crop} onChange={onProfileChange('crop')} placeholder={t('cropPlaceholder', 'Crop (e.g., Tomato)')} style={styles.input} />
//             <input value={profile.variety} onChange={onProfileChange('variety')} placeholder={t('varietyPlaceholder', 'Variety (e.g., Pusa Ruby)')} style={styles.input} />
//             <input value={profile.acreage} onChange={onProfileChange('acreage')} placeholder={t('acreagePlaceholder', 'Acreage (e.g., 2 acres)')} style={styles.input} />
//             <input value={profile.soilType} onChange={onProfileChange('soilType')} placeholder={t('soilPlaceholder', 'Soil type (e.g., loam)')} style={styles.input} />
//             <input value={profile.irrigation} onChange={onProfileChange('irrigation')} placeholder={t('irrigationPlaceholder', 'Irrigation (drip/sprinkler/rainfed)')} style={styles.input} />
//             <input value={profile.pests} onChange={onProfileChange('pests')} placeholder={t('pestsPlaceholder', 'Known pests (e.g., fruit borer)')} style={styles.input} />
//             <input value={profile.language} onChange={onProfileChange('language')} placeholder={t('languagePlaceholder', 'Preferred language (e.g., hi, en)')} style={styles.input} />
//             <input value={profile.notes} onChange={onProfileChange('notes')} placeholder={t('notesPlaceholder', 'Notes (e.g., organic, last spray date)')} style={styles.inputFull} />
//             <div style={styles.row}>
//               <button type="button" onClick={saveProfile} disabled={profileSaving} style={styles.primaryBtn}>
//                 {profileSaving ? t('saving', 'Saving…') : t('update', 'Update')}
//               </button>
//               <button type="button" onClick={clearProfile} style={styles.clearBtn}>{t('clear', 'Clear')}</button>
//               {profileSaved && <span style={styles.saved}>{t('saved', 'Saved')}</span>}
//             </div>
//           </div>
//         )}
//       </section>

//       {/* Chat */}
//       <main style={styles.chat}>
//         {messages.map((m, i) => (
//           <div key={i} style={{ ...styles.bubble, ...(m.role === 'user' ? styles.user : styles.assistant) }}>
//             {m.text}
//           </div>
//         ))}
//         {loading && <div style={{ ...styles.bubble, ...styles.assistant }}>{t('thinking', 'Thinking…')}</div>}
//         <div ref={listEndRef} />
//       </main>

//       {error && <div style={styles.error}>{error}</div>}

//       <form onSubmit={ask} style={styles.inputRow}>
//         <input
//           style={styles.textInput}
//           placeholder={t('askPlaceholder', "e.g., अगले हफ्ते के तापमान से मेरी टमाटर फसल पर क्या असर पड़ेगा?")}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button style={styles.button} type="submit" disabled={loading}>
//           {t('ask', 'Ask')}
//         </button>
//       </form>

//       <footer style={styles.footer}>
//         {t('tips', 'Tips: Add crop, acreage, irrigation, soil type, and language in farmer details for better advice.')}
//       </footer>
//     </div>
//   )
// }

// const styles = {
//   container: { display: 'flex', flexDirection: 'column', height: '100vh', background: '#0b1726', color: '#e7eef7' },

//   // Profile panel
//   panel: { padding: '8px 16px', borderBottom: '1px solid #1f2b3b' },
//   panelHeader: { display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' },
//   panelToggle: { padding: '6px 10px', borderRadius: 6, border: '1px solid #1f2b3b', background: '#0f1b2d', color: '#e7eef7', cursor: 'pointer' },
//   chips: { color: '#9fb3d2', fontSize: 13 },
//   grid: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8, marginTop: 8 },
//   input: { padding: '10px 12px', borderRadius: 8, border: '1px solid #1f2b3b', background: '#0f1b2d', color: '#e7eef7' },
//   inputFull: { gridColumn: '1 / -1', padding: '10px 12px', borderRadius: 8, border: '1px solid #1f2b3b', background: '#0f1b2d', color: '#e7eef7' },
//   row: { gridColumn: '1 / -1', display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 },
//   primaryBtn: { padding: '8px 12px', borderRadius: 8, border: 'none', background: '#7aa2f7', color: '#0b1726', fontWeight: 700, cursor: 'pointer' },
//   clearBtn: { padding: '8px 12px', borderRadius: 8, border: '1px solid #ffb4a9', color: '#ffb4a9', background: 'transparent', cursor: 'pointer' },
//   saved: { color: '#9fb3d2' },

//   // Chat
//   chat: { flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 },
//   bubble: { maxWidth: '75%', padding: '10px 12px', borderRadius: 12, whiteSpace: 'pre-wrap', lineHeight: 1.4 },
//   user: { alignSelf: 'flex-end', background: '#244d8a' },
//   assistant: { alignSelf: 'flex-start', background: '#13233a' },

//   // Input row
//   inputRow: { display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #1f2b3b' },
//   textInput: { flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #1f2b3b', background: '#0f1b2d', color: '#e7eef7' },
//   button: { padding: '10px 16px', borderRadius: 8, border: 'none', background: '#7aa2f7', color: '#0b1726', fontWeight: 700, cursor: 'pointer' },

//   error: { color: '#ffb4a9', padding: '4px 16px' },
//   footer: { padding: '8px 16px', color: '#9fb3d2', fontSize: 12 },
// }

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import LanguagePrompt from "../components/LanguagePrompt.jsx";
import useLanguageSuggestion from "../hooks/useLanguageSuggestion.js";
import "./Chat.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export default function Chat() {
  const { t, i18n } = useTranslation();

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: t(
        "welcome",
        "Namaste! Ask any agriculture question in your language."
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listEndRef = useRef(null);
  const [location, setLocation] = useState(null);

  // Speech recognition state
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // Farmer profile UI state (frontend shape)
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState({
    crop: "",
    variety: "",
    acreage: "",
    soilType: "",
    irrigation: "",
    pests: "",
    language: "",
    notes: "",
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  // Scroll on new messages
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Get location once
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        (err) => {
          console.warn("Location access denied:", err.message);
        }
      );
    }
  }, []);

  // Load profile from server if logged in
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const { data } = await axios.post(
          `${API_BASE}/me`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile((p) => ({
          ...p,
          crop: data?.crops || "",
          acreage: data?.acreage || "",
          soilType: data?.soil_type || "",
          irrigation: data?.irrigation_method || "",
          notes: data?.custom_notes || "",
          variety: p.variety,
          pests: p.pests,
          language: p.language,
        }));
      } catch (e) {
        console.warn("Failed to load profile from server:", e?.message || e);
      }
    })();
  }, [token]);

  // Save profile to server (maps UI -> backend schema)
  const saveProfile = async () => {
    if (!token) {
      setError(t("loginRequired", "Login required to update farmer profile."));
      return;
    }
    setProfileSaving(true);
    setProfileSaved(false);
    setError("");
    try {
      const payload = {
        ...(profile.crop ? { crops: profile.crop } : {}),
        ...(profile.soilType ? { soil_type: profile.soilType } : {}),
        ...(profile.irrigation
          ? { irrigation_method: profile.irrigation }
          : {}),
        ...(profile.acreage ? { acreage: profile.acreage } : {}),
        ...(profile.notes ? { custom_notes: profile.notes } : {}),
        ...(profile.language ? { language: profile.language } : {}),
      };
      const { data } = await axios.post(`${API_BASE}/me`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile((p) => ({
        ...p,
        crop: data?.crops || "",
        acreage: data?.acreage || "",
        soilType: data?.soil_type || "",
        irrigation: data?.irrigation_method || "",
        notes: data?.custom_notes || "",
      }));
      setProfileSaved(true);
    } catch (e) {
      setError(
        e?.response?.data?.detail ||
          e.message ||
          t("updateFailed", "Failed to update profile")
      );
    } finally {
      setProfileSaving(false);
    }
  };

  // Chat ask
  const ask = async (e) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setError("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);
    try {
      const farmerProfile = Object.fromEntries(
        Object.entries({
          crop: profile.crop,
          variety: profile.variety,
          acreage: profile.acreage,
          soilType: profile.soilType,
          irrigation: profile.irrigation,
          pests: profile.pests,
          language: profile.language || i18n.language,
          notes: profile.notes,
        }).filter(([, v]) => v !== "" && v != null)
      );

      const res = await axios.post(
        `${API_BASE}/ask`,
        { question: q, location, farmerProfile },
        {
          timeout: 60000,
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );
      const ans = res?.data?.answer ?? t("noAnswer", "No answer received.");
      setMessages((m) => [...m, { role: "assistant", text: ans }]);
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err.message ||
        t("requestFailed", "Request failed");
      setError(msg);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: t("sorryCouldNotProcess", "Sorry, I couldn’t process that."),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onProfileChange = (key) => (e) => {
    setProfile((p) => ({ ...p, [key]: e.target.value }));
    setProfileSaved(false);
  };

  const summaryChips = () => {
    const chips = [];
    if (profile.crop) chips.push(profile.crop);
    if (profile.acreage) chips.push(profile.acreage);
    if (profile.irrigation) chips.push(profile.irrigation);
    if (profile.soilType) chips.push(profile.soilType);
    return chips.join(" • ");
  };

  const clearProfile = () => {
    setProfile({
      crop: "",
      variety: "",
      acreage: "",
      soilType: "",
      irrigation: "",
      pests: "",
      language: "",
      notes: "",
    });
    setProfileSaved(false);
  };

  // Language suggestion logic
  const profileLang = profile.language || null;
  const { suggested, accept, reject } = useLanguageSuggestion({
    location,
    profileLang,
  });

  const onAcceptLanguage = async () => {
    const lng = suggested;
    accept(lng);
    setProfile((p) => ({ ...p, language: lng }));
    if (token) {
      try {
        await axios.post(
          `${API_BASE}/me`,
          { language: lng },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {
        // non-blocking
      }
    }
  };

  const startListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError(
        t(
          "speechNotSupported",
          "Speech recognition not supported in this browser."
        )
      );
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = profile.language || i18n.language || "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (event) => {
      setError(event.error || t("speechError", "Speech recognition error"));
      setListening(false);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div style={styles.container}>
      {/* Language popup */}
      {suggested && (
        <LanguagePrompt
          suggested={suggested}
          onAccept={onAcceptLanguage}
          onReject={reject}
        />
      )}

      {/* Profile panel */}
      <section style={styles.panel}>
        <div style={styles.panelHeader}>
          <button
            style={styles.panelToggle}
            onClick={() => setProfileOpen((s) => !s)}
          >
            {profileOpen ? t("hideDetails", "Hide") : t("showDetails", "Show")}{" "}
            {t("farmerDetails", "farmer details")}
          </button>
          {!profileOpen && (
            <span style={styles.chips}>
              {summaryChips() ||
                t("addDetails", "Add details for better advice")}
            </span>
          )}
        </div>

        {profileOpen && (
          <div style={styles.grid}>
            <input
              className="chat-input"
              value={profile.crop}
              onChange={onProfileChange("crop")}
              placeholder={t("cropPlaceholder", "Crop (e.g., Tomato)")}
              style={styles.input}
            />
            <input
              className="chat-input"
              value={profile.variety}
              onChange={onProfileChange("variety")}
              placeholder={t("varietyPlaceholder", "Variety (e.g., Pusa Ruby)")}
              style={styles.input}
            />
            <input
              className="chat-input"
              value={profile.acreage}
              onChange={onProfileChange("acreage")}
              placeholder={t("acreagePlaceholder", "Acreage (e.g., 2 acres)")}
              style={styles.input}
            />
            <input
              className="chat-input"
              value={profile.soilType}
              onChange={onProfileChange("soilType")}
              placeholder={t("soilPlaceholder", "Soil type (e.g., loam)")}
              style={styles.input}
            />
            <input
              className="chat-input"
              value={profile.irrigation}
              onChange={onProfileChange("irrigation")}
              placeholder={t(
                "irrigationPlaceholder",
                "Irrigation (drip/sprinkler/rainfed)"
              )}
              style={styles.input}
            />
            <input
              className="chat-input"
              value={profile.pests}
              onChange={onProfileChange("pests")}
              placeholder={t(
                "pestsPlaceholder",
                "Known pests (e.g., fruit borer)"
              )}
              style={styles.input}
            />
            <input
              className="chat-input"
              value={profile.language}
              onChange={onProfileChange("language")}
              placeholder={t(
                "languagePlaceholder",
                "Preferred language (e.g., hi, en)"
              )}
              style={styles.input}
            />
            <input
              className="chat-input"
              value={profile.notes}
              onChange={onProfileChange("notes")}
              placeholder={t(
                "notesPlaceholder",
                "Notes (e.g., organic, last spray date)"
              )}
              style={styles.inputFull}
            />
            <div style={styles.row}>
              <button
                type="button"
                onClick={saveProfile}
                disabled={profileSaving}
                style={styles.primaryBtn}
              >
                {profileSaving ? t("saving", "Saving…") : t("update", "Update")}
              </button>
              <button
                type="button"
                onClick={clearProfile}
                style={styles.clearBtn}
              >
                {t("clear", "Clear")}
              </button>
              {profileSaved && (
                <span style={styles.saved}>{t("saved", "Saved")}</span>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Chat */}
      <main style={styles.chat}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.bubble,
              ...(m.role === "user" ? styles.user : styles.assistant),
            }}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.bubble, ...styles.assistant }}>
            {t("thinking", "Thinking…")}
          </div>
        )}
        <div ref={listEndRef} />
      </main>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={ask} style={styles.inputRow}>
        <input
          className="chat-input"
          style={styles.textInput}
          placeholder={t(
            "askPlaceholder",
            "e.g., अगले हफ्ते के तापमान से मेरी टमाटर फसल पर क्या असर पड़ेगा?"
          )}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="button"
          onClick={startListening}
          style={{
            ...styles.micButton,
            background: listening ? "#ffb4a9" : "#7aa2f7",
            color: listening ? "#0b1726" : "#0b1726",
          }}
          disabled={loading}
          aria-label={
            listening
              ? t("stopListening", "Stop listening")
              : t("speak", "Speak")
          }
        >
          {listening ? "🔴" : "🎤"}
        </button>
        <button style={styles.button} type="submit" disabled={loading}>
          {t("ask", "Ask")}
        </button>
        {listening && (
          <span style={{ color: "#ffb4a9", marginLeft: 8 }}>
            {t("listening", "Listening…")}
          </span>
        )}
      </form>

      <footer style={styles.footer}>
        {t(
          "tips",
          "Tips: Add crop, acreage, irrigation, soil type, and language in farmer details for better advice."
        )}
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "#0b1726",
    color: "#e7eef7",
  },

  // Profile panel
  panel: { padding: "8px 16px", borderBottom: "1px solid #1f2b3b" },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
  },
  panelToggle: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #1f2b3b",
    background: "#0f1b2d",
    color: "#e7eef7",
    cursor: "pointer",
  },
  chips: { color: "#9fb3d2", fontSize: 13 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 8,
    marginTop: 8,
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
  row: {
    gridColumn: "1 / -1",
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginTop: 4,
  },
  primaryBtn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: "#7aa2f7",
    color: "#0b1726",
    fontWeight: 700,
    cursor: "pointer",
  },
  clearBtn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #ffb4a9",
    color: "#ffb4a9",
    background: "transparent",
    cursor: "pointer",
  },
  saved: { color: "#9fb3d2" },

  // Chat
  chat: {
    flex: 1,
    overflowY: "auto",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  bubble: {
    maxWidth: "75%",
    padding: "10px 12px",
    borderRadius: 12,
    whiteSpace: "pre-wrap",
    lineHeight: 1.4,
  },
  user: { alignSelf: "flex-end", background: "#244d8a" },
  assistant: { alignSelf: "flex-start", background: "#13233a" },

  // Input row
  inputRow: {
    display: "flex",
    gap: 8,
    padding: 12,
    borderTop: "1px solid #1f2b3b",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #1f2b3b",
    background: "#0f1b2d",
    color: "#e7eef7",
  },
  button: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#7aa2f7",
    color: "#0b1726",
    fontWeight: 700,
    cursor: "pointer",
  },
  micButton: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 20,
    transition: "background 0.2s",
  },

  error: { color: "#ffb4a9", padding: "4px 16px" },
  footer: { padding: "8px 16px", color: "#9fb3d2", fontSize: 12 },
};
