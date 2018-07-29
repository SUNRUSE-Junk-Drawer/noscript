import * as fs from "fs"
import * as path from "path"
import BuildStage from "./buildStage"

export default class WriteFileBuildStage extends BuildStage {
  constructor(game, name, pathSegmentFactory, contentFactory, dependencies) {
    super(game, name, dependencies, false)
    this.pathSegmentFactory = pathSegmentFactory
    this.contentFactory = contentFactory
  }

  performStart() {
    fs.writeFile(
      path.join.apply(path, this.pathSegmentFactory()),
      this.contentFactory(),
      error => this.handle(error, () => this.done())
    )
  }
}
