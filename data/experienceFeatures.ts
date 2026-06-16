export const experienceFeatures = {
  enableTrailMemory: true,
  enableLivingTerrain: true,
  enableAmbientCreatures: true,
  enableTreasureMap: false,
  enableThemeGlobes: true,
  enableDayNightCycle: true,
  enableMagicCursor: true
} as const;

export type ExperienceFeatureKey = keyof typeof experienceFeatures;
