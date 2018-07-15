import { start, settings } from "./buildStage"
import "./buildStageGraph"
import "./macos/index"
import "./wasm/index"
import "./win32/index"

settings.oneOff = true

start()
