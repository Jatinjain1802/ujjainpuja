import React, { createContext, useEffect, useMemo, useState } from "react";
import en from "./locales/en.json";
import hi from "./locales/hi.json";

export const LocaleContext = createContext({
  locale: "hi",
  setLocale: () => {},
  messages: hi,
});

const localeMap = { en, hi };
const defaultLocale = "hi";

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    try {
      return localStorage.getItem("locale") || defaultLocale;
    } catch (error) {
      return defaultLocale;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch (error) {
      // ignore storage errors in restricted environments
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, messages: localeMap[locale] || hi }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};
