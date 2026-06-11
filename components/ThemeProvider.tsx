"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isThemeId, themes, type ThemeConfig, type ThemeId } from "@/data/themes";
import { ThemeSelector } from "@/components/ThemeSelector";

const STORAGE_KEY = "ukm-journey-theme";

type ThemeContextValue = {
  theme: ThemeConfig;
  themeId: ThemeId;
  hasSelectedTheme: boolean;
  isSelectorOpen: boolean;
  selectTheme: (themeId: ThemeId) => void;
  openThemeSelector: () => void;
  closeThemeSelector: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function updateThemeQuery(themeId: ThemeId) {
  const url = new URL(window.location.href);
  url.searchParams.set("theme", themeId);
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>("winter");
  const [hasSelectedTheme, setHasSelectedTheme] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const queryTheme = params.get("theme");
      const storedTheme = window.localStorage.getItem(STORAGE_KEY);

      if (isThemeId(queryTheme)) {
        setThemeId(queryTheme);
        setHasSelectedTheme(true);
        window.localStorage.setItem(STORAGE_KEY, queryTheme);
      } else if (isThemeId(storedTheme)) {
        setThemeId(storedTheme);
        setHasSelectedTheme(true);
      } else {
        setThemeId("winter");
        setHasSelectedTheme(false);
        setIsSelectorOpen(true);
      }

      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const syncThemeFromQuery = () => {
      const queryTheme = new URLSearchParams(window.location.search).get("theme");

      if (!isThemeId(queryTheme)) {
        return;
      }

      setThemeId((currentThemeId) => (currentThemeId === queryTheme ? currentThemeId : queryTheme));
      setHasSelectedTheme(true);
      window.localStorage.setItem(STORAGE_KEY, queryTheme);
    };

    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = (...args) => {
      originalPushState(...args);
      syncThemeFromQuery();
    };

    window.history.replaceState = (...args) => {
      originalReplaceState(...args);
      syncThemeFromQuery();
    };

    window.addEventListener("popstate", syncThemeFromQuery);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", syncThemeFromQuery);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = themeId;

    Object.entries(themes[themeId].cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [themeId]);

  const selectTheme = useCallback((nextThemeId: ThemeId) => {
    setThemeId(nextThemeId);
    setHasSelectedTheme(true);
    setIsSelectorOpen(false);
    window.localStorage.setItem(STORAGE_KEY, nextThemeId);
    updateThemeQuery(nextThemeId);
  }, []);

  const openThemeSelector = useCallback(() => setIsSelectorOpen(true), []);
  const closeThemeSelector = useCallback(() => {
    if (hasSelectedTheme) {
      setIsSelectorOpen(false);
    }
  }, [hasSelectedTheme]);

  const value = useMemo(
    () => ({
      theme: themes[themeId],
      themeId,
      hasSelectedTheme,
      isSelectorOpen,
      selectTheme,
      openThemeSelector,
      closeThemeSelector
    }),
    [closeThemeSelector, hasSelectedTheme, isSelectorOpen, openThemeSelector, selectTheme, themeId]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {isReady ? (
        <ThemeSelector
          currentThemeId={themeId}
          open={isSelectorOpen || !hasSelectedTheme}
          canClose={hasSelectedTheme}
          onClose={closeThemeSelector}
          onSelect={selectTheme}
        />
      ) : null}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return value;
}
