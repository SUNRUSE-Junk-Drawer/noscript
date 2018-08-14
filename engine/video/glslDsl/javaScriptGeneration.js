var javaScript

function emitJavaScript(axes, template) {
  var name = variable()

  for (var axis = 0; axis < axes; axis++) {
    javaScript += "var " + name + "_" + axis + "=" + template.split("$").join(axis) + ";"
  }

  return name
}

function emitJavaScriptBinary(a, b, symbol) {
  return emitJavaScript(combinedAxes(a, b), a.javaScriptName + "_" + (a.mangleableAxes != 1 ? "$" : 0) + symbol + b.javaScriptName + "_" + (b.mangleableAxes != 1 ? "$" : 0))
}

function emitJavaScriptUnaryOrFunction(symbol) {
  var template = ""
  var args = arguments
  var totalAxes = 1
  for (var i = 1; i < args.length; i++) {
    var arg = args[i]
    if (i > 1) {
      template += ","
    }
    template += arg.javaScriptName + "_" + (arg.mangleableAxes != 1 ? "$" : 0)
    totalAxes = Math.max(totalAxes, arg.mangleableAxes)
  }
  return emitJavaScript(totalAxes, symbol + "(" + template + ")")
}

function compileJavaScript(returningValue) {
  var args = []
  for (var i = 0; i < parameters.length; i++) {
    var parameter = parameters[i]
    for (var axis = 0; axis < parameter.mangleableAxes; axis++) {
      args.push("p" + i + "_" + axis)
    }
  }

  args.push(javaScript + "return " + returningValue.javaScriptName + "_0")

  resetEmitted()
  return Function.apply(null, args)
}
