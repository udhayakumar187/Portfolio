"use client";

import { useEffect, useState } from "react";

export function useMobileMode(query = "(max-width: 767px)") {
  const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const syncMobileMode = () => setMobileMode(mediaQuery.matches);

    syncMobileMode();
    mediaQuery.addEventListener("change", syncMobileMode);

    return () => mediaQuery.removeEventListener("change", syncMobileMode);
  }, [query]);

  return mobileMode;
}
