---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/hero/Hero.tsx","src/components/project/Projects.tsx","src/components/contact/Contact.tsx"]
---

# Portfolio homepage

## Scope

Target: `src/app/page.tsx` (`/`). Mode: Experience, with the user's identity-first opening. The green identity and identity-first opening remain authoritative. The critique remediation improves accessibility, contrast, gallery navigation, responsive text, and contact disclosure within that system.

Hiring teams and prospective clients have equal priority. Visitors should understand who Jay is, assess his work, and reach his contact form or CV.

## Design authority

The user explicitly requested the existing green theme. Use the current implementation and DESIGN.md: Leaf Green actions, Forest Ink supporting text/icons, Mint portrait surfaces, Inter typography, pill buttons, and the existing light/dark themes. Preserve the current portrait treatment and layered project previews.

The generated white/blue classic preview and other replacement concepts are superseded. They carry no approval for future implementation.

## Current composition

The opening introduces Jay, his frontend-focused full stack positioning, Contact Me and Download CV actions, and his existing portrait composition on desktop. The hero centers below `xl`, where the portrait is hidden. Featured projects stack on mobile and use a native horizontal gallery with direct navigation and progress on desktop. About, selected work, and contact follow. Preserve this responsive behavior during refinement unless the user requests a layout change.

## Content and behavior

Keep the confirmed identity, project content and statuses, CV destination, theme control, navigation, and single-step contact flow with background bot protection. Follow PRODUCT.md for factual content and DESIGN.md for the existing visual system. Future refinements should build on the current green interface.

Portrait accents: the top and right green circles begin fading and growing into view over 450ms after a 0.5-second delay when the portrait section enters view, while the remaining accents keep their staggered emergence. Later cycles retain their existing fade-in/out motion, and reduced motion keeps static accents visible.

## Mobile loading refinement

The static pages omit the route-wide loading fallback, so the first document paints actual page content without waiting for a streamed-boundary replacement script. The first hero entrance starts in CSS before hydration: heading lines at 0/80/160ms (500ms duration), description at 240ms (400ms duration), buttons at 350ms (400ms duration), and socials at 450ms (300ms duration). The rise is 14px and the sequence completes within 750ms. Heading lines start at 85% opacity and the description at 90%, keeping the identity and supporting copy readable from first paint; buttons and socials fade from transparent. After leaving Hero, the existing Framer Motion sequence handles scroll re-entry. Hydration does not hide or restart the initial text entrance. Reduced motion presents the text immediately. The role typewriter, portrait, and section reveals retain their existing motion. Client route changes retain the existing 200ms delay and 400ms fade.

Portrait sources and their high-priority preload are limited to the visible desktop breakpoint (`min-width: 1280px`); mobile uses a transparent inline fallback. Project previews retain their original assets and image quality, with lazy automatic sizing, responsive fallback sizes, and smaller optimization candidates to match their rendered dimensions.
