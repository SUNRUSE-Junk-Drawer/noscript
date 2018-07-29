import * as fs from "fs"
import * as path from "path"
import Svgo from "svgo"
import BuildStage from "./../buildStage"

const svgo = new Svgo({
  plugins: [{
    removeHiddenElems: {
      isHidden: false,
      displayNone: false,
      opacity0: false
    }
  }]
})

export default class LoadingScreenBuildStage extends BuildStage {
  constructor(game, createWasmDistDirectory) {
    super(game, `wasm/loadingScreen`, [createWasmDistDirectory], false)
  }

  performStart() {
    const svgPath = path.join(`games`, this.game.name, `loadingScreen.svg`)
    this.log(`Loading "${svgPath}"...`)
    fs.readFile(svgPath, { encoding: `utf8` }, (error, unoptimised) => this.handle(error, () => {
      this.log(`Optimising...`)
      svgo
        .optimize(unoptimised)
        .then(optimised => {
          const outputPath = path.join(`games`, this.game.name, `dist`, `wasm`, `loading-screen.svg`)
          console.log(`Writing "${outputPath}"...`)
          fs.writeFile(outputPath, optimised.data, error => this.handle(error, () => this.done()))
        })
    }))
  }
}
