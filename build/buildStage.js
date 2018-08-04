export default class BuildStage {
  constructor(game, name, dependencies, disabled) {
    this.game = game
    this.name = name
    this.dependencies = dependencies

    this.dependents = []
    this.state = disabled ? `disabled` : `waitingToStart`

    if (disabled) {
      this.log(`Disabled.`)
    }

    game.buildStages.push(this)
    for (const dependency of this.dependencies) {
      dependency.listen(this)
      if (dependency.state == `disabled` && this.state != `disabled`) {
        this.log(`Disabled by dependency "${dependency.name}".`)
        this.state = `disabled`
      }
    }
  }

  handle(potentialError, onSuccess) {
    if (potentialError) {
      this.log(`Failed; "${potentialError}"`)
      if (this.game.oneOff) {
        process.exit(1)
      } else {
        this.state = `failed`
        this.game.handleBuildStageChanges()
      }
    } else {
      onSuccess()
    }
  }

  log(message) {
    console.log(`${this.game.name}/${this.name} - ${message}`)
  }

  listen(buildStage) {
    this.dependents.push(buildStage)
  }

  start() {
    switch (this.state) {
      case `waitingToStart`:
        this.log(`Start requested; waiting to start.`)
        this.game.handleBuildStageChanges()
        break
      case `running`:
        this.log(`Start requested; waiting for opportunity to restart...`)
        this.state = `restarting`
        break
      case `restarting`:
        break
      case `completed`:
        this.log(`Start requested; discarding previous result and invalidating dependents...`)
        this.state = `waitingToStart`
        this.dependents.forEach(dependent => dependent.invalidate(1))
        this.game.handleBuildStageChanges()
        break
      case `disabled`:
        break
      case `failed`:
        this.log(`Start requested; restarting following previous failure...`)
        this.state = `waitingToStart`
        this.dependents.forEach(dependent => dependent.invalidate(1))
        this.game.handleBuildStageChanges()
        break
    }
  }

  invalidate(levels) {
    switch (this.state) {
      case `waitingToStart`:
        break
      case `running`:
        this.log(`${`\t`.repeat(levels)}Running; restarting.`)
        this.state = `restarting`
        break
      case `restarting`:
        break
      case `completed`:
        this.log(`${`\t`.repeat(levels)}Previous completion invalidated.`)
        this.state = `waitingToStart`
        this.dependents.forEach(dependent => dependent.invalidate(levels + 1))
        break
      case `disabled`:
        break
      case `failed`:
        break
    }
  }

  reasonForDependentNotToStart() {
    switch (this.state) {
      case `waitingToStart`:
        return `"${this.name}" is waiting to start.`
      case `running`:
        return `"${this.name}" is running.`
      case `restarting`:
        return `"${this.name}" is restarting.`
      case `completed`:
        return null
      case `disabled`:
        return `"${this.name} is disabled.`
      case `failed`:
        return `"${this.name}" failed.`
    }
  }

  reasonForDependencyNotToStart() {
    switch (this.state) {
      case `running`:
        return `"${this.name}" is running.`
      case `restarting`:
        return `"${this.name}" is restarting.`
      case `waitingToStart`:
      case `completed`:
      case `failed`:
        return this.dependents
          .map(dependent => dependent.reasonForDependencyNotToStart())
          .filter(reason => reason)
          .map(reason => `"${this.name}" -> ${reason}`)
        [0]
      case `disabled`:
        return null
    }
  }

  done() {
    switch (this.state) {
      case `running`:
        this.log(`Done.`)
        this.state = `completed`
        this.game.handleBuildStageChanges()
        break
      case `restarting`:
        this.log(`Done, but restarting...`)
        this.state = `waitingToStart`
        this.game.handleBuildStageChanges()
        break
      default:
        throw new Error(`Build stage "${this.name}" marked as done in state "${this.state}"`)
    }
  }

  checkState() {
    switch (this.state) {
      case `waitingToStart`:
        for (const dependency of this.dependencies) {
          const reason = dependency.reasonForDependentNotToStart()
          if (reason) {
            this.log(`Unable to start as dependency ${reason}`)
            return
          }
        }

        for (const dependent of this.dependents) {
          const reason = dependent.reasonForDependencyNotToStart()
          if (reason) {
            this.log(`Unable to start as dependent ${reason}`)
            return
          }
        }

        this.log(`Starting...`)
        this.state = `running`
        this.performStart()
        break
      case `running`:
        break
      case `restarting`:
        break
      case `completed`:
        break
      case `disabled`:
        break
      case `failed`:
        break
    }
  }

  performStart() {
    this.log(`This process has not yet been implemented.`)
    this.done()
  }
}
