import ReadTextBuildStage from "./readTextBuildStage"

export default class ReadJsonBuildStage extends ReadTextBuildStage {
  done() {
    try {
      this.json = JSON.parse(this.text)
    } catch (e) {
      this.handle(e)
      return
    }
    super.done()
  }
}
