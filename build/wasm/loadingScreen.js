import * as fs from "fs"
import * as path from "path"
import Svgo from "svgo"
import BuildStage from "./buildStage"

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
    super(`loadingScreen`, [], false)
  }

  performStart() {
    const svgPath = path.join(`build`, `wasm`, `loadingScreen.svg`)
    this.log(`Loading "${svgPath}"...`)
    fs.readFile(svgPath, { encoding: `utf8` }, (error, unoptimised) => {
      this.handle(error)
      this.log(`Optimising...`)
      svgo
        .optimize(unoptimised)
        .then(optimised => {
          this.svg = optimised
          this.done()
        })
    })
  }
}

export default new LoadingScreenBuildStage()
