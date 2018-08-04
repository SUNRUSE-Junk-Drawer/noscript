import rimraf from "rimraf"
import mkdirp from "mkdirp"
import forEachGame from "./forEachGame"
import Game from "./game"
import * as buildStage from "./buildStage"

console.log(`Deleting "dist"...`)
rimraf(`dist`, error => {
  if (error) {
    throw error
  }

  console.log(`Creating "dist"...`)
  mkdirp(`dist`, error => {
    if (error) {
      throw error
    }

    console.log(`Starting build...`)
    forEachGame(
      name => new Game(name, true),
      () => buildStage.handleBuildStageChanges()
    )
  })
})
