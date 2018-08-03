import * as fs from "fs"
import * as path from "path"
import BuildStage from "./../buildStage"

export default class FaviconsBuildStage extends BuildStage {
  constructor(game, favicons, createWasmDistDirectory) {
    super(game, `wasm/favicons`, [favicons, createWasmDistDirectory], false)
    this.favicons = favicons
  }

  performStart() {
    const files = this.favicons.response.images
      .concat(this.favicons.response.files)

    const distPath = path.join(`games`, this.game.name, `dist`, `wasm`)

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
