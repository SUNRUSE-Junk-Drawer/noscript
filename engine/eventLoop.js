var time = audioContextTime()

var secondsPerBeat = 60 / beatsPerMinute
var secondsPerTick = secondsPerBeat / ticksPerBeat
var numberOfTicks = 0
var numberOfBeats = 0
var numberOfBars = 0

function eventLoop() {
  var nextTime = audioContextTime()
  while (time + secondsPerTick <= nextTime) {
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

    time += secondsPerTick
  }

  prepareFrame()
  render()

  requestAnimationFrame(eventLoop)
}

requestAnimationFrame(eventLoop)
