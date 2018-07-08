import metadata from "./metadata"
import deletePreviousBuilds from "./deletePreviousBuilds"
import "./macos/index"
import "./wasm/index"
import "./win32/index"

deletePreviousBuilds.start()
metadata.start()
