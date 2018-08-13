var hiHatGain = audioContext.createGain()
hiHatGain.gain.value = 0
var hiHatBandpass = audioContext.createBiquadFilter()
hiHatBandpass.type = "bandpass"
hiHatBandpass.frequency.value = 10000
hiHatBandpass.Q.value = 0.5
var hiHatHighpass = audioContext.createBiquadFilter()
hiHatHighpass.type = "highpass"
hiHatHighpass.frequency.value = 7000
whiteNoise.connect(hiHatGain)
hiHatGain.connect(hiHatBandpass)
hiHatBandpass.connect(hiHatHighpass)
hiHatHighpass.connect(audioContext.destination)

function hiHat(inBeats, duration) {
  var startTime = time + inBeats * secondsPerBeat
  hiHatGain.gain.setValueAtTime(0.4, startTime)

  var endTime = startTime + duration
  hiHatGain.gain.linearRampToValueAtTime(0, endTime)
}

function closedHiHat(inBeats) {
  hiHat(inBeats, 0.05)
}

function openHiHat(inBeats) {
  hiHat(inBeats, 0.15)
}
