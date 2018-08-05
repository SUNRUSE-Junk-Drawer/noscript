import WriteFileBuildStage from "./../writeFileBuildStage"

export default class BuildStageGraphBuildStage extends WriteFileBuildStage {
  constructor(parent, pathSegmentFactory, createGraphsDistDirectory) {
    super(
      parent,
      `graphs/buildStageGraph`,
      pathSegmentFactory,
      () => {
        const nodes = parent.buildStages
          .map(buildStage => `[${buildStage.state == `disabled` ? `<reference>` : ``}${buildStage.name}]`)
          .join(`\n`)

        const links = parent.buildStages
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
