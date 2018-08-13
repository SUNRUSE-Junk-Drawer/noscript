var kickOscillator = audioContext.createOscillator()
var kickGain = audioContext.createGain()
kickGain.gain.value = 0
kickOscillator.connect(kickGain)
kickGain.connect(audioContext.destination)
kickOscillator.start(0)

function kick(inBeats) {
  var startTime = time + inBeats * secondsPerBeat
  kickOscillator.frequency.setValueAtTime(200, startTime)
  kickGain.gain.setValueAtTime(1, startTime)

  var endTime = startTime + 0.1
  kickOscillator.frequency.linearRampToValueAtTime(0, endTime)
  kickGain.gain.linearRampToValueAtTime(0, endTime)
}
