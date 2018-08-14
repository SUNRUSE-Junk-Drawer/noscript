function tick() {
}

function beat() {
}

var minorScale = [-12, -9, -5, 0, 3, 7]

function bar() {
  kick(0)
  kick(2.75)
  if (numberOfBars % 2) {
    kick(3.5)
    openHiHat(3.75)
  }
  snare(1)
  snare(2)
  snare(2.25)
  snare(3)
  openHiHat(0)
  openHiHat(2.75)
  for (var i = 0.25; i < 4; i += 0.25) {
    if (i != 2.75 && (i != 3.75 || !(numberOfBars % 2))) closedHiHat(i)
  }

  pad(0, minorScale, numberOfBars % 4 > 1 ? -3 : 0, beatsPerBar, 4)

  bass(0.5, 0)
  bassOff(1)
  bass(1.5, 0)
  bassOff(2)

  if (numberOfBars % 2) {
    bass(3.5, numberOfBars % 4 == 3 ? 3 : 4)
    bassOff(4)
  }
}

var color = parameter(3)

var topRightCoord = fract(uv)
var topRightValue = max(x(topRightCoord), y(topRightCoord))

var bottomLeftCoord = subtract(float(1), topRightCoord)
var bottomLeftValue = max(x(bottomLeftCoord), y(bottomLeftCoord))

var testProgram = compileGlsl(
  vector(
    multiply(
      pow(max(topRightValue, bottomLeftValue), float(64)),
      color
    ),
    float(1)
  )
)

function render() {
  useProgram(testProgram)
  uniformVec3(color, 1, 0, 0)
  fillBackground()

  uniformVec3(color, 0, 1, 0)
  fitBackground()

  uniformVec3(color, 0, 0.5, 1)
  var circular = elapsed * 2 * Math.PI / secondsPerBeat
  positionedSprite(Math.sin(circular) * 5, Math.cos(circular) * 5, 2, 2)
  positionedSprite(Math.sin(circular / beatsPerBar) * 3, Math.cos(circular / beatsPerBar) * 3, 2, 2)
}
