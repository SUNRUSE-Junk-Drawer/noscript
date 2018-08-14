var padOscillator = audioContext.createOscillator()
padOscillator.type = "sawtooth"

var padOscillatorGain = audioContext.createGain()
padOscillatorGain.gain.value = 0

var padOscillatorBandpass = audioContext.createBiquadFilter()
padOscillatorBandpass.type = "bandpass"
padOscillatorBandpass.frequency.value = 600
padOscillatorBandpass.Q.value = 1.2

var padBuffer = audioContext.createBuffer(2, sampleRate, sampleRate)
for (var channel = 0; channel < padBuffer.numberOfChannels; channel++) {
  var channelData = padBuffer.getChannelData(channel)
  for (var i = 0; i < sampleRate; i++) {
    channelData[i] = (Math.random() * 2 - 1) * (Math.pow(1 - (i / sampleRate), 8192) + 1)
  }
}

var padConvolver = audioContext.createConvolver()
padConvolver.buffer = padBuffer

padOscillator.connect(padOscillatorGain)
padOscillatorGain.connect(padOscillatorBandpass)
padOscillatorBandpass.connect(padConvolver)
padConvolver.connect(audioContext.destination)

padOscillator.start()

function pad(inBeats, notes, offset, forBeats, notesPerBeat) {
  var start = time + inBeats * secondsPerBeat
  var end = start + forBeats * secondsPerBeat
  var interval = secondsPerBeat / notesPerBeat
  var note = 0

  for (var when = start; when < end; when += interval) {
    padOscillator.frequency.setValueAtTime(440 * Math.pow(2, (notes[note] + offset) / 12), when)
    note = (note + 1) % notes.length
  }
  padOscillatorGain.gain.setValueAtTime(2.4, start)
}

function padOff(inBeats) {
  padOscillatorGain.gain.setValueAtTime(0, time + inBeats * secondsPerBeat)
}
