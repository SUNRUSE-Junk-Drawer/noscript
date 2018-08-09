import * as fs from "fs"
import * as path from "path"
import InstancedBuildStage from "./instancedBuildStage"

export default class FileListBuildStage extends InstancedBuildStage {
  constructor(parent, name, dependencies, disabled, instanceFactory, searchPathFactory) {
    super(parent, name, dependencies, disabled, instanceFactory)
    this.searchPathFactory = searchPathFactory
  }

  getInstanceNames() {
    fs.readdir(path.join.apply(path, this.searchPathFactory()), (error, files) => this.handle(error, () => this.gotInstanceNames(files)))
  }
}
