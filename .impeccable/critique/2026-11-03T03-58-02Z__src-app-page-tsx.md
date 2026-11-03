---
target: portfolio homepage critique
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/jetermulo/projects/portfolios/my-portfolio/src/app/page.tsx"
target_fingerprint: "sha256:5efb53cc84d76f60b66fbcc152a1c1eb41262920de29ee9685946c27a967b7ae"
target_path: /Users/jetermulo/projects/portfolios/my-portfolio/src/app/page.tsx
timestamp: 2026-11-03T03-58-02Z
slug: src-app-page-tsx
---
Method: dual-agent (A: /root/design_review · B: /root/detector_evidence)

**Design specificity:** The wordmark, portrait, green palette, and real project previews establish a recognizable author. The surrounding composition is familiar developer-portfolio territory. The biggest opportunity is showing what Jay personally contributed to each project. Preserve the confirmed green identity and identity-first opening.

**Design health: 21/32 — Acceptable (66%).** This is a heuristic judgment, not a compliance score.

| Heuristic | Score /4 | Main finding |
|---|---:|---|
| 1. System status | 3 | Clear project statuses; no featured-showcase progress |
| 2. Match with real world | 3 | Familiar labels; project copy lacks personal contribution |
| 3. Control and freedom | 2 | Mobile menu skipped by keyboard; no direct showcase controls |
| 4. Consistency and standards | 2 | Nested interactive controls, malformed social labels, weak light-theme contrast |
| 5. Error prevention | 2 | Validation exists; verification and message requirements appear late |
| 6. Recognition over recall | 3 | Clear sections; visitors must infer role from separate information |
| 7. Flexibility and efficiency | n/a | Application accelerators unnecessary for this Experience surface |
| 8. Aesthetic and minimalist design | 3 | Calm hierarchy; excessive spacing and slow progression |
| 9. Error recovery | 3 | Retry, resend, and edit controls exist; delivery untested |
| 10. Help and documentation | n/a | A separate help system is unnecessary for this portfolio |
| **Total** | **21/32** | **Acceptable** |

**What works**

- The desktop portrait and custom wordmark establish a human identity; the green system remains coherent across themes.
- Layered desktop/mobile screenshots provide credible visual evidence. Live, Archived, and Demo use explicit text alongside color.
- About groups skills clearly and supplies working telephone and email links.

**Priority issues**

1. **[P1] Essential controls fail keyboard and screen-reader expectations.** Runtime keyboard traversal skips the mobile menu, tabs twice through each hero CTA, and exposes identical social names containing `[object Object]`. This makes navigation and destination recognition harder for assistive-technology users. Use a labeled native menu button with expanded state, one semantic link per CTA through `Button asChild`, and explicit platform names. Sources: [Header.tsx](/Users/jetermulo/projects/portfolios/my-portfolio/src/components/layout/Header.tsx:87), [HeroButtons.tsx](/Users/jetermulo/projects/portfolios/my-portfolio/src/components/hero/HeroButtons.tsx:19), [Socials.tsx](/Users/jetermulo/projects/portfolios/my-portfolio/src/components/common/Socials.tsx:32). Suggested command: `$impeccable harden`.

2. **[P1] Light-theme conversion actions have insufficient text contrast.** Browser measurements found pale button text on green at **3.0:1**, below the detector's 4.5:1 threshold for normal text. Contact Me, Visit live site, and Send Message repeat this pairing. Small green text on white measured **3.3:1**. Preserve green while introducing darker accessible action and text variants, and repair the documented invalid/red foreground tokens. Source: [globals.css](/Users/jetermulo/projects/portfolios/my-portfolio/src/app/globals.css:9). Suggested command: `$impeccable colorize`, followed by `$impeccable audit`.

3. **[P1] Project presentation does not establish your contribution.** Product summaries and technology tags do not explain what you built, owned, or decided. Hiring teams and clients cannot confidently attribute the work; archived entries offer little additional evidence. Mobile adds two-line truncation without a reveal action. Obtain factual role and implementation details, add a concise contribution line, and display the short descriptions fully or provide an accessible expansion. Do not invent ownership or metrics. Sources: [ProjectData.tsx](/Users/jetermulo/projects/portfolios/my-portfolio/src/components/project/ProjectData.tsx:20), [ProjectCardBody.tsx](/Users/jetermulo/projects/portfolios/my-portfolio/src/components/project/projectCard/ProjectCardBody.tsx:92). Suggested commands: `$impeccable clarify` and `$impeccable adapt`.

4. **[P2] Showcase pacing slows evaluation.** Four featured projects reserve **480vh** for vertical-to-horizontal scrolling without direct item controls or progress feedback. The hero adds a **224px** bottom margin to its 85vh height. Visitors spend too much traversal effort between introduction, evidence, and contact. Tighten the empty transition; retain layered previews while adding direct navigation, progress, and a reduced-motion alternative. Sources: [Projects.tsx](/Users/jetermulo/projects/portfolios/my-portfolio/src/components/project/Projects.tsx:148), [Hero.tsx](/Users/jetermulo/projects/portfolios/my-portfolio/src/components/hero/Hero.tsx:12). Suggested command: `$impeccable layout`.

5. **[P2] Contact introduces a surprise second task.** “Send Message” initially hides the required emailed-code step. The contact section also renders email and telephone as plain text, although About makes them actionable. Preview verification before submission, disclose message requirements, and reuse the existing `mailto:`/`tel:` destinations. Preserve the verified workflow. Sources: [ContactForm.tsx](/Users/jetermulo/projects/portfolios/my-portfolio/src/components/contact/ContactForm.tsx:359), [ContactInfo.tsx](/Users/jetermulo/projects/portfolios/my-portfolio/src/components/contact/ContactInfo.tsx:49). Suggested commands: `$impeccable clarify` and `$impeccable harden`.

**Cognitive load and emotional journey:** Visual grouping and hierarchy are strong; four primary navigation items are manageable. Some skill groups contain seven or eight passive items, which increases scanning rather than action-choice overload. The greater memory burden is connecting product summaries, skills, and CV to infer personal contribution. The experience opens warmly, peaks at project imagery, loses momentum during the long showcase, then introduces an unexpected verification step at contact.

**Persona red flags**

- **Jordan, prospective client:** Cannot confidently distinguish your contribution from the product's full capabilities.
- **Casey, distracted mobile visitor:** Sees truncated descriptions, inert contact details, and an unannounced email round trip.
- **Sam, keyboard/screen-reader visitor:** Cannot focus the mobile menu trigger; encounters duplicated CTA stops and indistinguishable social labels.

**Minor observations:** Correct “Lets Work Together” and “lets talk”; standardize React.js/Next.js/NextJS labels. The unused `/projects` route is a placeholder, but homepage navigation correctly targets its own project section. Reduced-motion coverage needs a focused pass.

**Detector reconciliation:** The CLI returned two advisories: `design-system-color` at `about/AboutImage.tsx:8`, and `bounce-easing` at `hero/HeroDownIcon.tsx:14`. The former is an unused component's image-mask stop, not a visible palette defect; the active bounce is a minor motion concern. Eight browser scans produced **66 repeated finding observations, not 66 distinct defects**: low-contrast 44, blinking-cursor 2, bounce-easing 2, kicker-above-heading 8, overused-font 8, radial-spotlight-glow 2. Confirmed settled contrast findings inform priority 2. Pinned Inter, established preview backgrounds, and transient reveal-opacity contrast readings were excluded from defect counts. No human-visible overlay is available; successful injection ran inside headless Chromium.

**Decisions for the next pass:** Prioritize accessible controls/contrast, project contribution evidence, or showcase/contact flow. Scope options: the three P1 issues or all five issues.
