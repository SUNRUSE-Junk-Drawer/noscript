var gl = c.getContext("webgl", {
  alpha: false,
  depth: false,
  antialias: false
})

var width
var height

function prepareFrame() {
  var dpr = devicePixelRatio
  width = c.clientWidth * dpr
  height = c.clientHeight * dpr
  c.width = width
  c.height = height
  gl.viewport(0, 0, width, height)
}
