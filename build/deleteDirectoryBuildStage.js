import * as path from "path"
import rimraf from "rimraf"
import BuildStage from "./buildStage"

export default class DeleteDirectoryBuildStage extends BuildStage {
  constructor(parent, name, pathSegmentFactory, dependencies) {
    super(parent, name, dependencies, false)
    this.pathSegmentFactory = pathSegmentFactory
  }

  performStart() {
    rimraf(
      path.join.apply(path, this.pathSegmentFactory()),
      error => this.handle(error, () => this.done())
    )
  }
}
