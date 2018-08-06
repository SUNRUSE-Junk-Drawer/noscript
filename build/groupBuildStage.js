import BuildStage from "./buildStage"
import * as buildStage from "./buildStage"

export default class GroupBuildStage extends BuildStage {
  constructor(parent, name, dependencies, disabled) {
    super(parent, name, dependencies, disabled)
    this.children = []
  }

  blocksChildren() {
    switch (this.state) {
      case `running`:
      case `restarting`:
        return false
      case `waitingForStart`:
      case `blocked`:
      case `done`:
      case `failed`:
      case `disabled`:
        return true
      default:
        this.criticalStop(`State "${this.state}" is not implemented by "blocksChildren".`)
    }
  }

  checkState() {
    switch (this.state) {
      case `running`:
        if (!this.children.every(child => {
          switch (child.state) {
            case `blocked`:
            case `restarting`:
            case `running`:
              return false

            case `done`:
            case `disabled`:
            case `failed`:
              return true

            default:
              this.criticalStop(`State "${this.state}" is not implemented by "checkState" when inspecting child build stages.`)
          }
        })) {
          return
        }

        this.handle(this.children.some(child => child.state == `failed`) && `One or more children failed to process.`, () => this.done())
        break

      case `blocked`:
      case `waitingForStart`:
      case `restarting`:
      case `done`:
      case `disabled`:
      case `failed`:
        super.checkState()
        break
      default:
        this.criticalStop(`State "${this.state}" is not implemented by "checkState" (derivced).`)
    }
  }

  performStart() {
    buildStage.handleBuildStageChanges()
  }
}
