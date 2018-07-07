import * as chokidar from "chokidar"
import * as icons from "./icons"

chokidar.watch([`src/logo.svg`, `src/metadata.json`])
  .on(`error`, error => { throw error })
  .on(`all`, icons.generate)
