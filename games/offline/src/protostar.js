var protostarElapsed = parameter(1)

var protostarProgram

(function () {
  var scaled = divide(uv, float(16))

  var cellId = floor(scaled)
  var cellValue = random(cellId, vector(float(6565.626), float(9438.563)), float(1000))
  var samplingFromInCell = fract(scaled)
  var locationNoise = float(0.7)
  var positionInCell = add(
    multiply(
      vector(x(cellValue), y(cellValue)),
      locationNoise
    ),
    subtract(float(0.5), divide(locationNoise, float(2.0)))
  )

  var radius = float(0.1)

  var brightness =
    clamp(
      multiply(
        divide(
          float(1),
          radius
        ),
        subtract(
          radius,
          distance(samplingFromInCell, positionInCell)
        )
      ),
      float(0),
      float(1)
    )

  var positionDifference = subtract(positionInCell, samplingFromInCell)
  var angle = atan2(x(positionDifference), y(positionDifference))
  var angle1 = add(multiply(angle, float(4)), multiply(protostarElapsed, float(4.2)))
  var angle2 = add(multiply(angle, float(7)), multiply(protostarElapsed, float(2.7)))
  brightness = multiply(
    brightness,
    add(
      float(1.0),
      add(
        multiply(sin(angle1), float(0.005)),
        multiply(sin(angle2), float(-0.006))
      )
    )
  )
  brightness = pow(brightness, float(16))

  protostarProgram = compileGlsl(
    vector(
      multiply(
        vector(float(16), float(12), float(16)),
        brightness
      ),
      float(1)
    )
  )
})()
