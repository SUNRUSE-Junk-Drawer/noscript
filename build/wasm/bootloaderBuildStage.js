import * as fs from "fs"
import * as path from "path"
import * as uglifyJs from "uglify-js"
import BuildStage from "./../buildStage"

export default class BootloaderBuildStage extends BuildStage {
  constructor(parent, createWasmDistDirectory) {
    super(parent, `wasm/bootloader`, [createWasmDistDirectory], false)
  }

  performStart() {
    const inputPath = path.join(`build`, `wasm`, `bootloader.js`)
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
        const outputPath = path.join(`games`, this.parent.name, `dist`, `wasm`, `bootloader.js`)
        this.log(`Writing "${outputPath}"...`)
        fs.writeFile(outputPath, uglified.code, error => this.handle(error, () => this.done()))
      })
    }))
  }
}
