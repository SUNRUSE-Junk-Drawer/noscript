import * as htmlMinifier from "html-minifier"
import WriteFileBuildStage from "./../writeFileBuildStage"

export default class HtmlBuildStage extends WriteFileBuildStage {
  constructor(game, metadata, favicons, createWasmDistDirectory) {
    super(
      game,
      `wasm/html`,
      () => [`games`, game.name, `dist`, `wasm`, `index.html`],
      () => htmlMinifier.minify(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>${metadata.json.applicationName}</title>
            <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1, width=device-width, height=device-height, user-scalable=no">
            ${favicons.response.html.join(``)}
          </head>
          <body style="background: black">
            <object id="loading-screen" data="loading-screen.svg" type="image/svg+xml" style="position: fixed; left: 0; top: 0; width: 100%; height: 100%">
              SVG does not appear to be supported by your browser.  Please ensure that your browser and device are up to date, then refresh to try again.
            </object>
            <script src="bootloader.js"></script>
          </body>
        </html>
      `, {
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeEmptyElements: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeTagWhitespace: true
        }
      ),
      [favicons, createWasmDistDirectory]
    )
  }
}
