import * as path from "path"
import * as fs from "fs"
import BuildStage from "./buildStage"

export default class ReadTextBuildStage extends BuildStage {
  constructor(game, name, pathSegmentFactory, dependencies) {
    super(game, name, dependencies, false)
    this.pathSegmentFactory = pathSegmentFactory
  }

  performStart() {
    fs.readFile(
      path.join.apply(path, this.pathSegmentFactory()),
      { encoding: `utf8` },
      (error, text) => this.handle(error, () => {
        this.text = text
        this.done()
      })
    )
  }
}
