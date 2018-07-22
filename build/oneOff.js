import { start, settings } from "./buildStage"
import "./graphs/index"
import "./macos/index"
import "./wasm/index"
import "./win32/index"
import "./linux/index"

settings.oneOff = true

start()
