import rimraf from "rimraf"
import mkdirp from "mkdirp"
import forEachGame from "./forEachGame"
import Game from "./game"
import ZipDirectoryBuildStage from "./zipDirectoryBuildStage"

console.log(`Deleting "dist"...`)
rimraf(`dist`, error => {
  if (error) {
    throw error
  }

  console.log(`Creating "dist"...`)
  mkdirp(`dist`, error => {
    if (error) {
      throw error
    }

    console.log(`Starting build...`)
    forEachGame(name => {
      const game = new Game(name, true)

      new ZipDirectoryBuildStage(
        game,
        `macos/zip`,
        () => [`games`, game.name, `dist`, `macos`],
        () => [`dist`, `${game.buildStage(`metadata`).json.applicationName} (MacOS).zip`],
        [game.buildStage(`macos/icns`)]
      )

      new ZipDirectoryBuildStage(
        game,
        `win32/zip`,
        () => [`games`, game.name, `dist`, `win32`],
        () => [`dist`, `${game.buildStage(`metadata`).json.applicationName} (Windows 32-Bit).zip`],
        [game.buildStage(`win32/compile`)]
      )

      new ZipDirectoryBuildStage(
        game,
        `linux/zip`,
        () => [`games`, game.name, `dist`, `linux`],
        () => [`dist`, `${game.buildStage(`metadata`).json.applicationName} (Ubuntu Linux 64-Bit).zip`],
        [game.buildStage(`linux/compile`)]
      )

      new ZipDirectoryBuildStage(
        game,
        `wasm/zip`,
        () => [`games`, game.name, `dist`, `wasm`],
        () => [`dist`, `${game.buildStage(`metadata`).json.applicationName} (Web).zip`],
        [
          game.buildStage(`wasm/html`),
          game.buildStage(`wasm/bootloader`),
          game.buildStage(`wasm/favicons`),
          game.buildStage(`wasm/loadingScreen`)
        ]
      )
    })
  })
})
