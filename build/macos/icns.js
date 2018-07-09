import * as fs from "fs"
import * as path from "path"
import mkdirp from "mkdirp"
import BuildStage from "./buildStage"

import metadata from "./../metadata"
import favicons from "./../favicons"
import deletePreviousBuilds from "./../deletePreviousBuilds"

class IcnsBuildStage extends BuildStage {
  constructor() {
    super(`icns`, [favicons, deletePreviousBuilds])
  }

  performStart() {
    this.log(`Generating data...`)

    const fragments = []
    let totalBytes = 4

    const writeMagic = magic => {
      const bytes = new Uint8Array(magic.length)
      for (let i = 0; i < magic.length; i++) {
        bytes[i] = magic.charCodeAt(i)
      }
      fragments.push(bytes)
      totalBytes += 4
    }

    const writeUint32 = value => {
      fragments.push(new Uint8Array([
        (value & 0xff000000) >> 24,
        (value & 0x00ff0000) >> 16,
        (value & 0x0000ff00) >> 8,
        value & 0x000000ff
      ]))
      totalBytes += 4
    }

    const writeIcon = (resolution, magic) => {
      const icon = favicons.response.images.find(image => image.name == resolution)

      writeMagic(magic)
      writeUint32(icon.contents.byteLength + 8)
      fragments.push(icon.contents)
      totalBytes += icon.contents.byteLength
    }

    writeMagic(`icns`)
    fragments.push(null)
    writeIcon(`macos_16.png`, `icp4`)
    writeIcon(`macos_32.png`, `icp5`)
    writeIcon(`macos_64.png`, `icp6`)
    writeIcon(`macos_128.png`, `ic07`)
    writeIcon(`macos_256.png`, `ic08`)
    writeIcon(`macos_512.png`, `ic09`)
    writeIcon(`macos_1024.png`, `ic10`)
    writeIcon(`macos_32.png`, `ic11`)
    writeIcon(`macos_64.png`, `ic12`)
    writeIcon(`macos_256.png`, `ic13`)
    writeIcon(`macos_512.png`, `ic14`)

    fragments[1] = new Uint8Array([
      (totalBytes & 0xff000000) >> 24,
      (totalBytes & 0x00ff0000) >> 16,
      (totalBytes & 0x0000ff00) >> 8,
      totalBytes & 0x000000ff
    ])

    const buffer = Buffer.concat(fragments.map(Buffer.from))

    const resourcesPath = path.join(`dist`, `macos`, `${metadata.json.applicationName}.app`, `Contents`, `Resources`)

    this.log(`Creating resources path "${resourcesPath}"...`)
    mkdirp(resourcesPath, error => {
      this.handle(error)

      const icnsPath = path.join(resourcesPath, `Logo.icns`)
      this.log(`Writing to "${icnsPath}"...`)
      fs.writeFile(icnsPath, buffer, error => {
        this.handle(error)
        this.done()
      })
    })
  }
}

export default new IcnsBuildStage()
