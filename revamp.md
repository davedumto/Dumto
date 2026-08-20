# BUILD PROMPT — Vellar landing page (paper-brutalist restyle)

Build a complete, production-quality marketing landing page for **Vellar**, a
self-custodial Stellar smart-wallet and agent-payments stack built on x402.

You are restyling an existing dark/neon site into a **warm paper-brutalist** system.
Use ONLY the copy provided in §6 — do not invent product claims, features, metrics,
or testimonials. Where a section needs a label that isn't in the copy, use the
eyebrow labels given.

Deliver a **single self-contained `index.html`** — all CSS in one `<style>`, all JS in
one `<script>`, no build step, no framework, no external requests except Google
Fonts / Fontshare. No `localStorage` or `sessionStorage`.

---

## 1. Art direction

Warm paper, hard ink, no blur. Think risograph print rather than glassmorphism:
a cream newsprint background with a faint grain, everything outlined in 2px
near-black, and depth communicated **only** by hard offset shadows with zero blur.
Big radii keep it friendly rather than aggressive. Generous vertical air — the page
should feel unhurried and spacious, never cramped.

Two type families with a hard semantic split: a geometric sans for anything a human
reads, a monospace for anything a machine produced — every number, address, price,
token amount, tx hash, endpoint, package name, and every small uppercase label.

**Critical constraint: this must not look like a clone of rail402.dev.** Take the
*system* (paper ground, ink outlines, hard shadows, mono/sans split, section
grammar), not the artifacts. Specifically: do not use their orange-led palette,
their font pairing, their ghost `402` numeral, their receipt illustration, or any of
their copy. Vellar keeps its own green-led identity.

### Tokens

```css
:root {
  /* ground */
  --paper:    #F2F1E8;   /* page background */
  --surface:  #F6F5EE;   /* card fill, a half-step lighter than paper */
  --ink:      #0D0D0F;   /* all borders, headings, dark panels */
  --ink-inv:  #F4F3EF;   /* text on dark panels */

  /* accents — green is primary and carries the brand */
  --green:    #00B368;   /* primary. legible on paper */
  --mint:     #4BE58F;   /* bright variant — dark panels ONLY */
  --violet:   #6B5BFF;   /* SDK / developer */
  --sky:      #00A8E8;   /* Bazaar / discovery / trust */
  --amber:    #FFB020;   /* browser extension */
  --coral:    #FF5C38;   /* everyday wallet */

  /* derived text — opacity on ink, never separate greys */
  --muted:      rgba(13,13,15,.62);
  --label:      rgba(13,13,15,.56);
  --muted-inv:  rgba(244,243,239,.58);
}
```

Rules:

- Accent assignment is **semantic and sticky**. Each product area owns one color and
  keeps it everywhere it appears — card shadow, icon, dot, bullet, chip fill. Never
  pick an accent for decoration.
- Never use `--mint` on paper (fails contrast). Never use `--green` as a large fill
  on `--ink` (too dark) — use `--mint` there.
- Body copy is `--muted`, not a grey. Everything stays warm.

### Type

- **Display / UI:** `General Sans` (Fontshare) — weights 400, 500, 600. Fallback
  `ui-sans-serif, system-ui, sans-serif`.
- **Mono:** `Geist Mono` — weights 400, 500. Fallback `ui-monospace, SFMono-Regular, monospace`.

| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| H1 | `clamp(2.75rem, 6.4vw, 4.5rem)` | 600 | 1.05 | −0.02em |
| H2 | `clamp(1.9rem, 3.4vw, 2.4rem)` | 600 | 1.12 | −0.02em |
| H3 (card title) | 1.375rem | 600 | 1.35 | −0.02em |
| Body | 1rem | 400 | 1.55 | 0 |
| Dek (section intro) | 1.0625rem | 400 | 1.6 | 0 |
| Eyebrow | 0.75rem | 600 | 1 | **+0.14em**, uppercase |
| Mono data | 0.75–1rem | 400/500 | 1.4 | 0 |

Deliberate tension: display type is tightly tracked with negative kerning; eyebrows
are aggressively letterspaced uppercase mono-ish caps. Keep that contrast.

### Space & shape

```
Content column:  max-width 1180px; padding 0 28px; margin inline auto
Section rhythm:  padding 104px 0   (clamp down to 72px under 720px)
Card grid gap:   30px
Card padding:    32px 30px

Card:    border-radius 22px; border 2px solid var(--ink);
         background var(--surface); box-shadow 8px 8px 0 0 <accent>;
Button:  border-radius 16px; border 2px solid var(--ink);
         padding 15px 26px; font 1rem/600;
  primary:   background var(--ink); color var(--ink-inv); box-shadow 6px 6px 0 0 <accent>;
  secondary: background transparent; color var(--ink); box-shadow none;
Chip:    fully rounded; 2px ink border or solid accent fill; mono; ~0.6875rem; uppercase
```

**No blurred shadows anywhere on the page.** This is the single most identity-defining
rule. Every shadow is `Npx Npx 0 0 <color>`.

### Paper grain

Apply a very subtle tiling noise to `body` — an inline SVG `feTurbulence` data-URI at
~3–4% opacity, or a repeating radial-gradient dot field. It must be barely perceptible;
if you can see individual specks at 100% zoom, it's too strong.

---

## 2. Section grammar

Every section is the same four-part template. Build it once, render it many times.

```
┌ SECTION ───────────────────────────── padding: 104px 0
│  ◆ EYEBROW              accent diamond glyph + uppercase tracked label
│  Headline sentence.     H2 — always a full sentence, always ends in a period
│  One- or two-line dek.  --muted, max ~62ch
│
│  [ PAYLOAD ]            cards / mock / accordion / grid — the part that varies
└──────────────────────────────────────────────────────────
```

The `◆` diamond is Vellar's repeated mark: eyebrow bullet, list bullets, marquee
separator, corner ornament on mock cards. It takes the section's accent color.

**Light/dark rhythm.** Full-bleed `--ink` panels break up the paper. Dark panels are
always the *demonstrate* moments; paper sections *explain*. Cards invert inside dark
panels (ink fill on a slightly lifted tone, `--ink-inv` text, accent shadow retained).
Mark the dark sections in §6 — do not add more; the alternation loses force if
overused.

---

## 3. Illustration system

**No stock art, no 3D, no abstract gradients, no icon libraries with filled glyphs.**
Every illustration is a CSS/HTML mock of the actual product, built from the same card
primitives as the rest of the page, slightly rotated (0.4–1.2deg) and carrying the
hard shadow. Line icons only — 1.75px stroke, currentColor, inherit the section accent.

You will build these mocks (content specified in §6):

1. **Agent budget card** — agent name, session-key expiry, a budget meter, payment
   count, and three policy chips.
2. **402 handshake strip** — a vertical sequence of request/response rows stepping
   from `402` to `200 OK`.
3. **Trust-ranked list** — three API rows with price and a verified badge.
4. **Swap panel** — YOU SELL / YOU RECEIVE with token amounts.
5. **Send confirmation** — a 4-row label→value list ending in `Signed with Passkey`.
6. **SDK terminal** — a window chrome with three dots, then mono lines with trailing
   status badges.

---

## 4. Animation spec

Subtle, purposeful, never decorative. Nothing bounces, nothing spins, nothing parallaxes.

**Shared easing:** `cubic-bezier(.22, .9, .24, 1)` — front-loaded ease-out, "snap then
settle". Use it for anything that travels.

| # | Behaviour | Spec |
|---|---|---|
| 1 | **Scroll reveal** | `opacity 0→1` + `translateY(16px)→0`, 520ms, shared easing. `IntersectionObserver`, `threshold: .15`, `rootMargin: '0px 0px -10% 0px'`, unobserve after firing (never re-animate). Children stagger 60ms via `--i` custom property. |
| 2 | **Hero entrance** | On load, sequence: eyebrow pill → H1 lines → dek → CTAs → mock. H1 animates per-line as a clip reveal (`translateY(100%)→0` inside `overflow:hidden` wrappers), 700ms, 80ms stagger. Everything else fades+rises. Total under 1.4s. |
| 3 | **Marquee** | Duplicate the track, `transform: translateX(0→-50%)`, 42s linear infinite. `animation-play-state: paused` on hover. |
| 4 | **Count-up** | Budget figure and any numeric stat count from 0 to target over 900ms ease-out when first in view. Once only. Preserve decimal places. |
| 5 | **402 loop** | The handshake strip auto-advances one row every 900ms, highlighting the active row (accent left-border + row background lift), loops continuously, gated to viewport by IntersectionObserver. |
| 6 | **Horizontal accordion** | See §5 — this is the signature interaction. |
| 7 | **Card hover** | `translate(-2px,-2px)` and shadow `8px→10px`, 150ms. Reads as lifting off the page. |
| 8 | **Button hover** | `translate(2px,2px)` and shadow `6px→2px`, 120ms — the button presses *into* the page. On `:active`, `translate(4px,4px)` and shadow `0`. |
| 9 | **FAQ accordion** | Animate `grid-template-rows: 0fr → 1fr` (not max-height), 380ms shared easing. The `+` rotates 45° to an `×` over 240ms. One open at a time. |
| 10 | **SDK terminal** | Lines appear sequentially, 220ms apart; each trailing status badge pops in `scale(.85)→1` + fade, 200ms, 120ms after its line. Runs once when in view. |
| 11 | **Sticky nav** | Transparent at top. Past 80px scroll, gains a 2px ink bottom border and the paper background solidifies, 200ms. |
| 12 | **Link underline** | Nav and inline links: underline grows from left, `transform: scaleX(0→1)`, `transform-origin: left`, 220ms. |
| 13 | **Verified badge** | On first reveal only, one subtle pulse — `scale(1→1.06→1)`, 420ms. Never repeats. |

**Reduced motion is mandatory.** Wrap in `@media (prefers-reduced-motion: reduce)`:
kill all transforms and keep opacity-only transitions at 150ms; stop the marquee;
disable accordion autoplay and the 402 loop; render count-ups at final value
immediately. Hover responses may stay — they are user-initiated, not ambient.

---

## 5. Signature interaction — the services accordion

Render the nine wallet-services items (§6, section 07) as a **horizontal spread
accordion**: a row of narrow vertical slats, one expanded into a full dark card.

**Layout — animate `flex-grow`, never `width`:**

```css
.rail   { display:flex; gap:12px; height:430px; }
.slat   { flex:1 1 0%; position:relative; overflow:hidden; cursor:pointer;
          border:2px solid var(--ink); border-radius:28px;
          background:var(--surface); z-index:1;
          transition: flex-grow .55s cubic-bezier(.22,.9,.24,1),
                      background-color .4s, box-shadow .4s, transform .15s; }
.slat[aria-expanded="true"] { flex:5.4 1 0%; background:var(--ink); z-index:2;
                              box-shadow:10px 10px 0 0 var(--accent); }
```

Because every slat is `flex-basis: 0`, the eight siblings absorb the difference
automatically — the row's total width never changes, so there is no reflow and no JS
width math. `border-radius: 28px` reads as a pill when collapsed and as a card when
open. One value, two apparent shapes.

**The crossfade is the craft.** The two inner elements swap on deliberately
asymmetric timings so content is never rendered in a container too narrow to hold it:

| Element | Opening | Closing |
|---|---|---|
| Vertical slat label | `opacity .12s ease` → 0 | `opacity .2s ease .4s` → 1 |
| Expanded body | `opacity .25s ease .38s` → 1 | `opacity .08s ease` → 0 |

Opening timeline: label leaves in 120ms → width expands into an empty shell → body
begins arriving at 380ms, when the width is ~95% settled → fully opaque at ~630ms.
The empty middle moment is intentional.

**Collapsed slat** (top to bottom): index number in mono; item name centred with
`writing-mode: vertical-rl` + `transform: rotate(180deg)` so it reads bottom-to-top;
an 8px accent dot at the base.

**Open panel:** accent-filled pill with a dot and a one-noun role tag; item name in
mono at ~1.8rem in `--ink-inv`; description at `--muted-inv`; a mono meta line; an
outlined `Learn more →` button with a cream border.

**Behaviour:**

```js
// autoplay advances every 4600ms, wrapping % 9
// IntersectionObserver on the rail: isIntersecting → resume, else clearInterval
// pointerenter / focus / click on a slat → clearInterval + jump to that index instantly
// pointerleave on the rail → resume
// prefers-reduced-motion → autoplay never starts; hover still expands
```

Fix these three things the reference implementation gets wrong:

- Zero-pad correctly — `String(i+1).padStart(2,'0')`, so the ninth is `09`, not `009`.
- Add a thin accent progress bar along the open panel's bottom edge that fills over
  the 4600ms dwell, so the auto-advance is telegraphed rather than surprising.
- Wire `aria-expanded` / `aria-controls`, give slats a visible focus ring, and make
  `focus` behave identically to `pointerenter` so keyboard users get the same thing.

**Below 900px** the accordion collapses to a vertical stack of normal cards with no
autoplay. Below 720px all 3-column grids become single column and section padding
drops to 72px.

---

## 6. Page structure and copy

Use this copy **verbatim**. Eyebrows are given in caps; render them as the eyebrow style.

### Nav (sticky)
Wordmark `VELLAR`. Links: `About` · `x402` · `FAQ` · `Docs` · `Explorer`.
Primary button: `Launch app`.

### 01 — Hero *(paper)*
- Status pill: `STELLAR TESTNET · LIVE` with a pulsing green dot
- H1: **Give your agent a budget, not your keys.**
  Wrap "a budget" in a hand-drawn highlight box — an irregular sketched rectangle
  (inline SVG path, 2px ink stroke) with a green offset behind it. This is the one
  place the geometry is allowed to break.
- Dek: *Vellar is building the agent-payments stack for Stellar on x402 — smart accounts that pay HTTP-402 APIs autonomously, budgets enforced on-chain, and trust-ranked discovery. Secured by passkeys, not seed phrases.*
- Buttons: `Launch web app →` (primary, green shadow) · `Build with the SDK` (secondary)
- Payload: **Agent budget card** + **trust-ranked list**, arranged as a loose diagram
  with a thin ink connector line labelled `Agent key` on the left and `Bazaar` on the right.

### Marquee strip
Uppercase, `◆` separators, accent-cycled:
`BUDGETS ENFORCED ON-CHAIN` · `NO SEED PHRASES` · `FEE-SPONSORED` · `SELF-CUSTODIAL` · `PASSKEYS, NOT KEYS` · `TRUST-RANKED DISCOVERY`

### 02 — BUILDING ON X402 *(paper)*
- H2: **The agent-payments stack for Stellar.**
- Dek: *x402 is the open protocol that turns HTTP 402 into machine-payable APIs. We're building every layer of it on Stellar: the payer — smart accounts with scoped agent keys — the settlement rails, and trust-ranked discovery so agents pay the right services.*
- Three numbered cards:
  - `01` **Agent keys with on-chain budgets** — *One passkey tap mints your agent a scoped session key — locked to the tokens you choose, capped by a spending-limit policy. The budget lives in a contract, not in code the agent could bypass, and you can revoke the key remotely any time.* — accent `--green`
  - `02` **Autonomous payments via the SDK** — *The first x402 client built for Stellar smart accounts. One call handles the 402 challenge — sign headlessly, pay, get the resource. An over-budget payment fails on-chain before any money moves.* — accent `--violet`
  - `03` **Facilitator + trust-ranked Bazaar** — *Our open-source facilitator verifies and settles x402 payments — including policy-governed smart accounts other facilitators reject — and its Bazaar lets agents discover payable APIs ranked by real settlement data and contract verification.* — accent `--sky`
- Buttons: `Read the agent-keys guide` · `Facilitator on GitHub`

### 03 — THE PAYMENT LOOP *(**dark**)*
No new copy — this section visualises what section 02 described.
- H2: **One call. Signed, capped, settled.**  *(the only headline you may write; keep it to this)*
- Payload, three columns:
  - **Agent budget card** — `AGENT` / `research-bot` / `session key expires GDW3…K7QP in 7d` / `BUDGET USED` / `3.20 / 25 USDC` / `12 payments enforced on-chain` / chips: `Spend limit` `Verified only` `Revoke`
  - **402 handshake strip** — rows: `GET /v1/resear…` `402` → `price 0.10 USDC` → `poli… ✓ under budget` → `PAYMENT-SI… ✓ signed` → `settled on-… 200 OK`. Animate per §4.5.
  - **Trust-ranked list** — `Research API` `0.10 USDC / CALL` `· VERIFIED` / `Weather API` `0.05 USDC · verified` `Pay` / `Translate API`

### 04 — EVERYDAY ACTIONS *(paper)*
- H2: **Your everyday Stellar wallet.**
- Payload: a two-up of mocks — **Swap panel** (`YOU SELL` `100` `XLM` / `YOU RECEIVE` `18.98` `USDC`) and **Send confirmation** (`✓ Sent`; `You are sending` `166.6 XLM` / `Fee` `Sponsored` / `Policy` `✓ OK` / `Signed with` `Passkey`). Accent `--coral`.
- Two cards below:
  - **Web-first** — *Create and use your smart wallet straight from the browser — no download, no seed phrase. Just a passkey.* — button `Launch web app`
  - **Developer SDK** — *Add passkey login and a Stellar smart wallet to your app in minutes — self-custodial, fee-sponsored, no seed phrases.* — button `Read the docs` — accent `--violet` — includes the **SDK terminal** mock:
    ```
    $ npm install vellar-sdk
    import { createVellarWallet }
    await vellar.create()          ✓ passkey
    await vellar.pay()             ✓ sent
    await vellar.x402.fetch(u…)    ✓ paid
    ```

### 05 — BROWSER EXTENSION *(**dark**)*
- H2: **Connect to any Stellar dApp.**
- Dek: *The Vellar extension pairs with your wallet once, then approves dApp connections and signing — with the same passkey and on-chain policies you already set. No seed phrase ever enters the browser.*
- Three numbered steps on a horizontal rail with diamond nodes (accent `--amber`):
  - `01` **Pair once** — *Approve the extension from your wallet with a single passkey tap. It gets a secure device key — bound to your account, and it expires automatically.*
  - `02` **Connect to dApps** — *When a Stellar app requests access, the extension shows exactly which site is asking. You approve per-origin — nothing connects silently.*
  - `03` **Review & sign** — *Every transaction is decoded and shown before you approve. Your spending limits and policies are enforced on-chain — the extension can't bypass them.*

### 06 — WALLET SERVICES *(paper)*
- H2: **Everything a smart wallet should do.**
- Dek: *Agents are only half the story. Vellar is a full self-custodial smart wallet for people too — passkeys, programmable policies and trust signals layered over your Stellar account. No custody, no compromises.*
- Payload: the **horizontal spread accordion** from §5, nine items. Role tags are
  yours to write as one short noun phrase each; keep them plain.

| # | Name | Description | Accent |
|---|---|---|---|
| 01 | Instant DEX swaps | Trade Stellar assets natively without leaving your wallet — settled on-chain in seconds. | coral |
| 02 | Programmable policies | Spending limits, co-signers, time locks and allow-lists — enforced by the network, not a promise. | green |
| 03 | Contract verification | See exactly what a contract does before you sign. Vellar flags what's verified and what's risky. | sky |
| 04 | Sponsored fees | Vellar sponsors network fees on everyday transactions — no need to hold XLM just to get started. | amber |
| 05 | Passkey security | Unlock with Face ID, Touch ID or a security key. Keys live in your device's secure enclave — nothing to write down, nothing to leak. | green |
| 06 | Guided account cleanup | Reclaim locked reserves from unused trustlines and stale entries. Every step is laid out for you to review and sign — closing an account moves its funds and can't be undone. | violet |
| 07 | Non-custodial | Your account and keys live on Stellar and in your enclave. We never touch your funds. | green |
| 08 | Trust signals | Every signature comes with a plain-language breakdown and a risk score before you approve. | sky |
| 09 | Developer SDK | Ship passkey auth, policies and contract-verification tooling into your own Stellar app. | violet |

### 07 — QUESTIONS *(paper)*
- H2: **Frequently asked questions**
- Dek: *Still curious? Reach us at hello@vellar.xyz or read the developer docs.*
  (`hello@vellar.xyz` and `developer docs` are links.)
- Two-column layout: heading block left, accordion right. Questions:
  - Can my AI agent spend from my wallet?
  - Is Vellar custodial?
  - What happens if I lose my device?
  - Do I need the browser extension?
  - What are programmable policies, exactly?
  - Is it ready for teams and developers?

  Answers are not in the source copy. Render each panel with a short placeholder
  paragraph marked `<!-- TODO: answer copy -->` — do not invent answers.

### 08 — CTA *(**dark**)*
- H2: **Try out the SDK**
- Dek: *Add passkey login, a Stellar smart wallet and x402 agent payments to your app in minutes — self-custodial, fee-sponsored, no seed phrases.*
- Buttons: `Read the docs` · `View on GitHub`

### Marquee strip
`PASSKEYS` · `POLICIES` · `TRUST` · `AGENTS` — repeated, `◆` separated.

### Footer *(dark)*
- Wordmark + tagline: *The agent-payments stack for Stellar, built on x402 — passkey smart wallets, programmable policies and trust signals, for people and their agents.*
- Three columns:
  - **PRODUCT** — Wallet · Extension · Agent payments · FAQ
  - **DEVELOPERS** — Documentation · Quickstart · SDK reference · GitHub
  - **COMPANY** — About · Security · Contact
- Hairline rule, then: `© 2026 Vellar · Built on Stellar` left, `passkeys · policies · trust · agents` right.

---

## 7. Quality bar

- Semantic HTML — `header`, `nav`, `main`, `section`, `footer`; one `h1`; headings in order.
- Every interactive element is keyboard reachable with a visible focus ring
  (2px ink outline, 3px offset). The accordion, FAQ, and nav all work without a mouse.
- Text contrast meets WCAG AA. Verify `--muted` on `--paper` and `--muted-inv` on `--ink`.
- Respect `prefers-reduced-motion` everywhere, per §4.
- Responsive at 1440 / 1024 / 768 / 390. Nothing overflows horizontally at any width;
  if the accordion rail would exceed the viewport, it stacks (§5).
- All animation runs on `transform` and `opacity` only. No layout-thrashing properties
  in transitions except the accordion's `flex-grow`, which is deliberate.
- Comment the CSS with section markers so it's navigable.

## 8. Do not

- Do not add sections, features, statistics, logos, testimonials, or pricing that
  aren't in §6.
- Do not use gradients as fills, glassmorphism, blurred shadows, drop-shadow filters,
  or glow effects.
- Do not use emoji as icons.
- Do not use `localStorage` or `sessionStorage`.
- Do not parallax, do not scroll-jack, do not auto-play anything that isn't
  viewport-gated and reduced-motion aware.
- Do not exceed one dark section per two paper sections.

---

**Swap points**, if the brand direction changes: the accent set in §1 (`--green` is the
only load-bearing one — the other five are supporting and can be re-picked wholesale),
and the type pair (any geometric sans + any mono works, provided the semantic split holds).