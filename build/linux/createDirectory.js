import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import createDistDirectory from "./../createDistDirectory"

export default new CreateDirectoryBuildStage(
  `linux/createDirectory`,
  () => [`dist`, `linux`],
  [createDistDirectory]
)
