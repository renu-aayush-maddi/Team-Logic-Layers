// src/lang/suggestLanguage.js
export const stateToLangIN = (stateLower) => {
  if (!stateLower) return null;
  if (stateLower.includes("tamil nadu")) return "ta";
  if (stateLower.includes("karnataka")) return "kn";
  if (stateLower.includes("kerala")) return "ml";
  if (stateLower.includes("andhra pradesh") || stateLower.includes("telangana")) return "te";
  if (stateLower.includes("maharashtra")) return "mr";
  if (stateLower.includes("west bengal")) return "bn";
  if (stateLower.includes("gujarat")) return "gu";
  if (stateLower.includes("punjab")) return "pa";
  if (stateLower.includes("rajasthan") || stateLower.includes("haryana") || stateLower.includes("uttar pradesh") || stateLower.includes("madhya pradesh") || stateLower.includes("bihar")) return "hi";
  if (stateLower.includes("odisha") || stateLower.includes("orissa")) return "or";
  if (stateLower.includes("assam")) return "as";
  if (stateLower.includes("jammu") || stateLower.includes("kashmir")) return "ks";
  if (stateLower.includes("bihar") && stateLower.includes("tirhut")) return "mai"; // example; refine as needed
  return null;
};

export const normalizeLang = (locale) => (locale || "en").toLowerCase().split("-")[0];
