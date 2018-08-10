import * as htmlMinifier from "html-minifier"
import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import BootloaderBuildStage from "./bootloaderBuildStage"
import WriteFileBuildStage from "../writeFileBuildStage"

export default (parent, metadata, createDistDirectory) => {
  const createWasmDistDirectory = new CreateDirectoryBuildStage(
    parent,
    `wasm/createDistDirectory`,
    () => [`games`, parent.name, `dist`, `wasm`],
    [createDistDirectory]
  )

  const bootloader = new BootloaderBuildStage(parent, createWasmDistDirectory)

  new WriteFileBuildStage(
    parent,
    `wasm/html`,
    () => [`games`, parent.name, `dist`, `wasm`, `index.html`],
    () => htmlMinifier.minify(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>${metadata.json.applicationName}</title>
            <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1, width=device-width, height=device-height, user-scalable=no">
          </head>
          <body style="background: black">
            <script>${bootloader.code}</script>
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
    [createWasmDistDirectory, bootloader]
  )
}
