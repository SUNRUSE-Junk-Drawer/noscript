import * as chokidar from "chokidar"
import metadata from "./metadata"
import favicons from "./favicons"
import "./macos/index"
import "./wasm/index"
import "./win32/index"

chokidar.watch(`src/metadata.json`)
  .on(`error`, error => { throw error })
  .on(`all`, () => metadata.start())

chokidar.watch(`src/logo.svg`)
  .on(`error`, error => { throw error })
  .on(`all`, () => favicons.start())
