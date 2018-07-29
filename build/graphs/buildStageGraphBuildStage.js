import WriteFileBuildStage from "./../writeFileBuildStage"

export default class BuildStageGraphBuildStage extends WriteFileBuildStage {
  constructor(game, pathSegmentFactory, createGraphsDistDirectory) {
    super(
      game,
      `graphs/buildStageGraph`,
      pathSegmentFactory,
      () => {
        const nodes = game.buildStages
          .map(buildStage => `[${buildStage.state == `disabled` ? `<reference>` : ``}${buildStage.name}]`)
          .join(`\n`)

        const links = game.buildStages
          .map(dependency => dependency.dependents
            .map(dependent => `[${dependency.name}] -> [${dependent.name}]`)
            .join(`\n`))
          .join(`\n`)

        return `${nodes}\n${links}`
      },
      [createGraphsDistDirectory]
    )
  }
}
