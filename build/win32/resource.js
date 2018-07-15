import * as commandExists from "command-exists"
import * as childProcess from "child_process"
import * as path from "path"
import BuildStage from "./buildStage"

import icon from "./icon"
import manifest from "./manifest"

class ResourceBuildStage extends BuildStage {
  constructor() {
    super(`resource`, [icon, manifest], !commandExists.sync(`windres`))
  }

  performStart() {
    childProcess.execFile(`windres`, [path.join(`src`, `platforms`, `win32.rc`), `-O`, `coff`, `-o`, path.join(`temp`, `win32`, `win32.res`)], (error, stdout, stderr) => this.handle(error || stdout || stderr, () => this.done()))
  }
}

export default new ResourceBuildStage()
