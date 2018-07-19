import WriteFileBuildStage from "./../writeFileBuildStage"
import * as buildStage from "./../buildStage"
import createDirectory from "./createDirectory"

export default new WriteFileBuildStage(
  `graphs/buildStageGraph`,
  () => [`dist`, `graphs`, `buildStages.nomnoml`],
  () => {
    const nodes = buildStage.all
      .map(buildStage => `[${buildStage.state == `disabled` ? `<reference>` : ``}${buildStage.name}]`)
      .join(`\n`)

    const links = buildStage.all
      .map(dependency => dependency.dependents
        .map(dependent => `[${dependency.name}] -> [${dependent.name}]`)
        .join(`\n`))
      .join(`\n`)

    return `${nodes}\n${links}`
  },
  [createDirectory]
)
