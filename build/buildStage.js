export const all = []

export const start = () => {
  console.log(`Performing state check...`)
  all.forEach(buildStage => buildStage.checkState())
  console.log(`Done.`)
}

export default class BuildStage {
  constructor(name, dependencies) {
    this.name = name
    this.dependencies = dependencies

    this.dependents = []
    this.state = `waitingToStart`

    all.push(this)
    for (const dependency of this.dependencies) {
      dependency.listen(this)
    }
  }

  handle(potentialError) {
    if (potentialError) {
      this.log(potentialError)
      throw potentialError
    }
  }

  log(message) {
    console.log(`${this.name} - ${message}`)
  }

  listen(buildStage) {
    this.dependents.push(buildStage)
  }

  start() {
    switch (this.state) {
      case `waitingToStart`:
        this.log(`Start requested; waiting to start.`)
        start()
        break
      case `running`:
        this.log(`Start requested; running (nothing to do).`)
        break
      case `restarting`:
        this.log(`Start requested; restarting (nothing to do).`)
        break
      case `completed`:
        this.log(`Start requested; discarding previous result and invalidating dependents...`)
        this.state = `waitingToStart`
        this.dependents.forEach(dependent => dependent.invalidate(1))
        start()
        break
    }
  }

  invalidate(levels) {
    switch (this.state) {
      case `waitingToStart`:
        this.log(`${`\t`.repeat(levels)}Waiting to start; nothing to invalidate.`)
        break
      case `running`:
        this.log(`${`\t`.repeat(levels)}Running; restarting.`)
        this.state = `restarting`
        break
      case `restarting`:
        this.log(`${`\t`.repeat(levels)}Restarting; nothing to invalidate.`)
        break
      case `completed`:
        this.log(`${`\t`.repeat(levels)}Previous completion invalidated.`)
        this.state = `waitingToStart`
        this.dependents.forEach(dependent => dependent.invalidate(levels + 1))
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
        return this.dependents
          .map(dependent => dependent.reasonForDependencyNotToStart())
          .filter(reason => reason)
          .map(reason => `"${this.name}" -> ${reason}`)
        [0]
    }
  }

  done() {
    switch (this.state) {
      case `running`:
        this.log(`Done.`)
        this.state = `completed`
        start()
        break
      case `restarting`:
        this.log(`Done, but restarting...`)
        this.state = `waitingToStart`
        start()
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
        this.log(`Running (nothing to do).`)
        break
      case `restarting`:
        this.log(`Restarting (nothing to do).`)
        break
      case `completed`:
        this.log(`Completed (nothing to do).`)
        break
    }
  }

  performStart() {
    this.log(`This process has not yet been implemented.`)
    this.done()
  }
}
