import metadata from "./metadata"
import "./buildStageGraph"
import "./macos/index"
import "./wasm/index"
import "./win32/index"

console.log(`Starting "one-off" build...`)
metadata.start()
