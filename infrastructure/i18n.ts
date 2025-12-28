"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "../infrastructure/lang/english/translations.json";
import spanish from "../infrastructure/lang/spanish/translations.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: english },
    es: { translation: spanish },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
