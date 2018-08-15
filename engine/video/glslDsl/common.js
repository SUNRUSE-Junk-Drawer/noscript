var parameters = []
var variables = 0

function resetEmitted() {
  parameters = []
  javaScript = ""
  glsl = ""
}

resetEmitted()

function variable() {
  var name = "v" + variables
  variables++
  return name
}

function parameter(axes) {
  var name = "p" + parameters.length
  var newParameter = {
    javaScriptName: name,
    glslName: name,
    mangleableAxes: axes
  }
  parameters.push(newParameter)
  return newParameter
}

function combinedAxes() {
  var axes = 1
  var args = arguments
  for (var i = 0; i < args.length; i++) {
    axes = Math.max(axes, args[i].mangleableAxes)
  }
  return axes
}

function emitBinary(a, b, symbol) {
  return {
    javaScriptName: emitJavaScriptBinary(a, b, symbol),
    glslName: emitGlslBinary(a, b, symbol),
    mangleableAxes: combinedAxes(a, b)
  }
}

function emitUnaryOrFunction(javaScriptSymbol, glslSymbol) {
  var remappedArgs = []
  var args = arguments
  for (var i = 2; i < args.length; i++) {
    remappedArgs.push(args[i])
  }
  return {
    javaScriptName: emitJavaScriptUnaryOrFunction.apply(null, [javaScriptSymbol].concat(remappedArgs)),
    glslName: emitGlslUnaryOrFunction.apply(null, [glslSymbol].concat(remappedArgs)),
    mangleableAxes: args[2].mangleableAxes
  }
}

function float(value) {
  var asString = value.toString().split(".").concat("0").slice(0, 2).join(".")
  return {
    javaScriptName: emitJavaScript(1, asString),
    glslName: emitGlsl(1, asString),
    mangleableAxes: 1
  }
}

function vector() {
  var args = arguments
  var totalAxes = 0
  var name = variable()

  var glslContent = ""

  for (var i = 0; i < args.length; i++) {
    var arg = args[i]
    for (var axis = 0; axis < arg.mangleableAxes; axis++) {
      javaScript += "var " + name + "_" + totalAxes + "=" + arg.javaScriptName + "_" + axis + ";"
      totalAxes++
    }

    if (i) {
      glslContent += ","
    }
    glslContent += arg.glslName
  }

  var glslType = glslTypeName(totalAxes)
  glsl += glslType + " " + name + "=" + glslType + "(" + glslContent + ");"

  return {
    javaScriptName: name,
    glslName: name,
    mangleableAxes: totalAxes
  }
}

function x(a) {
  return {
    javaScriptName: emitJavaScript(1, a.javaScriptName + "_0"),
    glslName: emitGlsl(1, a.glslName + ".x"),
    mangleableAxes: 1
  }
}

function y(a) {
  return {
    javaScriptName: emitJavaScript(1, a.javaScriptName + "_1"),
    glslName: emitGlsl(1, a.glslName + ".y"),
    mangleableAxes: 1
  }
}

function z(a) {
  return {
    javaScriptName: emitJavaScript(1, a.javaScriptName + "_2"),
    glslName: emitGlsl(1, a.glslName + ".z"),
    mangleableAxes: 1
  }
}

function w(a) {
  return {
    javaScriptName: emitJavaScript(1, a.javaScriptName + "_3"),
    glslName: emitGlsl(1, a.glslName + ".w"),
    mangleableAxes: 1
  }
}
