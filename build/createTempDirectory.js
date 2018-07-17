import CreateDirectoryBuildStage from "./createDirectoryBuildStage"
import deleteTempDirectory from "./deleteTempDirectory"

export default new CreateDirectoryBuildStage(
  `createTempDirectory`,
  () => [`temp`],
  [deleteTempDirectory]
)
