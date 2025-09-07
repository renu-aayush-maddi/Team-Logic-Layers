// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

// Supported languages for your app
export const SUPPORTED_LANGS = [
  "en","hi","ta","te","kn","ml","bn","mr","gu","pa","ur","or","as","ks","mai"
];

i18n
  .use(HttpBackend)
  .use(LanguageDetector) // we will still control final switch via popup
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en", // force default as English at startup
    supportedLngs: SUPPORTED_LANGS,
    nonExplicitSupportedLngs: true,
    backend: {
      loadPath: "/locales/{{lng}}/translation.json"
    },
    detection: {
      // We won’t auto-switch; we only read browser language as a suggestion.
      // Keep detection but we won’t use it to set lng initially.
      order: ["querystring","cookie","localStorage","navigator"],
      caches: [] // do not auto-cache from detector; we persist manually after user confirms
    },
    interpolation: { escapeValue: false },
    returnEmptyString: false
  });

export default i18n;
