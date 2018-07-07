import * as path from "path"
import * as fs from "fs"
import mkdirp from "mkdirp"
import favicons from "favicons"

import faviconsIcons from "favicons/dist/config/icons.json"

faviconsIcons.win32 = {
  "logo.ico": {
    "sizes": [{
      "width": 16,
      "height": 16
    }, {
      "width": 24,
      "height": 24
    }, {
      "width": 32,
      "height": 32
    }, {
      "width": 40,
      "height": 40
    }, {
      "width": 48,
      "height": 48
    }, {
      "width": 64,
      "height": 64
    }, {
      "width": 96,
      "height": 96
    }, {
      "width": 128,
      "height": 128
    }, {
      "width": 256,
      "height": 256
    }],
    "transparent": true,
    "rotate": false,
    "mask": false
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

    console.log(`Creating "${path.join(`temp`, `win32`)}" to generate Win32 icons...`)
    mkdirp(path.join(`temp`, `win32`), error => {
      if (error) {
        throw error
      }

      if (needsToRestart) {
        console.log(`Exiting early to restart`)
        run()
        return
      }

      console.log(`Generating Win32 icons...`)
      favicons(path.join(`src`, `logo.svg`), {
        appName: metadataJson.title,
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
          win32: true
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

        console.log(`Writing...`)
        fs.writeFile(path.join(`temp`, `win32`, `logo.ico`), response.images[0].contents, error => {
          if (error) {
            throw error
          }

          if (needsToRestart) {
            console.log(`Exiting early to restart`)
            run()
            return
          }

          console.log(`Done`)
        })
      })
    })
  })
}

export const generate = () => {
  if (running) {
    console.log(`Delaying Win32 icon generation until current run completes`)
    needsToRestart = true
    return
  }

  run()
}
