import type { ThemeConfig } from "@/data/themes";
import type { MutableRefObject } from "react";
import { SeasonalProps } from "@/components/seasonal/SeasonalProps";
import { SeasonalTerrain } from "@/components/seasonal/SeasonalTerrain";

type SeasonalEnvironmentProps = {
  theme: ThemeConfig;
  reducedMotion: boolean;
  scrollVelocityRef?: MutableRefObject<number>;
};

export function SeasonalEnvironment({ theme, reducedMotion, scrollVelocityRef }: SeasonalEnvironmentProps) {
  return (
    <>
      <SeasonalTerrain theme={theme} reducedMotion={reducedMotion} scrollVelocityRef={scrollVelocityRef} />
      <SeasonalProps theme={theme} />
    </>
  );
}
