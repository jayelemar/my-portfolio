---
target: "contact section in Image #1"
total_score: 32
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 0
target_identity: "file:/Users/jetermulo/projects/portfolios/my-portfolio/src/components/contact/Contact.tsx"
target_fingerprint: "sha256:f033b9f2ed6a8f7c36643ce2d73af0138f42232e78e967ed78c855e23a2bb13d"
target_path: /Users/jetermulo/projects/portfolios/my-portfolio/src/components/contact/Contact.tsx
timestamp: 2026-11-04T03-02-21Z
slug: src-components-contact-contact-tsx
closed: true
---
Method: dual-agent (A: contact_design_review · B: contact_evidence_review)

**Verdict: a good foundation, but the section feels too spread out and its success state needs a clearer ending.** The green palette, Inter typography, and rounded controls fit the portfolio. The composition is familiar; stronger grouping would make it feel more intentional without adding decoration.

**Design health: 32/40 — Good.** Scores describe this section, not a complete accessibility or delivery audit.

| Heuristic | /4 | Main finding |
|---|---:|---|
| System status | 3 | Success persists into a new draft |
| Real-world language | 4 | Familiar labels and explicit action |
| User control | 3 | Direct-contact alternatives; submission locks fields |
| Consistency | 3 | Cohesive styling, uneven spacing |
| Error prevention | 3 | Validation and limits; required status implicit |
| Recognition | 4 | Labels and requirements remain visible |
| Efficiency | 3 | Autocomplete, phone, and email alternatives |
| Minimalist design | 3 | Few fields, excessive separation |
| Error recovery | 3 | Inline errors and retained draft on failure |
| Contextual help | 3 | Useful requirements, generic security-wait feedback |

**What works**

- The bold invitation establishes the section immediately; green gives the action clear emphasis.
- Three fields keep the inquiry short. Direct email and phone support visitors who prefer another contact path.
- Browser checks found associated labels, visible keyboard focus, inline validation, 44px action targets, and no horizontal overflow at 390px.

**Priority issues**

1. **P2 — Spacing fragments the section.** The desktop contact rows feel isolated, and the helper text is detached from the button. On mobile, the first field sits roughly 460px below the heading, after all contact details. Tighten row gaps toward 20–24px while preserving 44px link targets; reduce the blank space before the form and between requirements and action. Keep the broad outer whitespace. **Command: `$impeccable layout`.**

2. **P2 — Success does not feel finished.** Your screenshot shows empty fields, “Message sent,” and the original Send message button together. Source confirms that the success notice remains when someone begins another draft. Clear it on editing, or show an explicit Send another message action after success. This gives the inquiry a deliberate ending. **Command: `$impeccable harden`.**

3. **P2 — Trailing icons lack text clearance.** The controls reserve 32px on the right, while each icon extends 44px inward. Long email addresses or message lines can meet the decoration. Reserve at least 56px, or remove the redundant field icons. This is a source-confirmed geometry risk; overflow with entered text was not exercised. **Command: `$impeccable harden`.**

4. **P2 — Security checking and delivery share one status.** Source allows up to 60 seconds for security checking before the request begins, while the disabled form says Sending. Distinguish checking from sending, guide visitors if a challenge appears, and keep direct email accessible during a prolonged wait. The live challenge was not exercised. **Command: `$impeccable harden`.**

5. **P2 — Required fields are implicit.** All three fields are required by validation, but their labels and control semantics do not communicate that beforehand. Add one concise All fields required instruction and expose required semantics while retaining current validation. **Command: `$impeccable clarify`.**

**User perspectives and cognitive load:** Jordan, a first-time visitor, gets an ambiguous finish after success. Sam, a screen-reader user, cannot identify required fields before validation. Casey, on a phone, must scroll through the full contact block before typing; reload also loses an unfinished draft. Overall cognitive load is low: three fields and three contact paths, with no decision point above four options. Grouping is the main weakness.

**Emotional journey:** the invitation is approachable; the long route to typing and a potentially vague wait interrupt momentum. Confirmation should be the reassuring final moment.

**Minor refinements:** field borders are faint in both themes; verify their visibility before adjusting tokens. The dark field icons attract more attention than their information warrants. Phone and email could signal their link behavior before hover. Name/email also reference description IDs absent in their initial state; their labels and validation errors are correctly associated.

**Detector evidence:** both scoped source scans returned zero findings. The browser detector reported two page-level signals: Inter usage and bounce easing. Inter is the established design choice, and the bounce finding was not attributed to contact; neither warrants a contact change. The clean scan does not resolve the spacing or state issues above.

Which should lead: **tighter layout**, **clearer form states**, or **both**?

For scope, do you prefer **the top three issues** or **all five**?
