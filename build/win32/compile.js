import * as commandExists from "command-exists"
import * as childProcess from "child_process"
import * as path from "path"
import mkdirp from "mkdirp"
import BuildStage from "./buildStage"

import metadata from "./../metadata"
import resource from "./resource"

class CompileBuildStage extends BuildStage {
  constructor() {
    super(`compile`, [resource], !commandExists.sync(`i686-w64-mingw32-gcc`))
  }

  performStart() {
    const distPath = path.join(`dist`, `win32`)

    this.log(`Creating dist path "${distPath}"...`)
    mkdirp(distPath, error => this.handle(error, () => {
      const exePath = path.join(distPath, `${metadata.json.applicationName}.exe`)
      this.log(`Compiling "${exePath}"...`)
      childProcess.execFile(`i686-w64-mingw32-gcc`, [`-mwindows`, path.join(`src`, `main.c`), path.join(`temp`, `win32`, `win32.res`), `-o`, exePath], (error, stdout, stderr) => this.handle(error || stdout || stderr, () => this.done()))
    }))
  }
}

export default new CompileBuildStage()
