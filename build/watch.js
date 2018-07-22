import * as chokidar from "chokidar"
import { start, settings } from "./buildStage"
import metadata from "./metadata"
import "./graphs/index"
import favicons from "./favicons"
import "./macos/index"
import "./wasm/index"
import wasmLoadingScreen from "./wasm/loadingScreen"
import wasmBootloader from "./wasm/bootloader"
import "./win32/index"
import "./linux/index"

settings.oneOff = false

const watch = (paths, buildStages) => chokidar.watch(paths, { ignoreInitial: true })
  .on(`error`, error => { throw error })
  .on(`all`, (event, path) => {
    console.log(`Starting build stages affected by ${event} of "${path}"...`)
    buildStages.forEach(buildStage => buildStage.start())
  })

watch(`src/metadata.json`, [metadata])
watch(`src/logo.svg`, [favicons])
watch(`build/wasm/loadingScreen.svg`, [wasmLoadingScreen])
watch(`build/wasm/bootloaderScript.js`, [wasmBootloader])

start()
