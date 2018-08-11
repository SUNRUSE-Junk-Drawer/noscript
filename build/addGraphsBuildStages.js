import * as buildStage from "./buildStage"
import DeleteDirectoryBuildStage from "./deleteDirectoryBuildStage"
import CreateDirectoryBuildStage from "./createDirectoryBuildStage"
import WriteFileBuildStage from "./writeFileBuildStage"

export default (parent, games) => {
  const deleteGraphsDirectory = new DeleteDirectoryBuildStage(parent, `deleteGraphsDirectory`, () => [`graphs`], [games])
  const createGraphsDirectory = new CreateDirectoryBuildStage(parent, `createGraphsDirectory`, () => [`graphs`], [deleteGraphsDirectory])

  new WriteFileBuildStage(
    parent,
    `buildStageGraph`,
    () => [`graphs`, `buildStages.nomnoml`],
    () => {
      const nodes = buildStage.all
        .map(buildStage => `[${buildStage.state == `disabled` ? `<reference>` : ``}${buildStage.fullName}]`)
        .join(`\n`)

      const childLinks = buildStage.all
        .filter(parent => parent.children)
        .map(parent => parent.children
          .map(children => `[${parent.fullName}] -> [${children.fullName}]`)
          .join(`\n`))
        .join(`\n`)

      const dependencyLinks = buildStage.all
        .map(dependency => dependency.dependents
          .map(dependent => `[${dependency.fullName}] --> [${dependent.fullName}]`)
          .join(`\n`))
        .join(`\n`)

      return `${nodes}\n${childLinks}\n${dependencyLinks}`
    },
    [createGraphsDirectory]
  )
}
