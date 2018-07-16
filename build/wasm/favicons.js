import * as fs from "fs"
import * as path from "path"
import BuildStage from "./buildStage"

import favicons from "./../favicons"
import createDirectory from "./createDirectory"

class FaviconsBuildStage extends BuildStage {
  constructor() {
    super(`favicons`, [favicons, createDirectory], false)
  }

  performStart() {
    const files = favicons.response.images
      .concat(favicons.response.files)
      .filter(file => file.name != `win32.ico`)
      .filter(file => !file.name.startsWith(`macos_`))

    const distPath = path.join(`dist`, `wasm`)

    this.log(`Writing ${files.length} files...`)
    let remainingToWrite = files.length

    if (!remainingToWrite) {
      this.done()
    }

    files.forEach(file => fs.writeFile(path.join(distPath, file.name), file.contents, error => this.handle(error, () => {
      remainingToWrite--
      if (remainingToWrite) {
        if (remainingToWrite % 10 == 0) {
          this.log(`\t(${remainingToWrite} left)`)
        }
        return
      }

      this.done()
    })))
  }
}

export default new FaviconsBuildStage()
