import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import BuildStageGraphBuildStage from "./buildStageGraphBuildStage"

export default (parent, createDistDirectory) => {
  const createGraphsDistDirectory = new CreateDirectoryBuildStage(
    parent,
    `graphs/createDistDirectory`,
    () => [`games`, parent.name, `dist`, `graphs`],
    [createDistDirectory]
  )

  new BuildStageGraphBuildStage(
    parent,
    () => [`games`, parent.name, `dist`, `graphs`, `buildStages.nomnoml`],
    createGraphsDistDirectory
  )
}
