import { createContext, useContext, useEffect, useState } from "react";
import { dict, type Lang, type Key } from "./i18n";

/* ---------------- Language ---------------- */

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string };
const LangContext = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("dt-lang") as Lang | null;
    if (saved === "en" || saved === "id") return saved;
    const browser = navigator.language.toLowerCase();
    return browser.startsWith("id") ? "id" : "en";
  });

  useEffect(() => {
    localStorage.setItem("dt-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (k: Key) => dict[lang][k] ?? dict.en[k] ?? k;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useT() {
  const c = useContext(LangContext);
  if (!c) throw new Error("LanguageProvider missing");
  return c;
}
