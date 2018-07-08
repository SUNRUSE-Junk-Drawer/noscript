import * as path from "path"
import favicons from "favicons"
import isPng from "is-png"
import pngcrushBin from "pngcrush-bin"
import execBuffer from "exec-buffer"
import BuildStage from "./buildStage"
import metadata from "./metadata"

import faviconsIcons from "favicons/dist/config/icons.json"

faviconsIcons.macos = {
  "macos_16.png": {
    width: 16,
    height: 16,
    transparent: true,
    rotate: false,
    mask: false
  },
  "macos_32.png": {
    width: 32,
    height: 32,
    transparent: true,
    rotate: false,
    mask: false
  },
  "macos_64.png": {
    width: 64,
    height: 64,
    transparent: true,
    rotate: false,
    mask: false
  },
  "macos_128.png": {
    width: 128,
    height: 128,
    transparent: true,
    rotate: false,
    mask: false
  },
  "macos_256.png": {
    width: 256,
    height: 256,
    transparent: true,
    rotate: false,
    mask: false
  },
  "macos_512.png": {
    width: 512,
    height: 512,
    transparent: true,
    rotate: false,
    mask: false
  },
  "macos_1024.png": {
    width: 1024,
    height: 1024,
    transparent: true,
    rotate: false,
    mask: false
  }
}

faviconsIcons.win32 = {
  "win32.ico": {
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

class FaviconsBuildStage extends BuildStage {
  constructor() {
    super(`favicons`, [metadata])
  }

  performStart() {
    const logoPath = path.join(`src`, `logo.svg`)

    this.log(`Generating icons from "${logoPath}"...`)
    favicons(logoPath, {
      appName: metadata.json.applicationName,
      appDescription: metadata.json.description,
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
        yandex: true,
        win32: true,
        macos: true
      }
    }, (error, response) => {
      this.handle(error)

      const pngImages = response.images.filter(image => isPng(image.contents))
      this.log(`Compressing ${pngImages.length} PNG icons...`)
      let remainingToCompress = pngImages.length

      const whenAllCompressed = () => {
        this.response = response

        this.done()
      }

      if (!remainingToCompress) {
        whenAllCompressed()
      }

      pngImages.forEach(image => execBuffer({
        input: image.contents,
        bin: pngcrushBin,
        args: [`-brute`, `-force`, `-q`, `-reduce`, execBuffer.input, execBuffer.output]
      })
        .catch(error => this.handle(error))
        .then(compressed => {
          image.contents = compressed

          remainingToCompress--
          if (remainingToCompress) {
            if (remainingToCompress % 10 == 0) {
              this.log(`\t(${remainingToCompress} left)`)
            }
            return
          }

          whenAllCompressed()
        }))
    })
  }
}

export default new FaviconsBuildStage()
