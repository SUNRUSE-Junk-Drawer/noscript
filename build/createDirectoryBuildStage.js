import * as path from "path"
import mkdirp from "mkdirp"
import BuildStage from "./buildStage"

export default class CreateDirectoryBuildStage extends BuildStage {
  constructor(name, pathSegmentFactory, dependencies) {
    super(name, dependencies, false)
    this.pathSegmentFactory = pathSegmentFactory
  }

  performStart() {
    mkdirp(
      path.join.apply(path, this.pathSegmentFactory()),
      error => this.handle(error, () => this.done())
    )
  }
}
