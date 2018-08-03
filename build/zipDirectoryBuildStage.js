import * as fs from "fs"
import * as path from "path"
import archiver from "archiver"
import BuildStage from "./buildStage"

export default class ZipDirectoryBuildStage extends BuildStage {
  constructor(game, name, directoryPathSegmentFactory, destinationPathSegmentFactory, dependencies) {
    super(game, name, dependencies, false)
    this.directoryPathSegmentFactory = directoryPathSegmentFactory
    this.destinationPathSegmentFactory = destinationPathSegmentFactory
  }

  performStart() {
    const archive = archiver(`zip`)
    archive
      .on(`error`, e => this.handle(e, () => { throw new Error(`An error occurred but could not be reported`) }))

    const output = fs.createWriteStream(path.join.apply(path, this.destinationPathSegmentFactory()))
    output
      .on(`error`, e => this.handle(e, () => { throw new Error(`An error occurred but could not be reported`) }))
      .on(`close`, () => {
        const target = 13 * 1024
        this.handle(
          output.bytesWritten > target && `The archive is too large (${output.bytesWritten} > ${target} bytes by ${output.bytesWritten - target} bytes; ${(output.bytesWritten - target) * 100 / target}%)`,
          () => {
            this.log(`Archive is ${output.bytesWritten} of ${target} bytes (${output.bytesWritten * 100 / target}%)`)
            this.done()
          }
        )
      })

    archive.pipe(output)
    archive.directory(path.join.apply(path, this.directoryPathSegmentFactory()), false)
    archive.finalize()
  }
}
