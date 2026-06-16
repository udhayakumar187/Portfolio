"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { isThemeId, themes, type ThemeConfig, type ThemeId } from "@/data/themes";
import { SeasonPortalTransition } from "@/components/transitions/SeasonPortalTransition";
import { ThemeSelector } from "@/components/ThemeSelector";
import {
  createThemeTransition,
  transitionCommitDelay,
  transitionEndDelay,
  type ActiveThemeTransition
} from "@/lib/themeTransition";

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeTransition, setActiveTransition] = useState<ActiveThemeTransition | null>(null);
  const transitionTimersRef = useRef<number[]>([]);
  const suppressQuerySyncRef = useRef(false);

  const clearTransitionTimers = useCallback(() => {
    transitionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    transitionTimersRef.current = [];
  }, []);

  const setThemeQuery = useCallback((nextThemeId: ThemeId) => {
    suppressQuerySyncRef.current = true;
    updateThemeQuery(nextThemeId);
    suppressQuerySyncRef.current = false;
  }, []);

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
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setPrefersReducedMotion(motionQuery.matches);

    syncMotion();
    motionQuery.addEventListener("change", syncMotion);

    return () => motionQuery.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    return () => clearTransitionTimers();
  }, [clearTransitionTimers]);

  useEffect(() => {
    const syncThemeFromQuery = () => {
      const queryTheme = new URLSearchParams(window.location.search).get("theme");

      if (!isThemeId(queryTheme)) {
        return;
      }

      clearTransitionTimers();
      setActiveTransition(null);
      setThemeId((currentThemeId) => (currentThemeId === queryTheme ? currentThemeId : queryTheme));
      setHasSelectedTheme(true);
      window.localStorage.setItem(STORAGE_KEY, queryTheme);
    };
    let querySyncFrame = 0;

    const scheduleThemeSyncFromQuery = () => {
      if (suppressQuerySyncRef.current) {
        return;
      }

      if (querySyncFrame) {
        window.cancelAnimationFrame(querySyncFrame);
      }

      querySyncFrame = window.requestAnimationFrame(() => {
        querySyncFrame = 0;
        syncThemeFromQuery();
      });
    };

    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = (...args) => {
      originalPushState(...args);
      scheduleThemeSyncFromQuery();
    };

    window.history.replaceState = (...args) => {
      originalReplaceState(...args);
      scheduleThemeSyncFromQuery();
    };

    window.addEventListener("popstate", scheduleThemeSyncFromQuery);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", scheduleThemeSyncFromQuery);

      if (querySyncFrame) {
        window.cancelAnimationFrame(querySyncFrame);
      }
    };
  }, [clearTransitionTimers]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = themeId;

    Object.entries(themes[themeId].cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [themeId]);

  const selectTheme = useCallback((nextThemeId: ThemeId) => {
    clearTransitionTimers();
    setHasSelectedTheme(true);
    setIsSelectorOpen(false);

    if (nextThemeId === themeId) {
      window.localStorage.setItem(STORAGE_KEY, nextThemeId);
      setThemeQuery(nextThemeId);
      setActiveTransition(null);
      return;
    }

    const nextTransition = createThemeTransition(themeId, nextThemeId);
    setActiveTransition(nextTransition);

    const commitTimer = window.setTimeout(() => {
      setThemeId(nextThemeId);
      window.localStorage.setItem(STORAGE_KEY, nextThemeId);
      setThemeQuery(nextThemeId);
    }, transitionCommitDelay(nextTransition.durationMs, prefersReducedMotion));

    const endTimer = window.setTimeout(() => {
      setActiveTransition(null);
    }, transitionEndDelay(nextTransition.durationMs, prefersReducedMotion));

    transitionTimersRef.current = [commitTimer, endTimer];
  }, [clearTransitionTimers, prefersReducedMotion, setThemeQuery, themeId]);

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
      <SeasonPortalTransition transition={activeTransition} />
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
