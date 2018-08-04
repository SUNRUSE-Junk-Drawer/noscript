import * as path from "path"
import * as fs from "fs"

export default (forEachFile, then) => fs.readdir(`games`, (error, files) => {
  if (error) {
    throw error
  }

  let remaining = files.length
  files.forEach(name => {
    const absoluteFile = path.join(`games`, name)

    fs.stat(absoluteFile, (error, stats) => {
      if (error) {
        throw error
      }

      if (!stats.isDirectory()) {
        console.warn(`Ignoring non-directory "${name}" in "games" directory.`)
      } else {
        forEachFile(name)
      }

      remaining--
      if (!remaining) {
        then()
      }
    })
  })

  if (!remaining) {
    then()
  }
})
