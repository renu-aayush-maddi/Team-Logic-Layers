// src/hooks/useLanguageSuggestion.js
import { useEffect, useState } from 'react'
import axios from 'axios'
import i18n from '../i18n'

const SUPPORTED = ['en','hi','ta','te','kn','ml','bn','mr','gu','pa','ur','or','as','ks','mai']

const normalizeLang = (locale) => (locale || 'en').toLowerCase().split('-')[0]

const stateToLangIN = (stateLower) => {
  if (!stateLower) return null
  if (stateLower.includes('tamil nadu')) return 'ta'
  if (stateLower.includes('karnataka')) return 'kn'
  if (stateLower.includes('kerala')) return 'ml'
  if (stateLower.includes('andhra pradesh') || stateLower.includes('telangana')) return 'te'
  if (stateLower.includes('maharashtra')) return 'mr'
  if (stateLower.includes('west bengal')) return 'bn'
  if (stateLower.includes('gujarat')) return 'gu'
  if (stateLower.includes('punjab')) return 'pa'
  if (stateLower.includes('odisha') || stateLower.includes('orissa')) return 'or'
  if (stateLower.includes('assam')) return 'as'
  if (stateLower.includes('jammu') || stateLower.includes('kashmir')) return 'ks'
  if (stateLower.includes('rajasthan') || stateLower.includes('haryana') || stateLower.includes('uttar pradesh') || stateLower.includes('madhya pradesh') || stateLower.includes('bihar')) return 'hi'
  return null
}

export default function useLanguageSuggestion({ location, profileLang }) {
  const [suggested, setSuggested] = useState(null)

  useEffect(() => {
    // If user already picked a language (profile/localStorage), do not override, but still suggest if different.
    if (profileLang && SUPPORTED.includes(profileLang) && i18n.language !== profileLang) {
      setSuggested(profileLang)
      return
    }
    const stored = localStorage.getItem('lang')
    if (stored && SUPPORTED.includes(stored) && i18n.language !== stored) {
      setSuggested(stored)
      return
    }

    const detect = async () => {
      // Start from browser language
      let candidate = normalizeLang(navigator.language)

      // If we have coordinates, refine using state-level mapping
      if (location?.lat && location?.lon) {
        try {
          const { data } = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lon}&format=json`
          )
          const country = data?.address?.country_code
          const stateLower = (data?.address?.state || '').toLowerCase()

          // India: map state -> regional language
          if (country === 'in') {
            const regional = stateToLangIN(stateLower)
            if (regional) candidate = regional
          }

          // Debug: see what we detected
          console.log('[lang-detect]', { country, stateLower, candidate })
        } catch (e) {
          console.warn('Reverse geocode failed:', e?.message || e)
        }
      }

      if (SUPPORTED.includes(candidate) && candidate !== i18n.language) {
        setSuggested(candidate) // This triggers your popup
      }
    }

    detect()
  }, [location, profileLang])

  const accept = (lng) => {
    const target = lng || suggested || 'en'
    i18n.changeLanguage(target)
    localStorage.setItem('lang', target)
    setSuggested(null)
  }

  const reject = () => setSuggested(null)

  return { suggested, accept, reject }
}
