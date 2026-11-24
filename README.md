This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Use Node.js 20.9 or later. From the project directory, install the locked dependencies and start the development server:

```bash
rtk npm ci
rtk npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

`rtk` is the repository's command wrapper. If it is not installed on your machine, run the same commands without the `rtk` prefix.

You can browse the portfolio without environment variables. To send messages through the contact form, configure `.env.local` as described below. Stop the development server with Ctrl+C.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Responsive image delivery

Portfolio screenshots and the desktop hero portrait use checked-in WebP variants
in `public/images/generated/`, described by
`src/lib/generated/image-manifest.json`. By default they bypass Vercel image
transformations, so exhausted transformation quota does not break these images.
The SVG logo and Open Graph image keep their existing delivery paths.

`IMAGE_OPTIMIZATION_ENABLED=false` is the default. Only the exact value `true`
restores Next.js optimization of the original images. This is a build setting:
**rebuild after changing it**; restarting an existing build does not change its
delivery mode. Keep it server-side, outside the public environment export.
Use the same value when starting that build: Next.js also reads it when enabling
the optimizer endpoint. For a local reversal check, use
`rtk proxy env IMAGE_OPTIMIZATION_ENABLED=true npm run start` after the enabled build.

For local setup, copy `.env.example` to `.env.local` if no local file exists, or
add `IMAGE_OPTIMIZATION_ENABLED=false` to the existing file without replacing
other entries. `predev` and `prebuild` run image generation automatically.

When adding or replacing a project screenshot:

1. Preserve the original in `public/work/` (or the active portrait in
   `public/about/`). Add any new active original to `IMAGE_SOURCES` in
   `scripts/generate-images.mjs` and reference its manifest entry in
   `ProjectData.tsx` or `HeroImage.tsx`.
2. Run `rtk npm run images:generate`. Generation uses Sharp 0.34.5, WebP quality
   85, alpha quality 100, effort 6, and widths from 160 to 1920px plus the original
   width, with no upscaling. Filenames hash source bytes and the encoding recipe;
   unchanged outputs are reused. Missing or invalid originals fail generation
   and the build with the offending path. Unrelated assets are never processed
   or deleted.
3. Include the generated WebP files and deterministic manifest with the source
   changes. A fresh checkout already contains these assets. Generation can be
   rerun explicitly after changing originals or the recipe.
4. Run `rtk npm test -- src/lib/responsive-images.test.ts scripts/generate-images.test.mjs`,
   `rtk npm test`, `rtk proxy env IMAGE_OPTIMIZATION_ENABLED=false npm run build`,
   and `rtk npx tsc --noEmit`.

The shared `getResponsiveImageProps` helper preserves Next.js geometry and fill
styles. Disabled builds supply static width candidates and the caller's `sizes`;
enabled builds use the Next.js optimizer with original sources. The hero uses
matching desktop-only picture sources and a media-qualified preload; widths
below 1280px receive only an inline transparent fallback.

For release verification, serve the production build with `rtk npm run start`.
On `/`, `/projects`, and `/projects/compare`, check light/dark at 390px/DPR 2 and
1440px/DPR 1, scrolling through both gallery variants. Confirm every visible image
decodes, static `currentSrc` values match manifest candidates, and the network
contains no `/_next/image` requests. Check no portrait download below 1280px;
at desktop DPR 1 and 2 the two portrait layers and preload should share one
candidate download. Inspect screenshot text, transparent edges, cropping, and
reserved geometry. Compare cold-cache selected candidate bytes with original
bytes; this measures transfer savings, not production Web Vitals. Rebuild with
`IMAGE_OPTIMIZATION_ENABLED=true` and repeat locally to prove reversibility
without consuming Vercel transformations.

For the authorized Vercel target, confirm the linked team/project, set only this
toggle to `false` in Development, Preview, and Production (including applicable
branch overrides), and retain the previous production URL. Stage production
configuration with `rtk vercel deploy --prod --skip-domain`; wait for READY and
verify image delivery there before `rtk vercel promote <staged-url>`. Repeat the
checks on `https://www.elemar.site` and inspect relevant deployment errors.
Use authenticated access for protected builds without disabling protection.

If staged checks fail, leave the public domains on the current build. If a public
regression appears, promote the previous known-good deployment and verify its
images; that older build may still depend on quota. To restore optimization,
set the toggle to `true`, rebuild, stage, verify, and promote after transformation
allowance is available. Do not change contact configuration for this procedure.

## Contact form

Visitors send a message in one step. Cloudflare Turnstile checks for bots, then the server forwards accepted messages to the existing Discord webhook. Sender email ownership is not verified; no verification emails are sent.

1. Keep the existing Upstash Redis database and Discord webhook.
2. Create a **Managed** widget in the Cloudflare Turnstile dashboard. Allow `elemar.site` and `www.elemar.site`, plus the specific preview hostnames you use. Turnstile does not require moving DNS to Cloudflare.
3. Copy `.env.example` to `.env.local` and fill in the Redis credentials, webhook, Turnstile site key and secret. Set `TURNSTILE_ALLOWED_HOSTNAMES` to the comma-separated exact hostnames of that environment.
4. Add the same variables to the appropriate Vercel environments, then rebuild. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is public and embedded at build time; the secret stays server-only. Resend and `CONTACT_CODE_SECRET` are no longer used.
5. Confirm the Vercel Firewall IP rule for `POST /api/contact/request` allows at most 3 requests per 10 minutes. The app independently enforces this limit using Vercel's trusted ingress IP header; other production hosts fail closed until a trusted-IP adapter is supplied.

The widget starts on form interaction and appears only when interaction is required. The server validates tokens with Siteverify and checks the `contact` action and allowed hostname. Missing configuration, blocked scripts, or failed checks never bypass protection; visitors can retry or use the displayed email link.

Redis also limits messages to 3 per address per hour, 5 per address per day, and 50 total per day. Bot-trap submissions are discarded. Unchanged drafts reuse a submission ID; a 30-second lock blocks concurrent deliveries, and a 10-minute delivery fingerprint suppresses confirmed retries. Discord timeouts or failure to save a delivery record can leave delivery uncertain; this is best-effort duplicate prevention, not an exactly-once guarantee. No message text or raw IP is stored in these records.

The old verify/resend endpoints return 410 with a refresh instruction. Old Redis challenges expire naturally, and stale browser verification state is cleared on form mount.

Run `rtk npm test` for mocked server tests. For browser testing use [Cloudflare's official test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) with an isolated development configuration and mocked Discord delivery; never use test keys in production. Exercise passing, failing, expired, and interactive checks. Before release, perform one real submission with production widget credentials and confirm the Discord notification. Browsing the portfolio needs no credentials; an unconfigured form offers direct email instead.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
