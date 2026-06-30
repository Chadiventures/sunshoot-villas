"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LANGUAGE_STORAGE_KEY,
  translations,
  type Language,
  type Translations,
  type VillaSlug,
} from "@/lib/translations";

function getVillaDescriptionFromTranslations(
  t: Translations,
  slug: string,
): string {
  const descriptions: Record<VillaSlug, string> = {
    mawar: t.villaMawarDescription,
    jepun: t.villaJepunDescription,
    anggrek: t.villaAnggrekDescription,
    sandat: t.villaSandatDescription,
  };
  return descriptions[slug as VillaSlug] ?? "";
}

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  getVillaDescription: (slug: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "id";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(stored)) {
      setLanguageState(stored);
      document.documentElement.lang = stored === "id" ? "id" : "en";
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang === "id" ? "id" : "en";
  }, []);

  const t = translations[language];

  const getVillaDescription = useCallback(
    (slug: string) => getVillaDescriptionFromTranslations(t, slug),
    [t],
  );

  const value = useMemo(
    () => ({ language, setLanguage, t, getVillaDescription }),
    [language, setLanguage, t, getVillaDescription],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
