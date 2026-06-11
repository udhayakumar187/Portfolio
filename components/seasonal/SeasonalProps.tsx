import type { ThemeConfig } from "@/data/themes";
import { DesertProps } from "@/components/seasonal/props/DesertProps";
import { OceanProps } from "@/components/seasonal/props/OceanProps";
import { SpringProps } from "@/components/seasonal/props/SpringProps";
import { WinterProps } from "@/components/seasonal/props/WinterProps";
import { WoodsProps } from "@/components/seasonal/props/WoodsProps";

type SeasonalPropsProps = {
  theme: ThemeConfig;
};

export function SeasonalProps({ theme }: SeasonalPropsProps) {
  if (theme.environmentType === "desert") {
    return <DesertProps theme={theme} />;
  }

  if (theme.environmentType === "woods") {
    return <WoodsProps theme={theme} />;
  }

  if (theme.environmentType === "ocean") {
    return <OceanProps theme={theme} />;
  }

  if (theme.environmentType === "spring") {
    return <SpringProps theme={theme} />;
  }

  return <WinterProps theme={theme} />;
}
