import DeleteDirectoryBuildStage from "./deleteDirectoryBuildStage"
import metadata from "./metadata"

export default new DeleteDirectoryBuildStage(
  `deleteDistDirectory`,
  () => [`dist`],
  [metadata]
)
