# Desktop motion and scroll specification

The implementation in `../motion.js` is authoritative. All transitions below are implemented. The baseline viewport is 1440 × 900, with native vertical scrolling.

## Progress model

For each scroll container:

`p = clamp((scrollY - section.offsetTop) / (section.offsetHeight - innerHeight), 0, 1)`

`range(p, a, b) = clamp((p - a) / (b - a), 0, 1)`

`smooth(p) = p × p × (3 - 2 × p)`

Transforms are computed from current progress; they do not accumulate velocity or run a simulated timeline. Scrolling backward restores the same composition. Resizing remeasures section geometry. A deep link such as `index.html?chapter=journey&progress=0.9` computes the corresponding position from the current desktop viewport.

## Opening

On a normal-motion load, the wordmark reveals vertically through a clip over 1100ms. Its independent `translate` travels 60px to zero. The interface enters from a 100px diagonal offset over 1400ms with opacity. Both use `cubic-bezier(.22,1,.36,1)` and begin immediately. Navigation, product positioning and the download action are never behind a loading overlay.

Hero scroll range: 180vh total, 80vh travel (720px at baseline).

| Element | Progress / behavior |
| --- | --- |
| Wordmark | Smoothstep-driven translation to -10vw / -20vh, scale 1 → 1.15. Opacity falls over p .10–.65. |
| Positioning line | Opacity falls over p 0–.30. |
| Chinese title and primary action | Move up 160px; fade over p .05–.48; become visibility:hidden after .60 so an invisible link cannot retain keyboard focus. Header download navigation remains available. |
| Interface plane | Left 45% → 12%; top 43% → 26%; width 65% → 76%; perspective 1600px; rotateY -7° → 0° and rotateZ -7° → 0°. |
| Overview copy | Enters over p .65–.95 with a remaining 30px offset. |

## Narrative grid → scene

The narrative and scene share **one** sticky viewport, not two repeated full-screen illustrations. Journey height is 315vh; travel is 215vh (1935px at baseline).

Let `n = range(p, 0, .65)` and `s = range(p, .65, 1)`.

- Selected SVG path has normalized pathLength 1; dash offset falls 1 → 0 over n 0–.60. The alternate route remains a muted hairline.
- The scene endpoint appears over n .38–.60.
- Let `e = smooth(range(n, .63, 1))`. The endpoint expands from 12% × 19% to 100% × 100%; its right inset falls 4% → 0 and top 37% → 0.
- Map and heading move left by up to 80px / 120px while fading over n .68–.90 and .65–.88. The diagram disclosure fades over n .60–.80.
- The scene layer crossfades over journey p .65–.72. The full-size endpoint under it remains the same source image, so the background does not restart in a second scrolling panel.
- During s 0–1, the environment scales 1 → 1.08 and translates left up to 1.5%. The title moves up 50px and supporting copy up 20px.
- The inspector rises from a 130px offset using smoothstep over s 0–.70; rotation moves 5° → -2° throughout s.

The map is labeled as a narrative-structure illustration. These are conceptual paths, not fake clickable product controls.

## Production

Height 180vh; travel 80vh. A violet field replaces the paper / scene palette. Oversized background AI lettering is clipped deliberately, not used as a separate decorative badge.

With `f = smooth(p)`:

- AI lettering translates -100px in X; rotation -9° → 0°.
- Copy shifts up 35px.
- Production interface translates -70px / -45px; rotation 5° → -1°.
- Memory plane moves +55px / -90px; rotation -8° → 3°.
- The four-step route remains stable as a reading reference. It is an editorial process overview, not a live task counter.

## Preview → WebGAL export

Height 230vh; travel 130vh. Let `e = smooth(range(p, .15, .85))`.

- Preview copy moves up 100px and fades over p .12–.45.
- Preview plane moves from left -4% / top 24% / width 67% to left 4% / top 31% / width 30%. Rotation settles from rotateY 8° and rotateZ -3° to zero.
- The SVG export route draws over p .40–.82.
- Export title and explanation enter over p .45–.72 with up to 50px vertical offset.
- WebGAL lettering enters over p .65–.95 with up to 100px vertical offset. It identifies the runtime project destination, not a new download format or a separate Ollaic engine.

## Navigation and hover

No wheel interception or custom cursor. Header anchors use native smooth navigation with 72px scroll padding. Download package anchors are ordinary links. Primary-action arrow moves 3px right / 3px up over 250ms; package background / foreground changes over 180ms. Focus uses a 3px #B990FF outline with a 7px offset. Header color changes directly at the chapter boundary; it does not crossfade unreadably during scrolling.

## Reduced motion and JavaScript failure

`prefers-reduced-motion: reduce` removes the motion class, clears inline motion styles and uses natural document flow. No sticky stage, scene expansion, perspective interpolation, entrance, hover animation or smooth navigation remains. All four narrative stages, both production references, preview, export and all package links remain present. The scene is not hidden behind the narrative layer. Preview and export become two visible parts of a 1500px natural-flow section.

A live preference change reconfigures the same document without reload. No-JavaScript rendering uses this complete normal-flow composition by default. `?view=flow` provides the same static reading layout for review independently of the OS preference. The static scene may retain a fixed angled sheet as a composition; it does not move.

## Exporting and reviewing

`frames/manifest.json` records exact offsets for all 16 normal-motion keyframes. `frames/desktop-full-flow.png` records the static full flow, and `frames/reduced-motion-opening.png` records its opening. These serve different purposes; do not treat the flattened flow as a single position in the animated timeline.

To reproduce through the installed browser skill runtime, run from the repository root:

```sh
ego-browser nodejs < _local/designs/marketing-site-20261117-awwwards/build/capture.js
```

The script uses the existing task space if available, explicitly sets 1440 × 900, waits for fonts, images and entrance completion, then captures each measured position. It installs nothing and starts no server. Finish its browser task space separately after inspecting the output.
