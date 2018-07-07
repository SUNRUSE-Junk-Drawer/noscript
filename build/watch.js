import * as chokidar from "chokidar"
import * as favicons from "./favicons"
import * as macosIcons from "./macosIcons"
import * as win32Icons from "./win32Icons"

chokidar.watch([`src/logo.svg`, `src/metadata.json`])
  .on(`error`, error => { throw error })
  .on(`all`, () => {
    favicons.generate()
    macosIcons.generate()
    win32Icons.generate()
  })
