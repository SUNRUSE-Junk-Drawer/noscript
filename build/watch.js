import * as chokidar from "chokidar"
import * as favicons from "./favicons"
import * as macosIcons from "./macosIcons"

chokidar.watch([`src/logo.svg`, `src/metadata.json`])
  .on(`error`, error => { throw error })
  .on(`all`, () => {
    favicons.generate()
    macosIcons.generate()
  })
