# Ollaic — desktop website design handoff

Prepared for 米撒奇 and DevelopmentBot on 2026-11-17. The scope correction at the top of the Awwwards brief governs this package: **desktop only, 1440 × 900 review baseline**. Tablet and phone design are deferred. This package is a design prototype, not a production release or an assertion of an Awwwards award. Visual acceptance belongs to 米撒奇.

## Open the design

| File | Purpose |
| --- | --- |
| `index.html` | Final interactive desktop prototype. Open directly in Chromium; no server, installation or account required. |
| `review.html` | All 16 desktop keyframes, labeled with actual scroll positions and links to chapter progress. |
| `frames/desktop-full-flow.png` | Complete, flattened page flow at 1440px width. This uses the static / reduced-motion composition, not a misleading full-page capture of blank sticky scroll ranges. |
| `index.html?view=flow` | Readable normal-flow version of every chapter, including preview and export. |
| `frames/manifest.json` | Exact frame dimensions, chapter progress, requested and actual scroll positions. |
| `specs/tokens.json` | Color, type, spacing, material and timing tokens. |
| `specs/MOTION.md` | Implemented scroll geometry, transitions, anchor behavior and reduced-motion behavior. |
| `specs/ASSETS.md` | Product screenshot provenance, crop coordinates and font licensing. |
| `specs/verification.json` | Browser audit results. |
| `specs/interaction-checks.json` | Deep-link, reverse-scroll and shorter desktop-window observations. |

`style.css` and `motion.js` are the executable design source. No Figma document is needed. The prototype has no runtime network dependency: fonts, interface references and grain are local or inline. The download and repository anchors intentionally navigate to the canonical external GitHub URLs.

## Art direction

The working concept is the relationship between **a narrative structure and the scene it contains**. Ollaic's rounded letterforms become the opening scale reference; the interface is a physical plane, not an image inside a rounded feature card. That plane straightens on scroll. The next scene changes to a measured paper grid, where the chosen branch draws across the viewport and its endpoint expands into the scene itself. The scene and its editing controls occupy different depths. Production changes to violet and a pair of overlapping process / memory planes. Preview contracts into a small source plane while the export route and oversized WebGAL endpoint take its place. Downloads return to lavender and a simple platform manifest.

Typography is deliberately uneven in scale: the opening wordmark is about 497px at the baseline; chapter labels are 12px; the narrative title is about 112px. The cropping is intentional for the wordmark, background chapter typography and interface planes. Product positioning, source disclosures, primary navigation, package links and installation warnings remain readable.

The materials are lavender paper, ink, visible grain, off-axis sheet edges and finite cast shadows. The scene artwork is always a disclosed local interface-prototype reference. There are no stock portraits, invented users, badges, online dots, social proof, pricing or legal placeholders.

## Page flow and exact baseline geometry

| Stage | Document start | Total height | Sticky travel | Composition |
| --- | ---: | ---: | ---: | --- |
| Hero | 0px | 1620px | 720px | Giant Fredoka wordmark, Chinese product positioning, primary download anchor, angled dark workbench; unfolds into an overview. |
| Narrative → scene | 1620px | 2835px | 1935px | One continuous pinned viewport. Grid / branching map expands into the scene; the inspector enters on the same stage. |
| AI production | 4455px | 1620px | 720px | Violet field; oversized cropped AI type; production and project-memory reference planes move on opposing diagonals. |
| Preview → export | 6075px | 2070px | 1170px | Ink field; interface contracts, route draws, export statement and WebGAL type enter. |
| Download | 8145px | 1157px | none | Large Chinese heading, three platform rows, seven package links, installation and mobile availability notes. |
| Footer | 9302px | content-driven | none | Reversed Ollaic wordmark, back-to-top, repository and releases. |

Positions refer to the motion-enabled 1440 × 900 prototype. Use the formulas in `specs/MOTION.md` and runtime measurements when the desktop viewport height differs. Do not bake these scroll offsets into production code. Frame filenames and actual offsets are recorded in `frames/manifest.json`.

## Copy and product truth

The visible copy in `index.html` is the final copy for this design. There is no placeholder testimonial or marketing statistic. Interface sample names, dialogue and progress figures are part of the disclosed development screenshots; they are not claims about adoption or release performance.

- Ollaic is a desktop visual-novel editor **for WebGAL**, not a replacement runtime.
- The download target is **v0.2.0**, with all seven exact package URLs copied from the original brief. No newer release is advertised.
- AI is described as a multi-step Agent production process with project memory and human review. No AI music generation or one-click complete-game promise appears.
- Windows x64, Linux x86_64 and macOS Apple Silicon have package links. The macOS unsigned / Gatekeeper / quarantine warning is visible below the package rows.
- Android and iOS are described only as repository clients. No mobile store or released-package availability is implied.
- Repository and releases are the only external navigation categories. There are no invented license, legal-policy, community, pricing or online-play links.

A new installed v0.2.0 capture was not made. The design intentionally uses the screenshot / internal-prototype material expressly allowed by the brief. Disclosures are visible at the opening, scene, production and preview stages. Preserve them unless verified release captures replace those assets.

## Desktop layout and implementation

The baseline is 1440 × 900. Header height is 72px; the main horizontal gutter is 4.167vw (60px at baseline). Primary navigation has a functional anchor to the editing journey, AI production and download. The first focusable item is a skip-to-download link. Downloads remain usable without JavaScript.

The prototype uses native scrolling. It does not intercept the wheel, lock the page, add a custom scrollbar or require a loading screen. The scroll listener is passive and schedules at most one render per animation frame; there is no idle animation loop. Section dimensions are remeasured on resize and after local fonts finish loading.

The four scroll containers own their visual state. Presentation, progress calculation and source content remain separate in CSS, JavaScript and HTML. A production implementation can preserve this separation in framework components. No animation library is needed for the current behavior.

There is no 768px or 390px product-site composition in this delivery. The small media query in `review.html` only makes the **review sheet** usable; it does not claim a mobile website design. Earlier frames from the first unfinished attempt are preserved under `archive/first-pass/` and are explicitly excluded from the current handoff.

## Verification and delivery boundaries

The delivered desktop frames were rendered in the installed Ego Lite Chromium browser at 1440 × 900. The audit checks image decoding, local font loading, script errors, horizontal overflow, seven package anchors, first keyboard focus and skip navigation. A live switch to reduced motion checks normal-flow stages, visible scene and export content, no active animations and no lost media. Deep-link chapter positioning and reverse-scroll state restoration were also verified. A 1440 × 800 desktop check kept the primary action entirely visible without horizontal overflow. The flattened flow was visually inspected alongside the normal-motion keyframes. Details and exact observations are in `specs/verification.json`.

The package was also inspected for deliberate hierarchy, readable disclosures, chapter-to-chapter composition changes, reversible scroll states and absence of the forbidden promotional claims. The brief's art-direction requirements are represented in the actual prototype and frame sequence, rather than being deferred as production-only animation suggestions.

Not performed: Safari / Firefox validation, a deployed-site performance audit, release-binary installation or external package download. These are production acceptance checks, not evidence supplied by this design package. Visual approval against the requested Awwwards standard is still a review decision for 米撒奇; no independent award or rating is claimed.

No product source, lockfile, dependency manifest, branch, commit, remote repository, signing setting or deployment was changed. All deliverables and scratch exports are confined to this Git-ignored `_local/designs/marketing-site-20261117-awwwards/` directory. No messages were sent to DevelopmentBot or other people.
