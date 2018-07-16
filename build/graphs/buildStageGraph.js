import * as fs from "fs"
import * as path from "path"
import BuildStage from "./../buildStage"
import * as buildStage from "./../buildStage"

import createDirectory from "./createDirectory"

class BuildStageGraphStage extends BuildStage {
  constructor() {
    super(`buildStageGraph`, [createDirectory])
  }

  performStart() {
    const nodes = buildStage.all
      .map(buildStage => `[${buildStage.state == `disabled` ? `<reference>` : ``}${buildStage.name}]`)
      .join(`\n`)

    const links = buildStage.all
      .map(dependency => dependency.dependents
        .map(dependent => `[${dependency.name}] -> [${dependent.name}]`)
        .join(`\n`))
      .join(`\n`)

    const graph = `${nodes}\n${links}`

    fs.writeFile(
      path.join(`dist`, `graphs`, `buildStages.nomnoml`),
      graph,
      error => this.handle(error, () => this.done())
    )
  }
}

export default new BuildStageGraphStage()
