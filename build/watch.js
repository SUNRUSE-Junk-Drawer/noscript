import * as path from "path"
import rimraf from "rimraf"
import mkdirp from "mkdirp"
import * as chokidar from "chokidar"
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
      name => {
        const game = new Game(null, name, false)
        game.start()

        const watch = (paths, buildStagePaths) => chokidar.watch(paths, { ignoreInitial: true })
          .on(`error`, error => { throw error })
          .on(`all`, (event, path) => {
            console.log(`Starting build stages affected by ${event} of "${path}"...`)
            buildStagePaths.forEach(buildStagePath => game.get(buildStagePath).start())
            game.start()
          })

        watch(path.join(`games`, name, `metadata.json`), [[`metadata`]])
        watch(`build/wasm/bootloader.js`, [[`wasm/bootloader`]])
      },
      () => { }
    )
  })
})
