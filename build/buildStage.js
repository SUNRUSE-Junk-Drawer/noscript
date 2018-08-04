export const all = []

export const handleBuildStageChanges = () => {
  all.forEach(buildStage => buildStage.checkState())
}

export default class BuildStage {
  constructor(game, name, dependencies, disabled) {
    this.game = game
    this.name = name
    this.dependencies = dependencies

    this.dependents = []
    this.state = disabled ? `disabled` : (dependencies.length ? `blocked` : `waitingForStart`)

    if (disabled) {
      this.log(`Disabled.`)
    }

    all.push(this)
    for (const dependency of this.dependencies) {
      dependency.dependents.push(this)
      if (dependency.state == `disabled` && this.state != `disabled`) {
        this.log(`Disabled by dependency "${dependency.name}".`)
        this.state = `disabled`
      }
    }
  }

  criticalStop(error) {
    this.log(`CRITICAL STOP - ${error}`)
    process.exit(1)
  }

  handle(potentialError, onSuccess) {
    if (potentialError) {
      if (this.game.oneOff) {
        this.criticalStop(potentialError)
      } else {
        this.log(`Failed; "${potentialError}"`)
        this.state = `failed`
        handleBuildStageChanges()
      }
    } else {
      onSuccess()
    }
  }

  log(message) {
    console.log(`${this.game.name}/${this.name} - ${message}`)
  }

  start() {
    switch (this.state) {
      case `waitingForStart`:
        this.log(`Start requested; waiting to start.`)
        this.state = `blocked`
        handleBuildStageChanges()
        break
      case `blocked`:
        break
      case `running`:
        this.log(`Start requested; waiting for opportunity to restart...`)
        this.state = `restarting`
        break
      case `restarting`:
        break
      case `done`:
        this.log(`Start requested; discarding previous result and invalidating dependents...`)
        this.state = `blocked`
        this.dependents.forEach(dependent => dependent.invalidate(1))
        handleBuildStageChanges()
        break
      case `disabled`:
        break
      case `failed`:
        this.log(`Start requested; restarting following previous failure...`)
        this.state = `blocked`
        this.dependents.forEach(dependent => dependent.invalidate(1))
        handleBuildStageChanges()
        break
      default:
        this.criticalStop(`State "${this.state}" is not implemented by "start".`)
    }
  }

  invalidate(levels) {
    switch (this.state) {
      case `waitingForStart`:
        break
      case `blocked`:
        break
      case `running`:
        this.log(`${`\t`.repeat(levels)}Running; restarting.`)
        this.state = `restarting`
        break
      case `restarting`:
        break
      case `done`:
        this.log(`${`\t`.repeat(levels)}Previous completion invalidated.`)
        this.state = `blocked`
        this.dependents.forEach(dependent => dependent.invalidate(levels + 1))
        break
      case `disabled`:
        break
      case `failed`:
        break
      default:
        this.criticalStop(`State "${this.state}" is not implemented by "invalidate".`)
    }
  }

  blocksDependents() {
    switch (this.state) {
      case `waitingForStart`:
        return true
      case `blocked`:
        return true
      case `running`:
        return true
      case `restarting`:
        return true
      case `done`:
        return false
      case `disabled`:
        return true
      case `failed`:
        return true
      default:
        this.criticalStop(`State "${this.state}" is not implemented by "blocksDependents".`)
    }
  }

  blocksDependencies() {
    switch (this.state) {
      case `running`:
        return true
      case `restarting`:
        return true
      case `waitingForStart`:
      case `blocked`:
      case `done`:
      case `failed`:
        return this.dependents.some(dependent => dependent.blocksDependencies())
      case `disabled`:
        return false
      default:
        this.criticalStop(`State "${this.state}" is not implemented by "blocksDependencies".`)
    }
  }

  done() {
    switch (this.state) {
      case `running`:
        this.log(`Done.`)
        this.state = `done`
        handleBuildStageChanges()
        break
      case `restarting`:
        this.log(`Done, but restarting...`)
        this.state = `blocked`
        handleBuildStageChanges()
        break
      default:
        this.criticalStop(`State "${this.state}" is not implemented by "done".`)
    }
  }

  checkState() {
    switch (this.state) {
      case `waitingForStart`:
        break
      case `blocked`:
        if (this.dependencies.some(dependency => dependency.blocksDependents())) {
          return
        }

        if (this.dependents.some(dependent => dependent.blocksDependencies())) {
          return
        }

        this.log(`Starting...`)
        this.state = `running`
        this.performStart()
        break
      case `running`:
        break
      case `restarting`:
        break
      case `done`:
        break
      case `disabled`:
        break
      case `failed`:
        break
      default:
        this.criticalStop(`State "${this.state}" is not implemented by "checkState".`)
    }
  }

  performStart() {
    this.criticalStop(`"performStart" is not implemented.`)
  }
}
