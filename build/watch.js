import * as chokidar from "chokidar"
import { start } from "./buildStage"
import metadata from "./metadata"
import "./buildStageGraph"
import favicons from "./favicons"
import "./macos/index"
import "./wasm/index"
import wasmLoadingScreen from "./wasm/loadingScreen"
import "./win32/index"

const watch = (paths, buildStages) => chokidar.watch(paths, { ignoreInitial: true })
  .on(`error`, error => { throw error })
  .on(`all`, (event, path) => {
    console.log(`Starting build stages affected by ${event} of "${path}"...`)
    buildStages.forEach(buildStage => buildStage.start())
  })

watch(`src/metadata.json`, [metadata])
watch(`src/logo.svg`, [favicons])
watch(`build/wasm/loadingScreen.svg`, [wasmLoadingScreen])

start()
