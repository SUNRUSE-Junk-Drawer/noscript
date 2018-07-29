import * as path from "path"
import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import WriteFileBuildStage from "./../writeFileBuildStage"
import CommandLineBuildStage from "./../commandLineBuildStage"
import ManifestBuildStage from "./manifestBuildStage"

export default (game, metadata, favicons, createDistDirectory, createTempDirectory, generateMetadataHeader) => {
  const createWin32DistDirectory = new CreateDirectoryBuildStage(
    game,
    `win32/createDistDirectory`,
    () => [`games`, game.name, `dist`, `win32`],
    [createDistDirectory]
  )

  const createWin32TempDirectory = new CreateDirectoryBuildStage(
    game,
    `win32/createTempDirectory`,
    () => [`games`, game.name, `temp`, `win32`],
    [createTempDirectory]
  )

  const icon = new WriteFileBuildStage(
    game,
    `win32/icon`,
    () => [`games`, game.name, `temp`, `win32`, `logo.ico`],
    () => favicons.response.images.find(image => image.name == `win32.ico`).contents,
    [favicons, createWin32TempDirectory]
  )

  const manifest = new ManifestBuildStage(game, metadata, createWin32TempDirectory)

  const resourceFile = new WriteFileBuildStage(
    game,
    `win32/resourceFile`,
    () => [`games`, game.name, `temp`, `win32`, `resource.rc`],
    () => `
      IDI_LOGO ICON "./logo.ico"
      1 24 "./manifest.manifest"
    `,
    [createWin32TempDirectory]
  )

  const resource = new CommandLineBuildStage(
    game,
    `win32/resource`,
    [`windres`, `i686-w64-mingw32-windres`],
    () => [path.join(`games`, game.name, `temp`, `win32`, `resource.rc`), `-O`, `coff`, `-o`, path.join(`games`, game.name, `temp`, `win32`, `resource.res`)],
    [icon, manifest, resourceFile]
  )

  const createMain = new WriteFileBuildStage(
    game,
    `win32/createMain`,
    () => [`games`, game.name, `temp`, `win32`, `main.c`],
    () => `
        #include "./../metadata.h"
        #include "./../../../../build/platform.h"
        #include "./../../../../build/game.h"
        #include "./../../../../build/win32/main.c"
        #include "./../../src/main.c"
      `,
    [createWin32TempDirectory]
  )

  new CommandLineBuildStage(
    game,
    `win32/compile`,
    [`i686-w64-mingw32-gcc`],
    () => [`-mwindows`, path.join(`games`, game.name, `temp`, `win32`, `main.c`), path.join(`games`, game.name, `temp`, `win32`, `resource.res`), `-o`, path.join(`games`, game.name, `dist`, `win32`, `${metadata.json.applicationName}.exe`)],
    [resource, createWin32DistDirectory, generateMetadataHeader, createMain]
  )
}
