import * as commandExists from "command-exists"
import * as childProcess from "child_process"
import * as path from "path"
import BuildStage from "./buildStage"

import metadata from "./../metadata"
import resource from "./resource"
import createDistDirectory from "./createDistDirectory"

class CompileBuildStage extends BuildStage {
  constructor() {
    super(`compile`, [resource, createDistDirectory], !commandExists.sync(`i686-w64-mingw32-gcc`))
  }

  performStart() {
    childProcess.execFile(`i686-w64-mingw32-gcc`, [`-mwindows`, path.join(`src`, `main.c`), path.join(`temp`, `win32`, `win32.res`), `-o`, path.join(`dist`, `win32`, `${metadata.json.applicationName}.exe`)], (error, stdout, stderr) => this.handle(error || stdout || stderr, () => this.done()))
  }
}

export default new CompileBuildStage()
