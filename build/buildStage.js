export const all = []

export const handleBuildStageChanges = () => {
  all.forEach(buildStage => buildStage.checkState())
}

export default class BuildStage {
  constructor(parent, name, dependencies, disabled) {
    this.parent = parent
    this.name = name
    this.dependencies = dependencies

    this.dependents = []
    this.state = disabled ? `disabled` : (dependencies.length ? `blocked` : `waitingForStart`)
    this.fullName = parent ? `${parent.fullName}/${name}` : name

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
      if (this.parent.oneOff) {
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
    console.log(`${this.fullName} - ${message}`)
  }

  start() {
    switch (this.state) {
      case `waitingForStart`:
        if (this.canStart()) {
          this.log(`Started.`)
          this.state = `running`
          this.performStart()
        } else {
          this.log(`Start requested, but blocked.`)
          this.state = `blocked`
        }
        break
      case `running`:
        this.log(`Start requested; waiting for opportunity to restart...`)
        this.state = `restarting`
        break
      case `done`:
        this.log(`Start requested; discarding previous result and invalidating dependents...`)
        this.state = `blocked`
        this.dependents.forEach(dependent => dependent.invalidate(1))
        handleBuildStageChanges()
        break
      case `failed`:
        this.log(`Start requested; restarting following previous failure...`)
        this.state = `blocked`
        this.dependents.forEach(dependent => dependent.invalidate(1))
        handleBuildStageChanges()
        break
      case `blocked`:
      case `restarting`:
      case `disabled`:
        break
      default:
        this.criticalStop(`State "${this.state}" is not implemented by "start".`)
    }
  }

  invalidate(levels) {
    switch (this.state) {
      case `running`:
        this.log(`${`\t`.repeat(levels)}Running; restarting.`)
        this.state = `restarting`
        break

      case `done`:
        this.log(`${`\t`.repeat(levels)}Previous completion invalidated.`)
        this.state = `blocked`
        this.dependents.forEach(dependent => dependent.invalidate(levels + 1))
        break

      case `failed`:
        this.log(`${`\t`.repeat(levels)}Previous failure invalidated.`)
        this.state = `blocked`
        this.dependents.forEach(dependent => dependent.invalidate(levels + 1))
        break

      case `waitingForStart`:
      case `blocked`:
      case `restarting`:
      case `disabled`:
        break
      default:
        this.criticalStop(`State "${this.state}" is not implemented by "invalidate".`)
    }
  }

  blocksDependents() {
    switch (this.state) {
      case `done`:
        return false
      case `waitingForStart`:
      case `blocked`:
      case `running`:
      case `restarting`:
      case `disabled`:
      case `failed`:
        return true
      default:
        this.criticalStop(`State "${this.state}" is not implemented by "blocksDependents".`)
    }
  }

  blocksDependencies() {
    switch (this.state) {
      case `running`:
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
        if (this.canStart()) {
          this.log(`Done, but restarting...`)
          this.state = `running`
          this.performStart()
        } else {
          this.log(`Done, but restart blocked.`)
          this.state = `blocked`
          handleBuildStageChanges()
        }
        break
      default:
        this.criticalStop(`State "${this.state}" is not implemented by "done".`)
    }
  }

  canStart() {
    if (this.dependencies.some(dependency => dependency.blocksDependents())) {
      return false
    }

    if (this.dependents.some(dependent => dependent.blocksDependencies())) {
      return false
    }

    return true
  }

  checkState() {
    switch (this.state) {
      case `blocked`:
        if (!this.canStart()) {
          return
        }

        this.log(`Starting...`)
        this.state = `running`
        this.performStart()
        break
      case `waitingForStart`:
      case `running`:
      case `restarting`:
      case `done`:
      case `disabled`:
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
