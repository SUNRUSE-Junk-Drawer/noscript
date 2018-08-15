function emitJavaScriptComponentSum(a) {
  var name = variable()
  javaScript += "var " + name + "="
  for (var axis = 0; axis < a.mangleableAxes; axis++) {
    if (axis) {
      javaScript += "+"
    }
    javaScript += a.javaScriptName + "_" + axis
  }
  javaScript += ";"
  return {
    javaScriptName: name,
    mangleableAxes: 1
  }
}

function emitJavaScriptDot(a, b) {
  return emitJavaScriptComponentSum(emitJavaScriptBinary(a, b, "*"))
}

function dot(a, b) {
  return {
    javaScriptName: emitJavaScriptDot(a, b),
    glslName: emitGlslUnaryOrFunctionWhichPerformsAComponentSum("dot", a, b),
    mangleableAxes: 1
  }
}

function emitJavaScriptLength(a) {
  return emitJavaScriptUnaryOrFunction("Math.sqrt", emitJavaScriptDot(a, a))
}

function length(a) {
  return {
    javaScriptName: emitJavaScriptLength(a),
    glslName: emitGlslUnaryOrFunctionWhichPerformsAComponentSum("length", a),
    mangleableAxes: 1
  }
}

function distance(a, b) {
  return {
    javaScriptName: emitJavaScriptLength(emitJavaScriptBinary(a, b, "-")),
    glslName: emitGlslUnaryOrFunctionWhichPerformsAComponentSum("distance", a, b),
    mangleableAxes: 1
  }
}

function normal(a) {
  return {
    javaScriptName: emitJavaScriptBinary(a, emitJavaScriptLength(a), "/"),
    glslName: emitGlslUnaryOrFunctionWhichPerformsAComponentSum("normal", a),
    mangleableAxes: 1
  }
}
