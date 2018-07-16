import * as fs from "fs"
import * as path from "path"
import mkdirp from "mkdirp"
import BuildStage from "./../buildStage"
import * as buildStage from "./../buildStage"

import deletePreviousBuilds from "./../deletePreviousBuilds"

class BuildStageGraphStage extends BuildStage {
  constructor() {
    super(`buildStageGraph`, [deletePreviousBuilds])
  }

  performStart() {
    const distPath = path.join(`dist`, `graphs`)

    const nodes = buildStage.all
      .map(buildStage => `[${buildStage.state == `disabled` ? `<reference>` : ``}${buildStage.name}]`)
      .join(`\n`)

    const links = buildStage.all
      .map(dependency => dependency.dependents
        .map(dependent => `[${dependency.name}] -> [${dependent.name}]`)
        .join(`\n`))
      .join(`\n`)

    const graph = `${nodes}\n${links}`

    this.log(`Creating dist path "${distPath}"...`)
    mkdirp(distPath, error => this.handle(error, () => {
      const graphPath = path.join(distPath, `buildStages.nomnoml`)
      this.log(`Writing to "${graphPath}"...`)
      fs.writeFile(graphPath, graph, error => this.handle(error, () => this.done()))
    }))
  }
}

export default new BuildStageGraphStage()
