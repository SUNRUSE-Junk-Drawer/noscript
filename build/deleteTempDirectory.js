import DeleteDirectoryBuildStage from "./deleteDirectoryBuildStage"
import metadata from "./metadata"

export default new DeleteDirectoryBuildStage(
  `deleteTempDirectory`,
  () => [`temp`],
  [metadata]
)
