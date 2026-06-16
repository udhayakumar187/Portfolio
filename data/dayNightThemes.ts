import type { ThemeId } from "@/data/themes";

export type DayNightPhase = "night" | "dawn" | "morning" | "goldenHour" | "cosmic" | "sunrise";

export type DayNightStop = {
  sky: string;
  fog: string;
  ambient: string;
  directional: string;
  glow: string;
  sun: string;
  ambientIntensity: number;
  directionalIntensity: number;
  constellationOpacity: number;
};

export type DayNightPalette = Record<DayNightPhase, DayNightStop>;

export const dayNightOrder: DayNightPhase[] = ["night", "dawn", "morning", "goldenHour", "cosmic", "sunrise"];

export const dayNightThemes: Record<ThemeId, DayNightPalette> = {
  winter: {
    night: {
      sky: "#050d1d",
      fog: "#061429",
      ambient: "#83bdf8",
      directional: "#b7e8ff",
      glow: "#67e8f9",
      sun: "#dff8ff",
      ambientIntensity: 0.32,
      directionalIntensity: 0.55,
      constellationOpacity: 0.95
    },
    dawn: {
      sky: "#15162e",
      fog: "#152241",
      ambient: "#c4b5fd",
      directional: "#e9d5ff",
      glow: "#a78bfa",
      sun: "#f5e8ff",
      ambientIntensity: 0.42,
      directionalIntensity: 0.78,
      constellationOpacity: 0.68
    },
    morning: {
      sky: "#10243a",
      fog: "#173452",
      ambient: "#bfdbfe",
      directional: "#eff6ff",
      glow: "#93c5fd",
      sun: "#ffffff",
      ambientIntensity: 0.58,
      directionalIntensity: 1.18,
      constellationOpacity: 0.28
    },
    goldenHour: {
      sky: "#172338",
      fog: "#263144",
      ambient: "#dbeafe",
      directional: "#fed7aa",
      glow: "#f6b85c",
      sun: "#ffdca7",
      ambientIntensity: 0.54,
      directionalIntensity: 1.3,
      constellationOpacity: 0.22
    },
    cosmic: {
      sky: "#071027",
      fog: "#0a1734",
      ambient: "#a5f3fc",
      directional: "#c4b5fd",
      glow: "#8b5cf6",
      sun: "#67e8f9",
      ambientIntensity: 0.5,
      directionalIntensity: 0.92,
      constellationOpacity: 1
    },
    sunrise: {
      sky: "#15213a",
      fog: "#22334c",
      ambient: "#c7d2fe",
      directional: "#fde68a",
      glow: "#fbbf24",
      sun: "#fff1c2",
      ambientIntensity: 0.6,
      directionalIntensity: 1.42,
      constellationOpacity: 0.44
    }
  },
  desert: {
    night: {
      sky: "#140b20",
      fog: "#1e1024",
      ambient: "#c4b5fd",
      directional: "#f8d09f",
      glow: "#c084fc",
      sun: "#f5d0fe",
      ambientIntensity: 0.3,
      directionalIntensity: 0.5,
      constellationOpacity: 0.9
    },
    dawn: {
      sky: "#2b140f",
      fog: "#3b2113",
      ambient: "#fed7aa",
      directional: "#fb923c",
      glow: "#f97316",
      sun: "#ffedd5",
      ambientIntensity: 0.44,
      directionalIntensity: 0.92,
      constellationOpacity: 0.54
    },
    morning: {
      sky: "#392312",
      fog: "#4a2f18",
      ambient: "#fde68a",
      directional: "#fbbf24",
      glow: "#f59e0b",
      sun: "#fff7cc",
      ambientIntensity: 0.62,
      directionalIntensity: 1.28,
      constellationOpacity: 0.18
    },
    goldenHour: {
      sky: "#3f1d0f",
      fog: "#5a2f18",
      ambient: "#fdba74",
      directional: "#f97316",
      glow: "#ff9f3f",
      sun: "#fed7aa",
      ambientIntensity: 0.58,
      directionalIntensity: 1.52,
      constellationOpacity: 0.16
    },
    cosmic: {
      sky: "#190c25",
      fog: "#241036",
      ambient: "#ddd6fe",
      directional: "#fbbf24",
      glow: "#a855f7",
      sun: "#fde68a",
      ambientIntensity: 0.5,
      directionalIntensity: 1,
      constellationOpacity: 1
    },
    sunrise: {
      sky: "#32180f",
      fog: "#4a2514",
      ambient: "#fed7aa",
      directional: "#fde68a",
      glow: "#facc15",
      sun: "#fff4bd",
      ambientIntensity: 0.64,
      directionalIntensity: 1.45,
      constellationOpacity: 0.34
    }
  },
  woods: {
    night: {
      sky: "#03120f",
      fog: "#061813",
      ambient: "#86efac",
      directional: "#93c5fd",
      glow: "#34d399",
      sun: "#bbf7d0",
      ambientIntensity: 0.28,
      directionalIntensity: 0.52,
      constellationOpacity: 0.82
    },
    dawn: {
      sky: "#08211b",
      fog: "#0c2b22",
      ambient: "#99f6e4",
      directional: "#a7f3d0",
      glow: "#14b8a6",
      sun: "#ccfbf1",
      ambientIntensity: 0.42,
      directionalIntensity: 0.86,
      constellationOpacity: 0.52
    },
    morning: {
      sky: "#0c281c",
      fog: "#133b26",
      ambient: "#bbf7d0",
      directional: "#dcfce7",
      glow: "#4ade80",
      sun: "#f0fdf4",
      ambientIntensity: 0.62,
      directionalIntensity: 1.18,
      constellationOpacity: 0.2
    },
    goldenHour: {
      sky: "#172814",
      fog: "#26381d",
      ambient: "#bef264",
      directional: "#fbbf24",
      glow: "#f5b45f",
      sun: "#fde68a",
      ambientIntensity: 0.56,
      directionalIntensity: 1.3,
      constellationOpacity: 0.18
    },
    cosmic: {
      sky: "#041614",
      fog: "#06211f",
      ambient: "#5eead4",
      directional: "#7dd3fc",
      glow: "#22c55e",
      sun: "#99f6e4",
      ambientIntensity: 0.5,
      directionalIntensity: 0.96,
      constellationOpacity: 0.92
    },
    sunrise: {
      sky: "#142614",
      fog: "#23391f",
      ambient: "#bbf7d0",
      directional: "#fde68a",
      glow: "#facc15",
      sun: "#fef3c7",
      ambientIntensity: 0.64,
      directionalIntensity: 1.42,
      constellationOpacity: 0.34
    }
  },
  ocean: {
    night: {
      sky: "#031326",
      fog: "#041b2f",
      ambient: "#7dd3fc",
      directional: "#a5f3fc",
      glow: "#22d3ee",
      sun: "#cffafe",
      ambientIntensity: 0.32,
      directionalIntensity: 0.58,
      constellationOpacity: 0.86
    },
    dawn: {
      sky: "#092533",
      fog: "#0c3444",
      ambient: "#99f6e4",
      directional: "#5eead4",
      glow: "#2dd4bf",
      sun: "#ccfbf1",
      ambientIntensity: 0.44,
      directionalIntensity: 0.9,
      constellationOpacity: 0.5
    },
    morning: {
      sky: "#0b3353",
      fog: "#0e4b65",
      ambient: "#bae6fd",
      directional: "#e0f2fe",
      glow: "#38bdf8",
      sun: "#f0f9ff",
      ambientIntensity: 0.64,
      directionalIntensity: 1.22,
      constellationOpacity: 0.2
    },
    goldenHour: {
      sky: "#15324a",
      fog: "#20475a",
      ambient: "#bae6fd",
      directional: "#fb923c",
      glow: "#f97316",
      sun: "#fed7aa",
      ambientIntensity: 0.58,
      directionalIntensity: 1.36,
      constellationOpacity: 0.18
    },
    cosmic: {
      sky: "#04182c",
      fog: "#06213a",
      ambient: "#67e8f9",
      directional: "#5eead4",
      glow: "#06b6d4",
      sun: "#a5f3fc",
      ambientIntensity: 0.5,
      directionalIntensity: 1,
      constellationOpacity: 0.96
    },
    sunrise: {
      sky: "#14304a",
      fog: "#1f4458",
      ambient: "#a5f3fc",
      directional: "#fde68a",
      glow: "#fbbf24",
      sun: "#fff7cc",
      ambientIntensity: 0.66,
      directionalIntensity: 1.42,
      constellationOpacity: 0.32
    }
  },
  spring: {
    night: {
      sky: "#160d26",
      fog: "#211431",
      ambient: "#f0abfc",
      directional: "#bfdbfe",
      glow: "#f9a8d4",
      sun: "#fce7f3",
      ambientIntensity: 0.3,
      directionalIntensity: 0.55,
      constellationOpacity: 0.84
    },
    dawn: {
      sky: "#2a1830",
      fog: "#3b2239",
      ambient: "#fbcfe8",
      directional: "#fde68a",
      glow: "#fb7185",
      sun: "#fff1c2",
      ambientIntensity: 0.46,
      directionalIntensity: 0.9,
      constellationOpacity: 0.48
    },
    morning: {
      sky: "#1e2e24",
      fog: "#31412b",
      ambient: "#bbf7d0",
      directional: "#fdf2f8",
      glow: "#86efac",
      sun: "#fff7ed",
      ambientIntensity: 0.62,
      directionalIntensity: 1.2,
      constellationOpacity: 0.18
    },
    goldenHour: {
      sky: "#332621",
      fog: "#49352d",
      ambient: "#fbcfe8",
      directional: "#fbbf24",
      glow: "#f59e0b",
      sun: "#fde68a",
      ambientIntensity: 0.58,
      directionalIntensity: 1.36,
      constellationOpacity: 0.16
    },
    cosmic: {
      sky: "#160d27",
      fog: "#261638",
      ambient: "#f0abfc",
      directional: "#67e8f9",
      glow: "#c084fc",
      sun: "#f9a8d4",
      ambientIntensity: 0.52,
      directionalIntensity: 1,
      constellationOpacity: 0.96
    },
    sunrise: {
      sky: "#30251f",
      fog: "#46362d",
      ambient: "#fbcfe8",
      directional: "#fde68a",
      glow: "#facc15",
      sun: "#fff4bd",
      ambientIntensity: 0.66,
      directionalIntensity: 1.42,
      constellationOpacity: 0.34
    }
  }
};
