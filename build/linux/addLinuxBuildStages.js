import * as path from "path"
import shellEscape from "shell-escape"
import CreateDirectoryBuildStage from "../createDirectoryBuildStage"
import WriteFileBuildStage from "../writeFileBuildStage"
import CommandLineBuildStage from "../commandLineBuildStage"

export default (game, metadata, createDistDirectory, createTempDirectory, generateMetadataHeader) => {
  const createLinuxTempDirectory = new CreateDirectoryBuildStage(
    game,
    `linux/createTempDirectory`,
    () => [`games`, game.name, `temp`, `linux`],
    [createTempDirectory]
  )

  const createLinuxDistDirectory = new CreateDirectoryBuildStage(
    game,
    `linux/createDistDirectory`,
    () => [`games`, game.name, `dist`, `linux`],
    [createDistDirectory]
  )

  const createMain = new WriteFileBuildStage(
    game,
    `linux/createMain`,
    () => [`games`, game.name, `temp`, `linux`, `main.c`],
    () => `
        #include "./../metadata.h"
        #include "./../../../../build/platform.h"
        #include "./../../../../build/game.h"
        #include "./../../../../build/linux/main.c"
        #include "./../../src/main.c"
      `,
    [createLinuxTempDirectory]
  )

  new CommandLineBuildStage(
    game,
    `linux/compile`,
    [`x86_64-linux-gnu-gcc`],
    () => `${shellEscape([path.join(`games`, game.name, `temp`, `linux`, `main.c`)])} \`pkg-config --cflags --libs gtk+-2.0\` -o ${shellEscape([path.join(`games`, game.name, `dist`, `linux`, metadata.json.applicationName)])}`,
    [createLinuxDistDirectory, generateMetadataHeader, createMain]
  )
}
