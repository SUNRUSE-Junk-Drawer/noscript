import * as fs from "fs"
import * as path from "path"
import mkdirp from "mkdirp"
import Svgo from "svgo"
import BuildStage from "./buildStage"

import deletePreviousBuilds from "./../deletePreviousBuilds"

const svgo = new Svgo({
  plugins: [{
    removeHiddenElems: {
      isHidden: false,
      displayNone: false,
      opacity0: false
    }
  }]
})

class LoadingScreenBuildStage extends BuildStage {
  constructor() {
    super(`loadingScreen`, [deletePreviousBuilds], false)
  }

  performStart() {
    const svgPath = path.join(`build`, `wasm`, `loadingScreen.svg`)
    this.log(`Loading "${svgPath}"...`)
    fs.readFile(svgPath, { encoding: `utf8` }, (error, unoptimised) => this.handle(error, () => {
      this.log(`Optimising...`)
      svgo
        .optimize(unoptimised)
        .then(optimised => {
          const distPath = path.join(`dist`, `wasm`)
          this.log(`Creating dist path "${distPath}"...`)
          mkdirp(distPath, error => this.handle(error, () => {
            const outputPath = path.join(distPath, `loading-screen.svg`)
            console.log(`Writing "${outputPath}"...`)
            fs.writeFile(outputPath, optimised.data, error => this.handle(error, () => this.done()))
          }))
        })
    }))
  }
}

export default new LoadingScreenBuildStage()
