import type { ThemeConfig } from "@/data/themes";
import { SeasonalProps } from "@/components/seasonal/SeasonalProps";
import { SeasonalTerrain } from "@/components/seasonal/SeasonalTerrain";

type SeasonalEnvironmentProps = {
  theme: ThemeConfig;
  reducedMotion: boolean;
};

export function SeasonalEnvironment({ theme, reducedMotion }: SeasonalEnvironmentProps) {
  return (
    <>
      <SeasonalTerrain theme={theme} reducedMotion={reducedMotion} />
      <SeasonalProps theme={theme} />
    </>
  );
}
