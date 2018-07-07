import * as chokidar from "chokidar"
import * as wasmIcons from "./wasm/icons"
import * as macosIcons from "./macos/icons"
import * as win32Icons from "./win32/icons"

chokidar.watch([`src/logo.svg`, `src/metadata.json`])
  .on(`error`, error => { throw error })
  .on(`all`, () => {
    wasmIcons.generate()
    macosIcons.generate()
    win32Icons.generate()
  })
