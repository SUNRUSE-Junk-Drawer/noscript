import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import createDistDirectory from "./../createTempDirectory"

export default new CreateDirectoryBuildStage(
  `win32/createTempDirectory`,
  () => [`temp`, `win32`],
  [createDistDirectory]
)
