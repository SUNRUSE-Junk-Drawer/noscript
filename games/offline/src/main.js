function tick() {
}

function beat() {
}

function bar() {
}

function render() {
  additiveBlending()
  useProgram(starfieldProgram)
  uniformFloat(starfieldElapsed, elapsed)

  uniformVec2(starfieldScroll, elapsed * 0.3, 0)
  uniformVec2(starfieldScale, 0.8, 0.8)
  uniformFloat(starfieldRadius, 0.1)
  uniformVec3(starfieldColor, 2, 2, 1.75)
  fillBackground()

  uniformVec2(starfieldScroll, elapsed * 0.2, 0)
  uniformVec2(starfieldScale, 1.4, 1.4)
  uniformFloat(starfieldRadius, 0.1)
  uniformVec3(starfieldColor, 1.5, 1.75, 2)
  fillBackground()

  uniformVec2(starfieldScroll, elapsed * 0.1, 0)
  uniformVec2(starfieldScale, 2.1, 2.1)
  uniformFloat(starfieldRadius, 0.1)
  uniformVec3(starfieldColor, 1, 1.5, 2)
  fillBackground()

  alphaBlending()
  useProgram(nebulaProgram)
  uniformVec2(nebulaScroll, elapsed, 0)
  fillBackground()

  additiveBlending()
  useProgram(protostarProgram)
  uniformFloat(protostarElapsed, elapsed)
  fillBackground()

  alphaBlending()
  useProgram(vignetteProgram)
  fillBackground()
}
