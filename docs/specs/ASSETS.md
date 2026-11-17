# Assets, provenance and font distribution

All product material is from the local sources explicitly permitted by the brief. No installed v0.2.0 screen capture is claimed. Preserve the visible development / prototype disclosures. The site contains no external stock art, fabricated people, third-party social proof or generated cinematic illustration.

Paths below are relative to `/Users/misaki/Projects/Ollaic_GaLaGame-Maker/` unless stated otherwise.

| Runtime file | Original source | Treatment / use |
| --- | --- | --- |
| `assets/stage-study.png` | `_local/work/workspace-prototype/variant-B.png` | Unmodified full screenshot of an internal design exploration, 2316 × 1299. Opening / workbench plane. CSS viewport shows its upper 2316 × 1160 region, excluding the prototype navigation dock near the bottom. |
| `assets/editor-study.png` | `_local/work/workspace-prototype/variant-A.png` | Unmodified full screenshot, 1440 × 1000. Scene inspector is a CSS crop from the right sidebar at x1110 / y322, inside a 420px-tall plane. |
| `assets/scene-plate.png` | `_local/work/workspace-prototype/variant-B.png` | Existing crop copied from `_local/designs/marketing-site-20261117/assets/scene-plate.png`. Its recorded recipe is x190 / y200 / width1650 / height650, in that design's `build/crops.json`. Used for the branch endpoint and continuous environment. This is the artwork already embedded in an internal prototype, not a newly captured release scene. |
| `assets/production-flow.png` | `_local/work/flow-redesign/production-desktop.png` | Unmodified 1440 × 900 source. Production interface, visually cropped to the top 430px of its scaled plane. No runtime progress is simulated. |
| `assets/app-agent.png` | `_local/work/flow-redesign/editor-large-preview.png` | Unmodified 1440 × 900 source, inherited through the earlier design assets. Despite the legacy filename, this is the large live-preview reference, not a separate Agent product. |
| `assets/app-memory.png` | `_local/work/flow-redesign/editor-large-preview.png` | Existing crop copied from `_local/designs/marketing-site-20261117/assets/app-memory.png`. Recorded recipe x1046 / y60 / width394 / height780. CSS translates the crop to show the lower project-memory area. |

Original-image hashes and delivered-image hashes can be compared for the four unmodified sources. `assets.json` records SHA-256 and file size for each delivered runtime asset and font. The two inherited crops have an explicit source and crop recipe; their recipe file remains in the earlier design directory and was read without modification.

The user's brief expressly permits using these local product / internal-prototype images for the noncommercial showcase. That authorization does **not** establish a public copyright license for every embedded illustration or for the repository. This handoff makes no such license claim. If public provenance requirements change, retain the composition and replace the disclosed reference material with verified release captures or newly cleared artwork. Do not relabel these images as v0.2.0 screenshots.

## Fonts

All runtime fonts are bundled locally; the prototype makes no Google Fonts request. The font binary downloads were obtained from the official Google Fonts CSS endpoint. Exact generated CSS responses, including source URLs, are preserved under `build/*-source.css`.

| Family | Delivered file | Use | License source |
| --- | --- | --- | --- |
| Fredoka 600 | `fonts/fredoka-600.ttf` | Ollaic typography, AI chapter background, WebGAL export endpoint, platform names | `https://raw.githubusercontent.com/google/fonts/main/ofl/fredoka/OFL.txt` |
| Noto Sans SC 400 | `fonts/noto-400.ttf` | Chinese copy, descriptions, source disclosures | `https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/OFL.txt` |
| Noto Sans SC 700 | `fonts/noto-700.ttf` | Chinese display headings | Same Noto source |
| Geist Mono 400 | `fonts/geist-400.ttf` | Platform architectures, file extensions, small diagram labels | `https://raw.githubusercontent.com/google/fonts/main/ofl/geistmono/OFL.txt` |

The table's paths are relative to `assets/`. The three accompanying `*-OFL.txt` files contain the SIL Open Font License 1.1 and upstream copyright notices. The license permits commercial use under its conditions; this does not imply a software license for Ollaic. Keep the license files with redistributed fonts.

The two CJK files are official page-text subsets requested with the Google Fonts `text` parameter. They cover the current HTML text, not arbitrary future Chinese content. After changing copy, rerun `build/fonts.py` and verify the new source CSS / licenses; alternatively use a properly licensed full self-hosted build in production. Fredoka and Geist Mono are bundled full files for the selected weight. No local system font is required for the intended Latin / Chinese composition.

## Original design material

- Grain is an inline SVG `feTurbulence` texture authored in this prototype. It is a noninteractive fixed layer, not a downloadable image resource.
- Diagram and export paths are inline SVG authored for the website narrative. They are labeled as illustrative rather than passed off as product UI.
- Light, sheet edges, perspective, type cropping and shadows are CSS. No external brand artwork is reused.
- The large Ollaic type treatment is a website wordmark composition in Fredoka, not a claim that a new official logo has been adopted.

`archive/first-pass/` preserves the earlier unfinished work from this new directory. It is not part of the current implementation or asset standard. Other historical website directories were only read for product material and provenance; their designs were not edited.
