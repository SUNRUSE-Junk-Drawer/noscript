import * as path from "path"
import mkdirp from "mkdirp"
import BuildStage from "./../buildStage"

import metadata from "./../metadata"
import createBundleContentDirectory from "./createBundleContentDirectory"

class CreateBundleResourcesDirectoryBuildStage extends BuildStage {
  constructor() {
    super(`macos/createBundleResourcesDirectory`, [createBundleContentDirectory], false)
  }

  performStart() {
    mkdirp(path.join(`dist`, `macos`, `${metadata.json.applicationName}.app`, `Contents`, `Resources`), error => this.handle(error, () => this.done()))
  }
}

export default new CreateBundleResourcesDirectoryBuildStage()
