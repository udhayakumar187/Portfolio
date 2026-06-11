# Engineering Journey Portfolio

A premium interactive Engineering Journey portfolio for Udhaya Kumar Mallikaarjunan, a Software Technologist focused on full-stack engineering, cloud-native healthcare platforms, distributed systems, and AI-assisted software engineering.

The portfolio concept is **Engineering Journey**: a lightweight procedural 3D scene where a GLB avatar travels along a career path while readable HTML content presents the experience, skills, projects, AI interests, and contact details. Visitors can choose the environment theme before entering the portfolio.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js
- React Three Fiber
- Drei

## Highlights

- First-load "Choose Your Journey" theme selector with Winter, Desert, Woods, Ocean, and Spring
- Full-bleed procedural 3D journey scene with theme-driven terrain, particles, trees/props, lighting, path, campfire, and checkpoints
- Seasonal particles built with Three.js points, reduced on mobile and disabled for reduced-motion users
- Scroll-linked character movement and camera tracking
- Career checkpoints for Virtusa, Carelon, Philips, and AI Future
- HTML experience cards with accessible detail drawers, Escape close, focus handling, and body scroll lock
- Mobile-only compact journey dots; the desktop SVG mini-map and labels are intentionally removed
- Skills presented as frosted crystal artifacts
- Expedition-style quest cards for featured work
- Frozen AI portal with keyword tooltips and terminal readout animation
- Contact summit final scene with email, LinkedIn, and resume download CTAs
- SEO and Open Graph metadata
- Reduced-motion support for accessibility
- Static export configuration for fast hosting

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run lint
npm run build
```

The project is configured with `output: "export"` in `next.config.mjs`, so `npm run build` creates a static export in `out/`.

## Environment Themes

Available theme IDs:

- `winter`: snowy forest, icy terrain, snowfall, cool blue/cyan/violet lighting
- `desert`: warm dunes, rocks/cacti, dust particles, amber/orange/violet accents
- `woods`: green terrain, forest colors, mountain backdrop, firefly particles
- `ocean`: coastal lighting, stylized water plane, rocks, sea mist particles
- `spring`: blooming field accents, petals, soft sunrise pink/green/gold palette

Theme selection behavior:

- `?theme=winter`, `?theme=desert`, `?theme=woods`, `?theme=ocean`, or `?theme=spring` overrides saved preferences.
- Without a query parameter, the site uses `localStorage` key `ukm-journey-theme`.
- If no saved theme exists, the full-screen "Choose Your Journey" selector opens before entering the portfolio.
- The floating "Change Theme" button reopens the selector and saves the new choice.

To add a new theme:

1. Add the new `ThemeId` and config entry in `data/themes.ts`.
2. Add a preview class in `app/globals.css`.
3. Ensure the `scene` config provides terrain, path, lighting, particle, tree, and accent colors.
4. Extend `SeasonalParticles` or the procedural scene helpers only if the new theme needs a new particle or object behavior.

Performance notes:

- Seasonal particles use a single `Points` buffer instead of individual meshes.
- Particle counts are reduced on mobile.
- Reduced-motion users get simplified particles and minimal avatar bobbing.
- Scroll movement uses refs and R3F `useFrame` smoothing to avoid React state updates every frame.

## Deploy To Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the repository in Vercel.
3. Keep the default Next.js build settings:
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: `out`
4. Add `NEXT_PUBLIC_SITE_URL` with the final production URL for accurate Open Graph metadata.
5. Deploy.

## Customization Notes

- Profile basics live in `data/profile.ts`.
- Experience checkpoints live in `data/experiences.ts`.
- Skill groups live in `data/skills.ts`.
- Quest/project cards live in `data/projects.ts`.
- Section components live in `components/`.
- Global theme styles and reusable CSS utilities live in `app/globals.css`.
- The 3D journey scene lives in `components/AdventureCanvas.tsx`.
- Theme configuration lives in `data/themes.ts`.
- Theme selection and persistence live in `components/ThemeProvider.tsx`, `components/ThemeSelector.tsx`, and `components/ThemeSwitcher.tsx`.
- Seasonal particles live in `components/SeasonalParticles.tsx`.
- The mobile journey dots live in `components/JourneyMiniMap.tsx`.
- The shared scroll motion context lives in `components/MotionProvider.tsx`.
- Keep professional summaries high-level and avoid adding confidential employer, client, patient, source code, or internal architecture details.
