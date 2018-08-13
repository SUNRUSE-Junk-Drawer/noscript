var snareGain = audioContext.createGain()
snareGain.gain.value = 0
var snareBandpass = audioContext.createBiquadFilter()
snareBandpass.type = "bandpass"
snareBandpass.frequency.value = 1200
snareBandpass.Q.value = 0.7
whiteNoise.connect(snareGain)
snareGain.connect(snareBandpass)
snareBandpass.connect(audioContext.destination)

function snare(inBeats) {
  var startTime = time + inBeats * secondsPerBeat
  snareGain.gain.setValueAtTime(1, startTime)

  var endTime = startTime + 0.125
  snareGain.gain.linearRampToValueAtTime(0, endTime)
}
