# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hiring teams evaluating Jay Elemar Termulo for full-time roles and potential clients evaluating him for freelance projects. Both audiences have equal priority. They need to assess his capabilities, review his work, and start a conversation.

## Product Purpose

A personal portfolio that introduces Jay, demonstrates his development work, and helps visitors contact him or access his CV. Success means interviews and project inquiries, with equal importance given to each.

## Positioning

Jay is a full stack developer with a frontend focus. His existing introduction emphasizes React, Next.js, and TypeScript, alongside API and backend development, with interests in design, automation, and modern web technologies. The portfolio demonstrates this through his actual project content rather than unsupported comparative claims.

## Operating Context

Visitors can explore the home page's introduction, about, projects, and contact sections, or browse the dedicated `/projects` route. They can review project screenshots, descriptions, technologies, and status, follow available live-site, demo, source-code, or Figma links, access an externally hosted CV, and find social profiles and contact details.

The site is an existing Next.js App Router application using React, TypeScript, and Tailwind CSS. The documented development command is `rtk npm run dev`; Node.js 20.9 or later is required.

## Capabilities and Constraints

- Preserve Jay's identity, existing project content, CV link, and contact flow in future work unless he explicitly changes them.
- Keep the distinction between live, archived, and demo projects. Archived entries currently omit the live-site action.
- Preserve the externally hosted CV destination in `src/lib/constant.ts`.
- The contact form uses an emailed six-digit verification code before forwarding a message to Discord. Challenges expire after 15 minutes; verification and resend limits apply.
- Portfolio browsing does not require environment variables. Contact delivery requires the documented Resend, Upstash Redis, Discord, and verification-secret configuration.
- The existing application supports light and dark themes and responsive layouts.

## Brand Commitments

Preserve the public identity Jay Elemar Termulo, also introduced as Jay Elemar. The existing portfolio identifies him as based in Bulacan, Philippines and links to his GitHub, LinkedIn, and Facebook profiles.

Jay explicitly confirmed the existing green theme as the visual direction. Preserve its green identity and light/dark themes. He wants a distinctive professional personal identity and rejects terminal-style developer themes. DESIGN.md documents the current system; homepage composition belongs to its surface brief.

## Evidence on Hand

- Project descriptions, technologies, destinations, and status labels: `src/components/project/ProjectData.tsx`. Entries include Gondoor, Duty Free Philippines, Futr, Back To The Futr, Bike Me, Leave Management System, Figma to Landing Page, and My Portfolio.
- Desktop and mobile project screenshots: `public/work/`.
- Portrait assets: `public/hero/` and `public/about/`.
- Identity, contact details, and skills: `src/components/about/AboutData.tsx`; introduction and education: `src/components/about/About.tsx`.
- CV destination: `src/lib/constant.ts`; social destinations: `src/components/common/Socials.tsx`.
- Contact setup and verification behavior: `README.md` and `src/lib/contact-*.ts`.

Project-specific roles, measured outcomes, client endorsements, and testimonials have not been established in this product record. Future work must obtain evidence before adding such claims.

## Product Principles

1. Serve employment and freelance evaluation equally.
2. Keep the frontend-focused full stack positioning consistent with Jay's confirmed identity and work.
3. Use existing projects and assets as evidence; obtain confirmation before adding claims.
4. Keep access to the CV and a working contact path central to the visitor's evaluation.
5. Preserve truthful project availability and the verified contact workflow.

## Open Decisions

No product-specific accessibility standard, additional audience needs, or further brand commitments were established during initialization.
