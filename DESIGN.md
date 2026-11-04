---
name: Jay Elemar Termulo Portfolio
description: "The Developer’s Workbench: approachable, capable, and grounded in real work."
colors:
  primary: "hsl(142.4 71.8% 29.2%)"
  primary-dark: "hsl(142.1 70.6% 45.3%)"
  primary-hover: "hsl(142.4 71.8% 24%)"
  primary-hover-dark: "hsl(142.1 70.6% 50%)"
  primary-foreground: "hsl(355.7 100% 97.3%)"
  primary-foreground-dark: "hsl(144.9 80.4% 10%)"
  forest-ink: "rgb(40 119 67)"
  forest-ink-dark: "rgb(134 219 164)"
  mint-100: "#dcfce7"
  mint-200: "#bbf7d0"
  mint-300: "#86efac"
  forest-950: "#052e16"
  forest-900: "#14532d"
  forest-800: "#166534"
  background: "hsl(0 0% 100%)"
  background-dark: "hsl(20 14.3% 4.1%)"
  foreground-dark: "hsl(0 0% 95%)"
  cream: "#fef9f5"
  card: "hsl(0 0% 100%)"
  card-dark: "hsl(24 9.8% 10%)"
  secondary: "hsl(240 4.8% 95.9%)"
  secondary-dark: "hsl(240 3.7% 15.9%)"
  secondary-foreground: "hsl(240 5.9% 10%)"
  secondary-foreground-dark: "hsl(0 0% 98%)"
  muted: "hsl(240 4.8% 95.9%)"
  muted-dark: "hsl(0 0% 15%)"
  muted-foreground: "hsl(240 5.2% 40%)"
  muted-foreground-dark: "hsl(240 5% 64.9%)"
  accent: "hsl(240 4.8% 95.9%)"
  accent-dark: "hsl(12 6.5% 15.1%)"
  border: "hsl(240 5.9% 90%)"
  border-dark: "hsl(240 3.7% 15.9%)"
  destructive: "hsl(0 72.2% 40.6%)"
  destructive-dark: "hsl(0 90.6% 70.8%)"
  destructive-foreground: "hsl(0 0% 98%)"
  destructive-foreground-dark: "hsl(0 74.7% 15.5%)"
  ring: "hsl(142.4 71.8% 29.2%)"
  ring-dark: "hsl(142.4 71.8% 29.2%)"
  demo-status: "#fbbf24"
typography:
  display: {fontFamily: 'Inter, "Inter Fallback", sans-serif', fontSize: "4.5rem", fontWeight: 700, lineHeight: 1.111111, letterSpacing: "-0.025em"}
  headline: {fontFamily: 'Inter, "Inter Fallback", sans-serif', fontSize: "2.25rem", fontWeight: 700, lineHeight: 1.111111}
  title: {fontFamily: 'Inter, "Inter Fallback", sans-serif', fontSize: "1.5rem", fontWeight: 600, lineHeight: 1, letterSpacing: "-0.025em"}
  body: {fontFamily: 'Inter, "Inter Fallback", sans-serif', fontSize: "1rem", fontWeight: 400, lineHeight: 1.5}
  lead: {fontFamily: 'Inter, "Inter Fallback", sans-serif', fontSize: "1.25rem", fontWeight: 300, lineHeight: 1.4}
  label: {fontFamily: 'Inter, "Inter Fallback", sans-serif', fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.428571}
  navigation: {fontFamily: 'Inter, "Inter Fallback", sans-serif', fontSize: "1.125rem", fontWeight: 500, lineHeight: 1.555556}
  metadata: {fontFamily: 'Inter, "Inter Fallback", sans-serif', fontSize: "0.75rem", fontWeight: 500, lineHeight: 1.333333}
  index: {fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.333333}
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  7: "28px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
components:
  button-primary: {backgroundColor: "{colors.primary}", textColor: "{colors.primary-foreground}", typography: "{typography.label}", rounded: "{rounded.md}", padding: "8px 16px", height: "40px"}
  button-secondary: {backgroundColor: "{colors.secondary}", textColor: "{colors.secondary-foreground}", typography: "{typography.label}", rounded: "{rounded.md}", padding: "8px 16px", height: "40px"}
  button-destructive: {backgroundColor: "{colors.destructive}", textColor: "{colors.destructive-foreground}", typography: "{typography.label}", rounded: "{rounded.md}", padding: "8px 16px", height: "40px"}
  button-outline: {backgroundColor: "{colors.background}", typography: "{typography.label}", rounded: "{rounded.md}", padding: "8px 16px", height: "40px"}
  button-ghost: {typography: "{typography.label}", rounded: "{rounded.md}", padding: "8px 16px", height: "40px"}
  button-link: {textColor: "{colors.primary}", typography: "{typography.label}", rounded: "{rounded.md}", padding: "8px 16px", height: "40px"}
  input-contact: {backgroundColor: "{colors.background}", typography: "{typography.body}", rounded: "{rounded.2xl}", padding: "8px 56px 8px 32px", height: "54px"}
  navigation: {padding: "0px", typography: "{typography.navigation}"}
  technology-chip: {backgroundColor: "{colors.muted}", textColor: "{colors.muted-foreground}", typography: "{typography.metadata}", rounded: "{rounded.md}", padding: "4px 10px"}
  project-card: {rounded: "{rounded.lg}"}
---

# Design System: Jay Elemar Termulo Portfolio

## Overview

**Creative North Star: "The Developer’s Workbench"**

The user explicitly confirmed that the existing green theme is the design authority. Preserve its Leaf Green, Forest Ink, Mint, light/dark themes, Inter typography, pill actions, and current portrait treatment during refinement. Earlier generated replacement directions are superseded.

An approachable, capable portfolio with open spacing, direct typography, green accents, and clear project demonstrations. The workbench metaphor describes the implemented system: personal identity gives the work a human author, and project screenshots supply concrete evidence of what he builds.

Components feel refined and restrained, with quiet boundaries, clear states, and generous spacing. Depth is layered: page surfaces stay calm while screenshot frames and the scrolled header receive structural shadows. Light and dark themes retain the same hierarchy and geometry.

**Key Characteristics:**

- A consistent green accent, supported by quieter green text and mint surfaces.
- One primary sans-serif family, with bold headings and muted explanatory copy.
- Pill actions, rounded fields, fine borders, and framed desktop/mobile project imagery.
- Spacious sections with responsive stacking and deliberate reveal motion.

Extracted from `src/app/globals.css`, `tailwind.config.ts`, the root layout, shared UI primitives, and active page components. Checked against the local home page at desktop (1440 × 1000) and mobile (390 × 844), in both themes, on 2026-11-03. Descriptive language was confirmed by Jay. This records the current implementation; it does not assert an accessibility audit or a redesigned system.

## Colors

Leaf Green supplies the main accent; Forest Ink supports quieter text and icons; Mint supports imagery without competing with project content. Frontmatter values are the normative extracted tokens. The unqualified keys describe light mode; `-dark` keys are theme counterparts. Runtime styling uses the semantic custom properties in the global stylesheet.

### Primary

- **Leaf Green** (`primary`, `primary-dark`): primary actions, active navigation, project names, live-status dots, and small identifying accents. Pair each theme with its matching `primary-foreground`.
- **Forest Ink** (`forest-ink`, `forest-ink-dark`): about-section contact icons and skill-group headings. The dark counterpart is deliberately lighter for its background.
- **Mint** (`mint-100` through `mint-300`): the existing portrait gradient. Its dark counterpart uses the Forest shades (`forest-950` through `forest-800`).

### Neutral

- **Paper / Warm Charcoal** (`background`, `background-dark`): page surfaces; `foreground-dark` carries dark-mode body text.
- **Warm Cream** (`cream`): the home header at the top of the page in light mode.
- **Card Surface** (`card`, `card-dark`): project surfaces, currently rendered at 70% opacity with borders at 60% opacity.
- **Quiet Surface** (`secondary`, `muted`, `accent`, and their dark counterparts): footer, low-emphasis actions, technology tags, and hover states. These roles share values in light mode but differ in dark mode; preserve their semantic assignments.
- **Supporting Text** (`muted-foreground` and its dark counterpart): descriptions, metadata, field labels, and supporting content.
- **Hairline** (`border` and its dark counterpart): boundaries and field strokes. The input-border token currently aliases this value.

### Functional colors

`destructive` and its paired foregrounds carry validation and destructive states. `demo-status` identifies demos; archived status uses supporting text. These are functional roles, not additional brand accents. Focus uses the theme's `ring` token.

**The Semantic Pair Rule.** Resolve background, text, border, and focus colors through their matching theme roles. A light-theme action foreground must not be carried into dark mode independently of its background.

**Foreground roles:** light `foreground`, `card-foreground`, and `popover-foreground` use `240 10% 3.9%`. The formerly malformed/red foreground values have been corrected. The light primary now uses a darker green for readable normal-sized text and action labels. The configured `tertiary` role still has no defined custom property and is not an established palette token.

## Typography

**Display and body:** Inter, loaded through `next/font`, with its generated Inter Fallback. **Index:** the system monospace stack, used for project numbering.

The hierarchy uses weight and size within one family. It follows the existing Tailwind size steps rather than a single mathematical scale ratio.

| Role | Observed use and responsive behavior |
| --- | --- |
| Display | Hero heading: bold, fluid from (36px) to (48px) below `xl`, then (72px/80px), with tight tracking (−0.025em). |
| Headline | Project section heading (36px/40px). About heading grows from (36px/40px) to (48px/48px) at `md`, with tracking (−0.03em). Contact heading grows from (36px) to (48px) at `md`. |
| Title | Shared card title: semibold (24px/24px), tight tracking. Featured project titles are bold and grow through (24px), (30px), and (36px). |
| Body | Regular text (16px/24px); longer descriptions use relaxed leading (1.625). The about introduction is medium (22px) with relaxed leading. |
| Lead | Hero introduction: light (20px/28px), constrained to the existing maximum width (32rem). |
| Label | Buttons and skill names commonly use (14px); hero actions override to (16px). Desktop navigation uses medium (18px/28px). |
| Metadata | Category, status, and technology labels (12px/16px); project indices use monospace at the same size. |

Uppercase is local to small overlines; navigation is capitalized and most content remains sentence case. Do not introduce a second display family as part of ordinary refinement.

## Layout

The centered container has horizontal padding (32px). Its maximum widths follow the configured Tailwind container: (640px), (768px), (1024px), (1280px), then (1400px) at the `2xl` breakpoint. The custom `xs` breakpoint (480px) supports compact layout changes; it does not add a separate container width. Other breakpoints are `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), and `2xl` (1536px).

Spacing is based on the observed four-pixel utility steps, with larger separations between major sections. Preserve local responsive rules instead of applying a universal section-height formula:

- Hero content centers below `xl`; the portrait is hidden. At `xl`, text aligns left beside the portrait. Minimum height is the smaller of (44rem) and (85svh), then (42rem) at `xl`, with (64px) vertical padding. The following gap is (64px), growing to (96px) at `xl`.
- About content stacks below `lg`, then uses a fixed text column (360px) and a flexible skills column, with a desktop gap (64px). Skill groups divide with fine top borders; their labels gain a separate column at `xl`.
- Featured projects stack below `lg`. At `lg`, a native horizontal scroll-snap gallery uses full-width items, a (32px) gap, project-name jump buttons, previous/next controls, and current/total progress. It does not consume vertical scrolling. Featured cards retain a text/preview split (0.9fr/1.1fr) and minimum height (440px). Descriptions are fully readable at every width. Reduced-motion users receive immediate gallery navigation.
- Supporting projects use one column on small screens, two at `md`, and a three-item carousel at `lg`.
- Contact details and form stack on small screens with a (24px) gap and sit side by side from `md` with a (48px) gap. Contact rows use (8px) gaps on small screens and (20px) from `md`, retaining (44px) phone/email targets. Name/email fields have their own responsive wrapping rules; field groups use (24px) gaps. Requirements, security feedback, and the action stay grouped below the message.

The `/projects` route reuses the homepage gallery inside its own main landmark. Navigation links return to homepage sections where appropriate.

## Elevation & Depth

Layered depth gives previews a tangible frame while keeping page and project-card surfaces quiet. Featured project cards explicitly remove the shared card primitive's small shadow. Screenshot frames carry the strongest shadow; the header becomes raised after the scroll threshold (50px). Fine borders and tonal surfaces do most of the remaining separation.

| Shadow | Extracted value | Use |
| --- | --- | --- |
| Small | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Base card primitive and carousel controls. |
| Raised | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Scrolled header and navigation sheet. |
| Preview | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | Browser frames within project imagery. |

**The Quiet Surface Rule.** Keep project-card shells free of shadows; put the existing preview elevation on the framed imagery inside them.

## Shapes

The shared radius variable starts at (8px); its smaller derivatives are (6px) and (4px). Project shells use the base radius; screenshot frames use (8px) or (12px). Contact fields use (16px). Primary page actions and category labels use pill rounding; circular controls use equal width and height.

The portrait's organic silhouette is a specific existing asset treatment, with elliptical radii (`58% 42% 46% 54% / 40% 42% 58% 60%`) and feathered masks. Keep it local to that composition. Technology tags remain modest rounded rectangles, distinct from category pills.

## Components

### Buttons

Refined actions with clear hierarchy. The shared primitive defaults to a medium corner (6px), height (40px), horizontal padding (16px), and vertical padding (8px). Its variants are primary, secondary, destructive, outline, ghost, and link; sizes include small (36px), large (44px), and square icon (40px).

Primary hover fills use the theme’s opaque `primary-hover` role to preserve label contrast. Destructive hover fills use 90% opacity; secondary uses 80%. Outline and ghost hover on the accent surface; link adds an underline. Shared keyboard focus uses a two-pixel theme ring with a two-pixel background offset. Disabled controls reduce opacity to 50% and suppress pointer events.

Page actions override the primitive with pill rounding. Hero actions use one link per action, a fixed width (176px), height (44px), text (16px), and motion-safe hover scale (1.05). The CV button overrides secondary colors with muted surface/text roles. Project action links use semibold text, pill rounding, and a small hover lift (2px). Do not apply every contextual override to the base primitive.

### Chips and status

Technology tags use a muted fill, supporting text, medium corners (6px), and padding (4px 10px). Category labels use a fine border, a partially transparent page surface, pill rounding, and padding (4px 12px). Both use the shared `Badge` primitive's `technology` and `category` variants. Status is a small dot paired with explicit text: Live, Archived, or Demo. These metadata patterns are not interactive filters.

### Cards and project previews

Project shells use a subtle border, 70% card fill, clipped corners (8px), and no shell shadow. Featured text padding grows from (20px) to (32px) to (40px); compact padding grows from (20px) to (24px). Images appear above text on small screens and beside it on featured desktop cards.

Browser frames, three green window dots, and a layered phone image form the distinctive preview treatment. Preview backgrounds use the existing pale emerald/green-to-white gradient in light mode and deep emerald/neutral gradient in dark mode. Frame hover scales to (1.03) over (500ms), with a small phone lift. Preserve the real project screenshots and their aspect-aware presentation.

### Inputs and fields

The base input is (40px) tall with medium corners (6px), a one-pixel input border, and padding (8px 12px). Contact fields override to (54px), larger corners (16px), text (16px), left padding (32px), and right padding (56px) to reserve trailing-icon space. The shared field frame owns labels, icons, and validation placement; field height and Forest Ink are now named theme tokens. Labels sit over the top border on the page background; muted trailing icons sit inside the field. Textareas grow from a minimum (130px) to (180px) at `lg`.

Focus uses the shared theme ring. Disabled inputs use 50% opacity and a blocked cursor. Form errors appear in normal flow as destructive text below fields, allowing wrapping without overlapping the next control; do not assume a red input-border state exists. Message requirements appear before submission, with native required semantics and schema-driven inline validation. The form begins directly with Name and Email, aligned to the contact introduction; no shared required-fields notice appears. All contact-detail rows retain a (44px) minimum height for consistent icon and text alignment. Description references include only rendered helper/error text. A single Send message action uses background Turnstile checks, showing a checkbox only when required. Checking and sending have distinct status text and a direct-email alternative. Success offers Send another message, which focuses the name field; editing also clears the prior success notice. Failures preserve the draft. Contact email and telephone details use the existing actionable destinations with persistent underlines. No emailed code or inbox confirmation is required.

### Reuse and implementation

Keep generic primitives in `src/components/ui/` and contact-form compositions in `src/components/form-elements/`. Import from their source files; there is no component barrel or Storybook catalog.

| Shared token or pattern | Source | Use |
| --- | --- | --- |
| `text-forest-ink` | `--forest-ink` in `src/app/globals.css`, exposed in `tailwind.config.ts` | Quiet green text/icons: `#287743` in light mode and `#86dba4` in dark mode. Supports opacity and state modifiers. Use `primary` for actions. |
| `h-contact-field` | `theme.extend.height` in `tailwind.config.ts` | Contact input height, 3.375rem (54px). |
| `contactFieldStyles` | `form-elements/FieldFrame.tsx` | Contact control corners (16px), left/right padding (32px/56px), and text (16px). Merge with `cn` when composing `Input` or `Textarea`, then add control-specific height/padding. |
| `FieldFrame` | `form-elements/FieldFrame.tsx` | The name, email, and message field's floating label, decorative icon, and validation message. Use inside `Form` and `FormField`, with the actual control as its direct child so labels and validation attributes reach that control. |
| `Badge` variants | `ui/badge.tsx` | `technology` for project technology tags; `category` for project categories. `asChild` preserves the child element, including a semantic `li`. Existing badge variants and the default `div` remain available. |

`FieldFrame` requires `label`, a Lucide `icon`, and one control child; `multiline` defaults to `false` and positions textarea icons at the top when enabled. Its optional `className` controls the field container. `InputField` and `TextAreaField` remain the typed React Hook Form adapters, forwarding native control props and allowing `className` overrides. `TextAreaField.containerStyles` controls its outer frame.

```tsx
import { Badge } from "@/components/ui/badge";

<ul aria-label="Technologies used">
  <Badge variant="technology" asChild>
    <li>TypeScript</li>
  </Badge>
</ul>
<Badge variant="category" asChild>
  <span>Web application</span>
</Badge>
```

```tsx
import FieldFrame, {
  contactFieldStyles,
} from "@/components/form-elements/FieldFrame";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";

// Inside <Form {...form}>:
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FieldFrame label="Email:" icon={Mail}>
      <Input
        {...field}
        type="email"
        autoComplete="email"
        className={cn(contactFieldStyles, "h-contact-field")}
      />
    </FieldFrame>
  )}
/>
```

Use the adapters for ordinary contact fields; use `FieldFrame` directly only when composing another control with the same floating-label treatment. Preserve native list semantics for technology tags, and keep status indicators separate from categories.

### Navigation

The sticky header contains the existing green `elemar` logo, desktop navigation from `lg`, and a circular theme control. The active desktop anchor uses green text, a static underline (2px), and `aria-current`. Links and controls retain at least (44px) target height. Hover uses the primary accent. Below `lg`, a labeled native button opens a named right-side sheet with a dark overlay, large native section links, and distinctly named social links. Escape closes the sheet and restores trigger focus. The sheet is full width on the narrowest screens, 75% from `xs`, and capped at (384px) from `sm`.

### Motion

The shared reveal moves content (40px) into place over (500ms), with delays capped at (300ms). Hero text is static apart from a one-time heading entrance; the portrait retains its authored entrance. Contact and project content are immediately visible, and the role is static rather than typewritten. About uses a gentler reveal (16px, 500ms) and easing `cubic-bezier(0.16, 1, 0.3, 1)`, with replay when the section re-enters view. Its heading accent reveals over (450ms). Route content fades in over (400ms) after a (200ms) delay.

A shared MotionConfig respects the user’s reduced-motion preference for transforms. CSS suppresses animation and smooth scrolling under that preference; gallery controls and programmatic section scrolling also switch to immediate movement. Project cards have no entrance animation. This records implemented handling, not a claim of complete accessibility compliance.

## Do's and Don'ts

### Do:

- **Do** preserve the existing green theme as the user-confirmed visual direction.
- **Do** use the matching semantic color roles for each theme.
- **Do** keep Inter as the primary family and reserve monospace for project indices.
- **Do** distinguish pill actions, category pills, and rectangular technology tags.
- **Do** keep project shells quiet and preview imagery visibly layered.
- **Do** preserve visible focus treatments and pair project-status color with text.
- **Do** follow each component's existing responsive behavior when refining it.

### Don't:

- **Don't** reintroduce the formerly malformed light foreground or red card/popover foregrounds.
- **Don't** collapse secondary, muted, and accent roles because their light values happen to match.
- **Don't** apply portrait shapes or horizontal showcase scrolling to unrelated surfaces by default.
- **Don't** replace real screenshots, identity assets, or technology marks with generic stand-ins.
- **Don't** describe missing focus, contrast, or reduced-motion coverage as verified compliance.
