import * as fs from "fs"
import * as path from "path"
import * as uglifyJs from "uglify-js"
import BuildStage from "./buildStage"

import createDirectory from "./createDirectory"

class BootloaderBuildStage extends BuildStage {
  constructor() {
    super(`bootloader`, [createDirectory], false)
  }

  performStart() {
    const inputPath = path.join(`build`, `wasm`, `bootloaderScript.js`)
    this.log(`Reading "${inputPath}"...`)
    fs.readFile(inputPath, { encoding: `utf8` }, (error, rawScript) => this.handle(error, () => {
      this.log(`Uglifying...`)
      const uglified = uglifyJs.minify(rawScript, {
        ie8: true,
        mangle: {
          toplevel: true
        },
        toplevel: true
      })
      this.handle(uglified.error, () => {
        const outputPath = path.join(`dist`, `wasm`, `bootloader.js`)
        this.log(`Writing "${outputPath}"...`)
        fs.writeFile(outputPath, uglified.code, error => this.handle(error, () => this.done()))
      })
    }))
  }
}

export default new BootloaderBuildStage()
