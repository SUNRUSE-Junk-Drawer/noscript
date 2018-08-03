import * as htmlMinifier from "html-minifier"
import WriteFileBuildStage from "./../writeFileBuildStage"

export default class HtmlBuildStage extends WriteFileBuildStage {
  constructor(game, metadata, createWasmDistDirectory) {
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
          </head>
          <body style="background: black">
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
      [createWasmDistDirectory]
    )
  }
}
