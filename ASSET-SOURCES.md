# Asset provenance

## Current local-source captures

Captured on 2026-11-17 from the running current local product source at `/Users/misaki/Projects/Ollaic_GaLaGame-Maker`, commit `6f55e4ac846ac0a670d315b66443487c27be8d54`, clean working tree before and after capture. No release binary was used for these screenshots.

Startup: `pnpm tauri:dev` compiled the current Rust application. After the capture tool confused the shared release bundle identifier, the compiled `target/debug/ollaic` was relaunched through an ignored local `.app` wrapper with a distinct identifier. Its executable is a symlink to that same locally compiled binary. `pnpm --dir apps/desktop exec vite` served the current frontend at `http://127.0.0.1:1420/`, verified in the native window accessibility tree. No product source or configuration was edited.

- `docs/assets/ollaic-local-editor.png`: current script editor and idle assistant with original demonstration dialogue.
- `docs/assets/ollaic-local-workflow.png`: current Stage 1 configuration, not executed; existing environment validation is visible, not a claim of successful generation.
- `docs/assets/ollaic-local-scene-graph.png`: current scene graph with the demo project's single scene.

All three prior release-package screenshots were removed from the current tree and page references. Git history retains previous commits. No recording was made. The demo project is stored outside the product repository under the website's ignored `_local/`. No private project content or third-party game artwork is included. No AI request was initiated or credential settings opened.

## Existing product icon

`docs/assets/ollaic-icon.png` is copied from `apps/desktop/src-tauri/icons/icon.png` at product commit `6f55e4ac846ac0a670d315b66443487c27be8d54`.

Source: https://github.com/Monkey-Rotten-Net-Group/Ollaic_GaLaGame-Maker/blob/6f55e4ac846ac0a670d315b66443487c27be8d54/apps/desktop/src-tauri/icons/icon.png

## Intended use

The product owner explicitly authorized public, noncommercial product presentation in the OL-005 follow-up (“我不商用，我纯放开给大家玩的”). These captures are collected for that authorized website use. This is not a commercial-use assertion or a general license grant. No license text is invented for the product or these assets.
