import * as path from "path"
import * as chokidar from "chokidar"
import forEachGame from "./forEachGame"
import Game from "./game"

forEachGame(name => {
  const game = new Game(name, false)

  const watch = (paths, buildStageNames) => chokidar.watch(paths, { ignoreInitial: true })
    .on(`error`, error => { throw error })
    .on(`all`, (event, path) => {
      console.log(`Starting build stages affected by ${event} of "${path}"...`)
      buildStageNames.forEach(buildStageName => game.buildStage(buildStageName).start())
    })

  watch(path.join(`games`, name, `metadata.json`), [`metadata`])
  watch(path.join(`games`, name, `logo.svg`), [`favicons`])
  watch(path.join(`games`, name, `loadingScreen.svg`), [`wasm/loadingScreen`])
  watch(`build/wasm/bootloader.js`, [`wasm/bootloader`])
})
