import * as path from "path"
import mkdirp from "mkdirp"
import BuildStage from "./buildStage"

export default class CreateDirectoryBuildStage extends BuildStage {
  constructor(parent, name, pathSegmentFactory, dependencies) {
    super(parent, name, dependencies, false)
    this.pathSegmentFactory = pathSegmentFactory
  }

  performStart() {
    mkdirp(
      path.join.apply(path, this.pathSegmentFactory()),
      error => this.handle(error, () => this.done())
    )
  }
}
