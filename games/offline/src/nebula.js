var nebulaScroll = parameter(2)

var nebulaProgram

(function () {
  var rampSum = vector(float(0), float(0))
  function sampleNebulaAt(location, modifyRamp) {
    var density = float(-0.875)
    function addLayer(scale, amplitude, seed, parallax) {
      var scaled = multiply(add(location, multiply(nebulaScroll, parallax)), scale)
      var tileId = floor(scaled)
      var nextTileId = ceil(scaled)
      var positionInTile = add(multiply(sin(add(multiply(fract(scaled), float(Math.PI)), float(Math.PI * 1.5))), float(0.5)), float(0.5))

      var lowerLeft = random(tileId, seed, float(1000))
      var lowerRight = random(vector(x(nextTileId), y(tileId)), seed, float(1000))
      var upperLeft = random(vector(x(tileId), y(nextTileId)), seed, float(1000))
      var upperRight = random(vector(x(nextTileId), y(nextTileId)), seed, float(1000))

      var positionInTileX = x(positionInTile)
      var positionInTileY = y(positionInTile)

      if (modifyRamp) {
        var ramp = add(divide(sin(multiply(add(multiply(fract(scaled), float(2)), float(1.5)), float(Math.PI))), float(2.0)), float(0.5))

        var xRamp = mix(
          subtract(lowerLeft, lowerRight),
          subtract(upperLeft, upperRight),
          positionInTileY
        )

        var yRamp = mix(
          subtract(lowerLeft, upperLeft),
          subtract(lowerRight, upperRight),
          positionInTileX
        )

        rampSum = add(rampSum, multiply(amplitude, multiply(ramp, vector(xRamp, yRamp))))
      }

      var mixedA = mix(
        lowerLeft,
        lowerRight,
        x(positionInTile)
      )

      var mixedB = mix(
        upperLeft,
        upperRight,
        x(positionInTile)
      )

      density = add(
        density,
        multiply(
          mix(mixedA, mixedB, y(positionInTile)),
          amplitude
        )
      )
    }

    addLayer(float(0.454), float(1.1), float(5835.3463), float(0.1))
    addLayer(float(0.993), float(0.4), float(9493.2387), float(0.5))
    addLayer(float(1.854), float(0.4), float(8343.5763), float(1))
    addLayer(float(8.23), float(0.1), float(2343.4859), float(0.5))
    addLayer(float(7.42), float(0.1), float(4587.3487), float(0.7))

    return density
  }

  var coreDensity = sampleNebulaAt(uv, true)
  var otherDensity = sampleNebulaAt(add(uv, multiply(rampSum, float(2))), false)

  var densityLowLow = vector(float(0.4), float(0.1), float(0.5))
  var densityLowHigh = vector(float(0.2), float(0.4), float(0.9))

  var densityHighLow = vector(float(0.4), float(0.2), float(0.1))
  var densityHighHigh = vector(float(0.9), float(0.7), float(0.1))

  var blendA = mix(densityLowLow, densityHighLow, coreDensity)
  var blendB = mix(densityLowHigh, densityHighHigh, coreDensity)

  nebulaProgram = compileGlsl(
    vector(mix(blendA, blendB, otherDensity), coreDensity)
  )
})()
