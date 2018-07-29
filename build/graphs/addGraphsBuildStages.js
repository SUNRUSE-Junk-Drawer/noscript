import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import BuildStageGraphBuildStage from "./buildStageGraphBuildStage"
import DatabaseSchemaGraphBuildStage from "./databaseSchemaGraphBuildStage"

export default (game, createDistDirectory) => {
  const createGraphsDistDirectory = new CreateDirectoryBuildStage(
    game,
    `graphs/createDistDirectory`,
    () => [`games`, game.name, `dist`, `graphs`],
    [createDistDirectory]
  )

  new BuildStageGraphBuildStage(
    game,
    () => [`games`, game.name, `dist`, `graphs`, `buildStages.nomnoml`],
    createGraphsDistDirectory
  )

  new DatabaseSchemaGraphBuildStage(
    game,
    createGraphsDistDirectory
  )
}
