import * as path from "path"
import favicons from "favicons"
import isPng from "is-png"
import pngcrushBin from "pngcrush-bin"
import execBuffer from "exec-buffer"
import BuildStage from "./buildStage"

import faviconsIcons from "favicons/dist/config/icons.json"

export default class FaviconsBuildStage extends BuildStage {
  constructor(game, name, metadata, logoPathSegmentFactory) {
    super(game, name, [metadata], false)
    this.metadata = metadata
    this.logoPathSegmentFactory = logoPathSegmentFactory
  }

  performStart() {
    const logoPath = path.join.apply(path, this.logoPathSegmentFactory())
    this.log(`Generating icons from "${logoPath}"...`)
    favicons(logoPath, {
      appName: this.metadata.json.applicationName,
      appDescription: this.metadata.json.description,
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
    }, (error, response) => this.handle(error, () => {

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
        .catch(error => this.handle(error, () => { }))
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
    }))
  }
}
