function uniformFloat(parameter, x) {
  gl.uniform1f(parameter.location, x)
}

function uniformVec2(parameter, x, y) {
  gl.uniform2f(parameter.location, x, y)
}

function uniformVec3(parameter, x, y, z) {
  gl.uniform3f(parameter.location, x, y, z)
}

function uniformVec4(parameter, x, y, z, w) {
  gl.uniform4f(parameter.location, x, y, z, w)
}
