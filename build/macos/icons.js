import * as path from "path"
import * as fs from "fs"
import mkdirp from "mkdirp"
import favicons from "favicons"
import imageminPngcrush from "imagemin-pngcrush"

import faviconsIcons from "favicons/dist/config/icons.json"

faviconsIcons.macos = {
  "16": {
    width: 16,
    height: 16,
    transparent: true,
    rotate: false,
    mask: false
  },
  "32": {
    width: 32,
    height: 32,
    transparent: true,
    rotate: false,
    mask: false
  },
  "64": {
    width: 64,
    height: 64,
    transparent: true,
    rotate: false,
    mask: false
  },
  "128": {
    width: 128,
    height: 128,
    transparent: true,
    rotate: false,
    mask: false
  },
  "256": {
    width: 256,
    height: 256,
    transparent: true,
    rotate: false,
    mask: false
  },
  "512": {
    width: 512,
    height: 512,
    transparent: true,
    rotate: false,
    mask: false
  },
  "1024": {
    width: 1024,
    height: 1024,
    transparent: true,
    rotate: false,
    mask: false
  }
}

let running = false
let needsToRestart = false

const run = () => {
  running = true
  needsToRestart = false

  console.log(`Reading "${path.join(`src`, `metadata.json`)}"...`)
  fs.readFile(path.join(`src`, `metadata.json`), { encoding: `utf8` }, (error, metadataText) => {
    if (error) {
      throw error
    }

    if (needsToRestart) {
      console.log(`Exiting early to restart`)
      run()
      return
    }

    const metadataJson = JSON.parse(metadataText)

    console.log(`Creating "${path.join(`dist`, `macos`, `${metadataJson.applicationName}.app`, `Contents`, `Resources`)}" to generate macOS icons...`)
    mkdirp(path.join(`dist`, `macos`, `${metadataJson.applicationName}.app`, `Contents`, `Resources`), error => {
      if (error) {
        throw error
      }

      if (needsToRestart) {
        console.log(`Exiting early to restart`)
        run()
        return
      }

      console.log(`Generating macOS icons...`)
      favicons(path.join(`src`, `logo.svg`), {
        appName: metadataJson.applicationName,
        appDescription: metadataJson.description,
        developerName: null,
        developerUrl: null,
        background: `#000`,
        theme_color: `#000`,
        path: ``,
        display: `standalone`,
        orientation: `landscape`,
        start_url: ``,
        version: `1.0`,
        logging: false,
        online: false,
        preferOnline: false,
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: false,
          firefox: false,
          windows: false,
          yandex: false,
          macos: true
        }
      }, (error, response) => {
        if (error) {
          throw error
        }

        if (needsToRestart) {
          console.log(`Exiting early to restart`)
          run()
          return
        }

        console.log(`Compressing...`)
        let remaining = response.images.length

        response.images.forEach(image => {
          imageminPngcrush({ reduce: true })(image.contents).then(compressed => {
            image.contents = compressed

            remaining--
            if (remaining) {
              return
            }

            if (needsToRestart) {
              console.log(`Exiting early to restart`)
              run()
              return
            }

            console.log(`Writing ICNS...`)

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
              const icon = response.images.find(image => image.name == resolution)

              writeMagic(magic)
              writeUint32(icon.contents.byteLength + 8)
              fragments.push(icon.contents)
              totalBytes += icon.contents.byteLength
            }

            writeMagic(`icns`)
            fragments.push(null)
            writeIcon(`16`, `icp4`)
            writeIcon(`32`, `icp5`)
            writeIcon(`64`, `icp6`)
            writeIcon(`128`, `ic07`)
            writeIcon(`256`, `ic08`)
            writeIcon(`512`, `ic09`)
            writeIcon(`1024`, `ic10`)
            writeIcon(`32`, `ic11`)
            writeIcon(`64`, `ic12`)
            writeIcon(`256`, `ic13`)
            writeIcon(`512`, `ic14`)

            fragments[1] = new Uint8Array([
              (totalBytes & 0xff000000) >> 24,
              (totalBytes & 0x00ff0000) >> 16,
              (totalBytes & 0x0000ff00) >> 8,
              totalBytes & 0x000000ff
            ])

            fs.writeFile(path.join(`dist`, `macos`, `${metadataJson.applicationName}.app`, `Contents`, `Resources`, `Logo.icns`), Buffer.concat(fragments.map(Buffer.from)), error => {
              if (error) {
                throw error
              }

              if (needsToRestart) {
                console.log(`Exiting early to restart`)
                run()
                return
              }

              running = false
              console.log(`Done`)
            })
          })
        })
      })
    })
  })
}

export const generate = () => {
  if (running) {
    console.log(`Delaying macOS icon generation until current run completes`)
    needsToRestart = true
    return
  }

  run()
}
