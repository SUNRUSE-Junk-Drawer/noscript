import { start, settings } from "./buildStage"
import "./graphs/index"
import "./macos/index"
import "./wasm/index"
import "./win32/index"

settings.oneOff = true

start()
