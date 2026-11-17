# Ollaic website

Desktop website prototype for Ollaic, deployed to GitHub Pages via `/docs` on `main`.

Live site: https://monkey-rotten-net-group.github.io/ollaic-website/

## Architecture

Static HTML, CSS, and vanilla JavaScript without runtime frameworks or build dependencies.
- `docs/index.html`: Interactive desktop prototype baseline (~1440 × 900)
- `docs/style.css`: Typography, layout, and reduced-motion styling
- `docs/motion.js`: Runtime-measured native scroll progression and spatial choreography
- `docs/assets/`: Disclosed prototype interface captures and locally bundled web fonts

Local preview:
```sh
python3 -m http.server --directory docs 8080
```

## Product positioning and truth

- Ollaic is a desktop visual novel editor based on WebGAL. It does not replace the WebGAL runtime engine.
- Official releases: only verified v0.2.0 packages are linked.
- Asset and font provenance: see [ASSET-SOURCES.md](ASSET-SOURCES.md).
