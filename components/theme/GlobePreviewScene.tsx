"use client";

import type { ThemeConfig } from "@/data/themes";

type GlobePreviewSceneProps = {
  theme: ThemeConfig;
};

export function GlobePreviewScene({ theme }: GlobePreviewSceneProps) {
  return (
    <div className={`globe-preview globe-preview--${theme.id}`} aria-hidden="true">
      <span className="globe-preview__sky" />
      <span className="globe-preview__horizon" />
      <span className="globe-preview__route" />
      <span className="globe-preview__object globe-preview__object--a" />
      <span className="globe-preview__object globe-preview__object--b" />
      <span className="globe-preview__object globe-preview__object--c" />
      <span className="globe-preview__particle globe-preview__particle--a" />
      <span className="globe-preview__particle globe-preview__particle--b" />
      <span className="globe-preview__particle globe-preview__particle--c" />
    </div>
  );
}
