import rimraf from "rimraf"
import mkdirp from "mkdirp"
import forEachGame from "./forEachGame"
import Game from "./game"

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
      name => new Game(null, name, true).start(),
      () => { }
    )
  })
})
