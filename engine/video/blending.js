function disableBlending() {
  gl.disable(GL_BLEND)
}

function additiveBlending() {
  gl.blendFunc(GL_ONE, GL_ONE)
  gl.enable(GL_BLEND)
}

function alphaBlending() {
  gl.blendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)
  gl.enable(GL_BLEND)
}
