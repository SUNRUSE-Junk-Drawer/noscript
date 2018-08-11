var whiteNoiseBuffer = audioContext.createBuffer(1, sampleRate, sampleRate)
var whiteNoiseData = whiteNoiseBuffer.getChannelData(0)
for (var sample = 0; sample < sampleRate; sample++) {
  whiteNoiseData[sample] = Math.random() * 2 - 1
}
var whiteNoise = audioContext.createBufferSource()
whiteNoise.buffer = whiteNoiseBuffer
whiteNoise.loop = true
whiteNoise.start()
