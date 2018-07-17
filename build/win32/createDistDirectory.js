import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import createDistDirectory from "./../createDistDirectory"

export default new CreateDirectoryBuildStage(
  `win32/createDistDirectory`,
  () => [`dist`, `win32`],
  [createDistDirectory]
)
