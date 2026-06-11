export type ThemeId = "winter" | "desert" | "woods" | "ocean" | "spring";

export type EnvironmentType = "winter" | "desert" | "woods" | "ocean" | "spring";
export type TravelMode = "walk" | "camel" | "boat" | "bicycle";
export type ParticleType = "snow" | "dust" | "fireflies" | "mist" | "petals";

export type ThemeConfig = {
  id: ThemeId;
  name: string;
  description: string;
  previewClass: string;
  environmentType: EnvironmentType;
  travelMode: TravelMode;
  cssVars: Record<string, string>;
  scene: {
    background: string;
    fog: string;
    ambient: string;
    directional: string;
    accent: string;
    secondary: string;
    terrain: string;
    terrainOverlay: string;
    pathBase: string;
    pathGlow: string;
    pathCore: string;
    mountainA: string;
    mountainB: string;
    mountainCap: string;
    treeTrunk: string;
    treeBase: string;
    treeLayer: string;
    treeCap: string;
    particle: ParticleType;
    particleColor: string;
    particleEmissive?: string;
    campBase: string;
    campLight: string;
  };
};

export const themeOrder: ThemeId[] = ["winter", "desert", "woods", "ocean", "spring"];

export const themes: Record<ThemeId, ThemeConfig> = {
  winter: {
    id: "winter",
    name: "Winter",
    description: "A snowy night journey through calm forests and icy mountains.",
    previewClass: "theme-preview-winter",
    environmentType: "winter",
    travelMode: "walk",
    cssVars: {
      "--background": "#020711",
      "--foreground": "#f4fbff",
      "--muted": "#a7b9c9",
      "--panel": "rgba(8, 18, 30, 0.76)",
      "--panel-strong": "rgba(10, 24, 38, 0.92)",
      "--line": "rgba(184, 226, 244, 0.24)",
      "--cyan": "#8eeaff",
      "--violet": "#a78bfa",
      "--mint": "#9ff3d5",
      "--ice": "#e7faff",
      "--ember": "#f6b85c",
      "--theme-bg-a": "rgba(142, 234, 255, 0.15)",
      "--theme-bg-b": "rgba(167, 139, 250, 0.13)",
      "--theme-bg-c": "rgba(159, 243, 213, 0.09)",
      "--theme-body-gradient": "linear-gradient(142deg, #020711 0%, #071625 39%, #10221d 72%, #020711 100%)"
    },
    scene: {
      background: "#07101f",
      fog: "#07101f",
      ambient: "#b8d9ff",
      directional: "#dff4ff",
      accent: "#7dd3fc",
      secondary: "#a78bfa",
      terrain: "#d9effa",
      terrainOverlay: "#86a9bf",
      pathBase: "#d1f5ff",
      pathGlow: "#aae8ff",
      pathCore: "#dff8ff",
      mountainA: "#0e1b34",
      mountainB: "#12223f",
      mountainCap: "#edf8ff",
      treeTrunk: "#2a211e",
      treeBase: "#0d2b31",
      treeLayer: "#123b42",
      treeCap: "#e7f8ff",
      particle: "snow",
      particleColor: "#f1fbff",
      campBase: "#d8f3ff",
      campLight: "#ffae62"
    }
  },
  desert: {
    id: "desert",
    name: "Desert",
    description: "A warm cinematic path through dunes, rocks, and golden light.",
    previewClass: "theme-preview-desert",
    environmentType: "desert",
    travelMode: "camel",
    cssVars: {
      "--background": "#100805",
      "--foreground": "#fff8ec",
      "--muted": "#d8b98f",
      "--panel": "rgba(36, 20, 12, 0.76)",
      "--panel-strong": "rgba(45, 24, 12, 0.92)",
      "--line": "rgba(255, 203, 129, 0.26)",
      "--cyan": "#f7b955",
      "--violet": "#c084fc",
      "--mint": "#ffd88a",
      "--ice": "#fff1c7",
      "--ember": "#ff9f3f",
      "--theme-bg-a": "rgba(247, 185, 85, 0.17)",
      "--theme-bg-b": "rgba(192, 132, 252, 0.12)",
      "--theme-bg-c": "rgba(255, 159, 63, 0.13)",
      "--theme-body-gradient": "linear-gradient(142deg, #100805 0%, #2a160d 42%, #3a2418 72%, #100805 100%)"
    },
    scene: {
      background: "#231008",
      fog: "#2d190f",
      ambient: "#ffd99b",
      directional: "#ffbd6a",
      accent: "#f59e0b",
      secondary: "#c084fc",
      terrain: "#d69a4e",
      terrainOverlay: "#9f6332",
      pathBase: "#ffd78c",
      pathGlow: "#ffb048",
      pathCore: "#ffe3a2",
      mountainA: "#6b3a1e",
      mountainB: "#7c4a28",
      mountainCap: "#c78349",
      treeTrunk: "#5a351f",
      treeBase: "#6b7a32",
      treeLayer: "#7f8a3a",
      treeCap: "#d7a151",
      particle: "dust",
      particleColor: "#ffd89a",
      campBase: "#b46e36",
      campLight: "#ffb45c"
    }
  },
  woods: {
    id: "woods",
    name: "Woods",
    description: "A green mountain trail surrounded by forests and quiet energy.",
    previewClass: "theme-preview-woods",
    environmentType: "woods",
    travelMode: "walk",
    cssVars: {
      "--background": "#03100c",
      "--foreground": "#f2fff7",
      "--muted": "#a9c8b8",
      "--panel": "rgba(7, 28, 22, 0.76)",
      "--panel-strong": "rgba(8, 34, 27, 0.92)",
      "--line": "rgba(133, 239, 172, 0.24)",
      "--cyan": "#6ee7b7",
      "--violet": "#7dd3fc",
      "--mint": "#a7f3d0",
      "--ice": "#e5fff2",
      "--ember": "#f5b45f",
      "--theme-bg-a": "rgba(110, 231, 183, 0.15)",
      "--theme-bg-b": "rgba(125, 211, 252, 0.12)",
      "--theme-bg-c": "rgba(167, 243, 208, 0.1)",
      "--theme-body-gradient": "linear-gradient(142deg, #03100c 0%, #0a211b 42%, #112b21 72%, #03100c 100%)"
    },
    scene: {
      background: "#061811",
      fog: "#092016",
      ambient: "#b7f4cf",
      directional: "#c8facc",
      accent: "#34d399",
      secondary: "#7dd3fc",
      terrain: "#315f3c",
      terrainOverlay: "#13381f",
      pathBase: "#bdf4cf",
      pathGlow: "#4ade80",
      pathCore: "#d8ffe2",
      mountainA: "#173625",
      mountainB: "#20452d",
      mountainCap: "#79b77f",
      treeTrunk: "#2a2118",
      treeBase: "#0f3b28",
      treeLayer: "#155a38",
      treeCap: "#6ac47e",
      particle: "fireflies",
      particleColor: "#d9ff8f",
      particleEmissive: "#d9ff8f",
      campBase: "#244c32",
      campLight: "#ffc56c"
    }
  },
  ocean: {
    id: "ocean",
    name: "Ocean",
    description: "A coastal journey with waves, wind, and deep blue horizons.",
    previewClass: "theme-preview-ocean",
    environmentType: "ocean",
    travelMode: "boat",
    cssVars: {
      "--background": "#02101d",
      "--foreground": "#f1fbff",
      "--muted": "#9fc4d6",
      "--panel": "rgba(5, 25, 42, 0.76)",
      "--panel-strong": "rgba(6, 32, 52, 0.92)",
      "--line": "rgba(103, 232, 249, 0.25)",
      "--cyan": "#67e8f9",
      "--violet": "#38bdf8",
      "--mint": "#5eead4",
      "--ice": "#dffcff",
      "--ember": "#f6c177",
      "--theme-bg-a": "rgba(103, 232, 249, 0.15)",
      "--theme-bg-b": "rgba(56, 189, 248, 0.13)",
      "--theme-bg-c": "rgba(94, 234, 212, 0.1)",
      "--theme-body-gradient": "linear-gradient(142deg, #02101d 0%, #08233b 42%, #063038 72%, #02101d 100%)"
    },
    scene: {
      background: "#041827",
      fog: "#05283a",
      ambient: "#b9f4ff",
      directional: "#bdefff",
      accent: "#22d3ee",
      secondary: "#38bdf8",
      terrain: "#1d9bb0",
      terrainOverlay: "#0f4960",
      pathBase: "#bcf5ff",
      pathGlow: "#2dd4bf",
      pathCore: "#dcfbff",
      mountainA: "#07324b",
      mountainB: "#0c4562",
      mountainCap: "#86d9e8",
      treeTrunk: "#164e63",
      treeBase: "#0f766e",
      treeLayer: "#14b8a6",
      treeCap: "#a7f3d0",
      particle: "mist",
      particleColor: "#c8fbff",
      campBase: "#3aa6b9",
      campLight: "#f7c873"
    }
  },
  spring: {
    id: "spring",
    name: "Spring",
    description: "A fresh path through blooming fields, petals, and soft sunrise.",
    previewClass: "theme-preview-spring",
    environmentType: "spring",
    travelMode: "bicycle",
    cssVars: {
      "--background": "#100712",
      "--foreground": "#fff8fb",
      "--muted": "#e3b7ca",
      "--panel": "rgba(38, 18, 34, 0.76)",
      "--panel-strong": "rgba(45, 20, 38, 0.92)",
      "--line": "rgba(251, 207, 232, 0.28)",
      "--cyan": "#f9a8d4",
      "--violet": "#facc15",
      "--mint": "#bbf7d0",
      "--ice": "#fff3f8",
      "--ember": "#f7b267",
      "--theme-bg-a": "rgba(249, 168, 212, 0.17)",
      "--theme-bg-b": "rgba(187, 247, 208, 0.12)",
      "--theme-bg-c": "rgba(250, 204, 21, 0.1)",
      "--theme-body-gradient": "linear-gradient(142deg, #100712 0%, #2a1327 42%, #21301e 72%, #100712 100%)"
    },
    scene: {
      background: "#1b1022",
      fog: "#2a1830",
      ambient: "#ffd6e8",
      directional: "#ffe7a8",
      accent: "#f9a8d4",
      secondary: "#bbf7d0",
      terrain: "#5d8b48",
      terrainOverlay: "#315c35",
      pathBase: "#ffe2ef",
      pathGlow: "#f9a8d4",
      pathCore: "#fff0f7",
      mountainA: "#372044",
      mountainB: "#2f4b2f",
      mountainCap: "#f7b7d8",
      treeTrunk: "#4a2c23",
      treeBase: "#4d7c44",
      treeLayer: "#68a85d",
      treeCap: "#f7a8cc",
      particle: "petals",
      particleColor: "#ffc4dd",
      campBase: "#6f8a46",
      campLight: "#ffd083"
    }
  }
};

export function isThemeId(value: string | null): value is ThemeId {
  return value === "winter" || value === "desert" || value === "woods" || value === "ocean" || value === "spring";
}
