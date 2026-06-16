export const performanceConfig = {
  desktop: {
    maxTrailItems: 80,
    maxTrailParticles: 160,
    maxTerrainReactions: 52,
    maxCreatures: 18,
    enableCreatures: true,
    enableLivingTerrain: true
  },
  mobile: {
    maxTrailItems: 32,
    maxTrailParticles: 72,
    maxTerrainReactions: 22,
    maxCreatures: 8,
    enableCreatures: true,
    enableLivingTerrain: false
  },
  reducedMotion: {
    maxTrailItems: 10,
    maxTrailParticles: 0,
    maxTerrainReactions: 0,
    maxCreatures: 0,
    enableCreatures: false,
    enableLivingTerrain: false
  }
} as const;

export type PerformanceMode = keyof typeof performanceConfig;
