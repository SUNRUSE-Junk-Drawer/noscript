var bassOscillatorA = audioContext.createOscillator()
bassOscillatorA.type = "sawtooth"
bassOscillatorA.detune.value = -6

var bassPannerA = audioContext.createStereoPanner()
bassPannerA.pan.value = -0.5

var bassOscillatorB = audioContext.createOscillator()
bassOscillatorB.detune.value = 6
bassOscillatorB.type = "sawtooth"

var bassPannerB = audioContext.createStereoPanner()
bassPannerB.pan.value = 0.5

var bassLowpass = audioContext.createBiquadFilter()
bassLowpass.type = "lowpass"
bassLowpass.Q.value = 2

var bassGain = audioContext.createGain()
bassGain.gain.value = 0

bassOscillatorA.connect(bassPannerA)
bassOscillatorB.connect(bassPannerB)
bassPannerA.connect(bassLowpass)
bassPannerB.connect(bassLowpass)
bassLowpass.connect(bassGain)
bassGain.connect(audioContext.destination)

bassOscillatorA.start(0)
bassOscillatorB.start(0)

function bass(inBeats, note) {
  var startTime = time + inBeats * secondsPerBeat
  var frequency = 55 * Math.pow(2, note / 12)
  bassOscillatorA.frequency.setValueAtTime(frequency, startTime)
  bassOscillatorB.frequency.setValueAtTime(frequency, startTime)
  bassLowpass.frequency.setValueAtTime(1200, startTime)
  bassLowpass.frequency.linearRampToValueAtTime(500, startTime + 0.15)
  bassGain.gain.setValueAtTime(1, startTime)
  bassGain.gain.linearRampToValueAtTime(0.5, startTime + 0.15)
}

function bassAccent(inBeats, note) {
  bass(inBeats, note + 12)
}

function bassOff(inBeats) {
  var startTime = time + inBeats * secondsPerBeat
  bassGain.gain.setValueAtTime(0, startTime)
}
