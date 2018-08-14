var glsl

var uv = {
  glslName: "q",
  mangleableAxes: 2
}

function glslTypeName(axes) {
  if (axes == 1) {
    return "float"
  } else {
    return "vec" + axes
  }
}

function emitGlsl(axes, template) {
  var name = variable()
  glsl += glslTypeName(axes) + " " + name + "=" + template + ";"
  return name
}

function emitGlslBinary(a, b, symbol) {
  return emitGlsl(combinedAxes(a, b), a.glslName + symbol + b.glslName)
}

function emitGlslUnaryOrFunction(symbol) {
  var template = ""
  var args = arguments
  var totalAxes = 1
  for (var i = 1; i < args.length; i++) {
    var arg = args[i]
    if (i > 1) {
      template += ","
    }
    template += arg.glslName
    totalAxes = Math.max(totalAxes, arg.mangleableAxes)
  }
  return emitGlsl(totalAxes, symbol + "(" + template + ")")
}

function emitGlslUnaryOrFunctionWhichPerformsAComponentSum(symbol) {
  var template = ""
  var args = arguments
  for (var i = 1; i < args.length; i++) {
    var arg = args[i]
    if (i > 1) {
      template += ","
    }
    template += arg.glslName
  }
  return emitGlsl(1, symbol + "(" + template + ")")
}
