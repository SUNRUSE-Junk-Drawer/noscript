var nebulaScroll = parameter(2)

var nebulaProgram

(function () {
  function sampleNebulaAt(location) {
    var density = float(-0.875)
    function addLayer(scale, amplitude, seed, parallax) {
      var scaled = multiply(add(location, multiply(nebulaScroll, parallax)), scale)
      var tileId = floor(scaled)
      var positionInTile = add(multiply(sin(add(multiply(fract(scaled), float(Math.PI)), float(Math.PI * 1.5))), float(0.5)), float(0.5))
      //var ramp = add()

      var mixedA = mix(
        random(tileId, seed, float(1000)),
        random(add(tileId, vector(float(1), float(0))), seed, float(1000)),
        x(positionInTile)
      )

      var mixedB = mix(
        random(add(tileId, vector(float(0), float(1))), seed, float(1000)),
        random(add(tileId, vector(float(1), float(1))), seed, float(1000)),
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

  var coreDensity = sampleNebulaAt(uv)
  var densityToRight = sampleNebulaAt(add(uv, vector(float(-0.1), float(0))))
  var densityAbove = sampleNebulaAt(add(uv, vector(float(0), float(-0.1))))

  var sampleDirection = normalize(
    vector(
      subtract(densityToRight, coreDensity),
      subtract(densityAbove, coreDensity)
    )
  )

  var otherDensity = sampleNebulaAt(add(uv, multiply(sampleDirection, float(0.5))))

  var densityLowLow = vector(float(0.4), float(0.1), float(0.5))
  var densityLowHigh = vector(float(0.2), float(0.4), float(0.9))

  var densityHighLow = vector(float(0.4), float(0.2), float(0.1))
  var densityHighHigh = vector(float(0.9), float(0.7), float(0.1))

  var blendA = mix(densityLowLow, densityHighLow, coreDensity)
  var blendB = mix(densityLowHigh, densityHighHigh, coreDensity)

  nebulaProgram = compileGlsl(
    //vector(add(multiply(sampleDirection, float(0.5)), float(0.5)), float(0), coreDensity)
    vector(mix(blendA, blendB, otherDensity), coreDensity)
  )
})()
