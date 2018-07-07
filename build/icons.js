import * as path from "path"
import * as fs from "fs"
import mkdirp from "mkdirp"
import favicons from "favicons"
import imagemin from "imagemin"
import imageminPngcrush from "imagemin-pngcrush"

let running = false
let needsToRestart = false

const run = () => {
  running = true
  needsToRestart = false

  console.log(`Creating "${path.join(`dist`, `wasm`)}" to generate icons...`)
  mkdirp(path.join(`dist`, `wasm`), error => {
    if (error) {
      throw error
    }

    if (needsToRestart) {
      console.log(`Exiting early to restart`)
      run()
      return
    }

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

      console.log(`Generating favicons...`)
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
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: { offset: 25 },
          favicons: true,
          firefox: true,
          windows: true,
          yandex: true
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

        let remainingFiles = response.images.length + response.files.length
        console.log(`Writing ${remainingFiles} files...`)

        const allPaths = []

        const write = (name, contents) => {
          const lessRelative = path.join(`dist`, `wasm`, name)
          allPaths.push(lessRelative)
          fs.writeFile(lessRelative, contents, error => {
            if (error) {
              throw error
            }

            if (remainingFiles % 10 == 0) {
              console.log(`${remainingFiles} files remaining...`)
            }

            remainingFiles--
            if (remainingFiles) return

            console.log(`Compressing...`)
            imagemin(allPaths.filter(path => path.endsWith(`.png`)), path.join(`dist`, `wasm`), { plugins: [imageminPngcrush({ reduce: true })] })
              .catch(reason => { throw reason })
              .then(() => {
                if (needsToRestart) {
                  console.log(`Exiting early to restart`)
                  run()
                  return
                }

                running = false
                console.log(`Done`)
              })
          })
        }

        response.images.forEach(image => write(image.name, image.contents))
        response.files.forEach(file => write(file.name, file.contents))
      })
    })
  })
}

export const generate = () => {
  if (running) {
    console.log(`Delaying icon generation until current run completes`)
    needsToRestart = true
    return
  }

  run()
}
