import rimraf from "rimraf"
import mkdirp from "mkdirp"
import BuildProcessBuildStage from "./buildProcessBuildStage"

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
    new BuildProcessBuildStage(false)
  })
})
