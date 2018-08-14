var time = audioContext.currentTime
var elapsed = 0
var tickProgress = 1

var secondsPerBeat = 60 / beatsPerMinute
var secondsPerTick = secondsPerBeat / ticksPerBeat
var numberOfTicks = 0
var numberOfBeats = 0
var numberOfBars = 0

function eventLoop() {
  var now = audioContext.currentTime
  tickProgress += (now - time) / secondsPerTick
  elapsed += now - time
  time = now
  while (tickProgress >= 1) {
    tick()
    if (!(numberOfTicks % ticksPerBeat)) {
      beat()
      if (!(numberOfBeats % beatsPerBar)) {
        bar()
        numberOfBars++
      }
      numberOfBeats++
    }
    numberOfTicks++

    tickProgress -= 1
  }

  prepareFrame()
  render()

  requestAnimationFrame(eventLoop)
}

requestAnimationFrame(eventLoop)
