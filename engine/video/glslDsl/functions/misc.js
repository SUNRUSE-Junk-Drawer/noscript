function emitMathFunction(name) {
  var remappedArgs = ["Math" + name, name]
  var args = arguments
  for (var i = 1; i < args.length; i++) {
    remappedArgs.push(args[i])
  }
  return emitUnaryOrFunction.apply(null, remappedArgs)
}

function log(a) {
  return emitMathFunction("log", a)
}

function pow(base, exponent) {
  return emitMathFunction("pow", base, exponent)
}

function sqrt(a) {
  return emitMathFunction("sqrt", a)
}


function abs(a) {
  return emitMathFunction("abs", a)
}

function round(a) {
  return emitMathFunction("round", a)
}

function floor(a) {
  return emitMathFunction("floor", a)
}

function ceil(a) {
  return emitMathFunction("ceil", a)
}

function min(a, b) {
  return emitMathFunction("min", a, b)
}

function max(a, b) {
  return emitMathFunction("max", a, b)
}

function fract(a) {
  return {
    javaScriptName: emitJavaScriptBinary(a, float(1), "%"),
    glslName: emitGlslUnaryOrFunction("fract", a),
    mangleableAxes: a.mangleableAxes
  }
}

function clamp(a, low, high) {
  return {
    javaScriptName: emitJavaScriptUnaryOrFunction("Math.max", emitJavaScriptUnaryOrFunction("Math.min", a, high), low),
    glslName: emitGlslUnaryOrFunction("clamp", a, low, high),
    mangleableAxes: combinedAxes(a, low, high)
  }
}

function mix(a, b, alpha) {
  return {
    javaScriptName: emitJavaScriptBinary(
      a,
      emitJavaScriptBinary(
        emitJavaScriptBinary(b, a, "-"),
        alpha,
        "*"
      ),
      "+"
    ),
    glslName: emitGlslUnaryOrFunction("mix", a, b, alpha),
    mangleableAxes: combinedAxes(a, b, alpha)
  }
}
