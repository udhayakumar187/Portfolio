import { AdventureCanvasMount } from "@/components/AdventureCanvasMount";
import { AIPortal } from "@/components/AIPortal";
import { ContactSummit } from "@/components/ContactSummit";
import { CursorGlow } from "@/components/CursorGlow";
import { MagicCursorLayer } from "@/components/cursor/MagicCursorLayer";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { HeroScene } from "@/components/HeroScene";
import { JourneyMiniMap } from "@/components/JourneyMiniMap";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MotionProvider } from "@/components/MotionProvider";
import { ProjectQuests } from "@/components/ProjectQuests";
import { SectionNav } from "@/components/SectionNav";
import { SkillsArtifacts } from "@/components/SkillsArtifacts";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <LoadingScreen />
        <CursorGlow />
        <MagicCursorLayer />
        <AdventureCanvasMount />
        <SectionNav />
        <JourneyMiniMap />
        <ThemeSwitcher />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <main id="main" className="relative z-10 overflow-hidden pb-24 xl:pb-0">
          <HeroScene />
          <ExperienceTimeline />
          <SkillsArtifacts />
          <ProjectQuests />
          <AIPortal />
          <ContactSummit />
        </main>
      </MotionProvider>
    </ThemeProvider>
  );
}
