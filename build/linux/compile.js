import * as path from "path"
import CommandLineBuildStage from "./../commandLineBuildStage"
import metadata from "./../metadata"
import createDirectory from "./createDirectory"
import shellEscape from "shell-escape"

export default new CommandLineBuildStage(
  `linux/compile`,
  `x86_64-linux-gnu-gcc`,
  () => `${shellEscape([path.join(`src`, `main.c`)])} \`pkg-config --cflags --libs gtk+-2.0\` -o ${shellEscape([path.join(`dist`, `linux`, metadata.json.applicationName)])}`,
  [createDirectory]
)
