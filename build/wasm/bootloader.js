import * as fs from "fs"
import * as path from "path"
import mkdirp from "mkdirp"
import * as uglifyJs from "uglify-js"
import BuildStage from "./buildStage"

import deletePreviousBuilds from "./../deletePreviousBuilds"

class BootloaderBuildStage extends BuildStage {
  constructor() {
    super(`bootloader`, [deletePreviousBuilds], false)
  }

  performStart() {
    const inputPath = path.join(`build`, `wasm`, `bootloaderScript.js`)
    this.log(`Reading "${inputPath}"...`)
    fs.readFile(inputPath, { encoding: `utf8` }, (error, rawScript) => {
      this.handle(error)

      this.log(`Uglifying...`)
      const uglified = uglifyJs.minify(rawScript, {
        ie8: true,
        mangle: {
          toplevel: true
        },
        toplevel: true
      })
      this.handle(uglified.error)

      const distPath = path.join(`dist`, `wasm`)
      this.log(`Creating dist path "${distPath}"...`)
      mkdirp(distPath, error => {
        this.handle(error)

        const outputPath = path.join(distPath, `bootloader.js`)
        this.log(`Writing "${outputPath}"...`)
        fs.writeFile(outputPath, uglified.code, error => {
          this.handle(error)
          this.done()
        })
      })
    })
  }
}

export default new BootloaderBuildStage()
