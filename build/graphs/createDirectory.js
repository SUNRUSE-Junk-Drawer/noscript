import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import createDistDirectory from "./../createDistDirectory"

export default new CreateDirectoryBuildStage(
  `graphs/createDirectory`,
  () => [`dist`, `graphs`],
  [createDistDirectory]
)
