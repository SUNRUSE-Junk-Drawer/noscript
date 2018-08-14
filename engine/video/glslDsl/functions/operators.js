function add(a, b) {
  return emitBinary(a, b, "+")
}

function subtract(a, b) {
  return emitBinary(a, b, "-")
}

function multiply(a, b) {
  return emitBinary(a, b, "*")
}

function divide(a, b) {
  return emitBinary(a, b, "/")
}

function negate(a) {
  return emitUnaryOrFunction(a, "-")
}
