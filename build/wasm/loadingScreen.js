import * as fs from "fs"
import * as path from "path"
import Svgo from "svgo"
import BuildStage from "./buildStage"

import createDirectory from "./createDirectory"

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
    super(`loadingScreen`, [createDirectory], false)
  }

  performStart() {
    const svgPath = path.join(`build`, `wasm`, `loadingScreen.svg`)
    this.log(`Loading "${svgPath}"...`)
    fs.readFile(svgPath, { encoding: `utf8` }, (error, unoptimised) => this.handle(error, () => {
      this.log(`Optimising...`)
      svgo
        .optimize(unoptimised)
        .then(optimised => {
          const outputPath = path.join(`dist`, `wasm`, `loading-screen.svg`)
          console.log(`Writing "${outputPath}"...`)
          fs.writeFile(outputPath, optimised.data, error => this.handle(error, () => this.done()))
        })
    }))
  }
}

export default new LoadingScreenBuildStage()
