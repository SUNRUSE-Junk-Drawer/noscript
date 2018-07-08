export default class BuildStage {
  constructor(name, dependencies) {
    this.name = name
    this.dependencies = dependencies

    this.dependents = []
    this.running = false
    this.needsToStartAgain = false
    this.hasCompletedAtLeastOnce = false

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
    if (this.running) {
      this.needsToStartAgain = true
      this.log(`Re-start queued`)
      return
    }

    for (const dependency of this.dependencies) {
      if (!dependency.hasCompletedAtLeastOnce) {
        this.log(`Unable to start until dependency "${dependency.name}" completes at least once`)
        return
      }
    }

    this.log(`Starting...`)
    this.running = true
    this.needsToStartAgain = false
    this.performStart()
  }

  done() {
    this.log(`Done.`)
    this.running = false
    this.hasCompletedAtLeastOnce = true
    for (const dependent of this.dependents) {
      dependent.start()
    }
    if (this.needsToStartAgain) {
      this.log(`Starting again...`)
      this.needsToStartAgain = false
      this.performStart()
    }
  }

  performStart() {
    this.log(`This process has not yet been implemented.`)
    this.done()
  }
}
