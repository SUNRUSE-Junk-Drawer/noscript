import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import createDistDirectory from "./../createDistDirectory"

export default new CreateDirectoryBuildStage(
  `wasm/createDirectory`,
  () => [`dist`, `wasm`],
  [createDistDirectory]
)
