import * as fs from "fs"
import * as path from "path"
import mkdirp from "mkdirp"
import BuildStage from "./buildStage"

import favicons from "./../favicons"
import deletePreviousBuilds from "./../deletePreviousBuilds"

class IconBuildStage extends BuildStage {
  constructor() {
    super(`icon`, [favicons, deletePreviousBuilds], false)
  }

  performStart() {
    const file = favicons.response.images.find(image => image.name == `win32.ico`)

    const tempPath = path.join(`temp`, `win32`)

    this.log(`Creating temp path "${tempPath}"...`)
    mkdirp(tempPath, error => {
      this.handle(error)

      const logoPath = path.join(tempPath, `logo.ico`)
      this.log(`Writing to "${logoPath}"...`)
      fs.writeFile(logoPath, file.contents, error => {
        this.handle(error)
        this.done()
      })
    })
  }
}

export default new IconBuildStage()
