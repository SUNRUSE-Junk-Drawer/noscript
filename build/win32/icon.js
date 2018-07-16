import * as fs from "fs"
import * as path from "path"
import BuildStage from "./buildStage"

import favicons from "./../favicons"
import createTempDirectory from "./createTempDirectory"

class IconBuildStage extends BuildStage {
  constructor() {
    super(`icon`, [favicons, createTempDirectory], false)
  }

  performStart() {
    const file = favicons.response.images.find(image => image.name == `win32.ico`)
    fs.writeFile(path.join(`temp`, `win32`, `logo.ico`), file.contents, error => this.handle(error, () => this.done()))
  }
}

export default new IconBuildStage()
