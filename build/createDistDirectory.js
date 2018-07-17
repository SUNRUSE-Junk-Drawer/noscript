import CreateDirectoryBuildStage from "./createDirectoryBuildStage"
import deleteDistDirectory from "./deleteDistDirectory"

export default new CreateDirectoryBuildStage(
  `createDistDirectory`,
  () => [`dist`],
  [deleteDistDirectory]
)
