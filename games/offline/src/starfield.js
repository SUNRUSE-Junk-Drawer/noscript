var starfieldScale = parameter(2)
var starfieldScroll = parameter(2)
var starfieldRadius = parameter(1)
var starfieldLocationNoise = parameter(1)
var starfieldColor = parameter(3)
var starfieldElapsed = parameter(1)

var starfieldProgram

(function () {
  var scaled = multiply(starfieldScale, add(starfieldScroll, uv))

  var cellId = floor(scaled)
  var cellValue = random(cellId, vector(float(5678.123), float(2233.193), float(9812.587)), float(1000))
  var samplingFromInCell = fract(scaled)
  var positionInCell = add(
    multiply(
      vector(x(cellValue), y(cellValue)),
      starfieldLocationNoise
    ),
    subtract(float(0.5), divide(starfieldLocationNoise, float(2.0)))
  )

  var starBrightness =
    multiply(
      sin(
        add(starfieldElapsed, multiply(z(cellValue), float(6.28)))
      ),
      pow(
        clamp(
          multiply(
            divide(
              float(1),
              starfieldRadius
            ),
            subtract(
              starfieldRadius,
              distance(samplingFromInCell, positionInCell)
            )
          ),
          float(0),
          float(1)
        ),
        float(4)
      )
    )

  starfieldProgram = compileGlsl(
    vector(
      multiply(
        starfieldColor,
        starBrightness
      ),
      float(1)
    )
  )
})()
