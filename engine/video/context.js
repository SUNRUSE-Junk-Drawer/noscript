var gl = c.getContext("webgl", {
  alpha: false,
  depth: false,
  antialias: false
})

var width
var height
var xScale
var yScale
var actualWidth
var actualHeight

function prepareFrame() {
  var dpr = devicePixelRatio
  width = c.clientWidth * dpr
  height = c.clientHeight * dpr
  c.width = width
  c.height = height
  var targetAspectRatio = targetAspectRatioHorizontally / targetAspectRatioVertically
  var actualAspectRatio = width / height
  if (targetAspectRatio > actualAspectRatio) {
    xScale = 2 / targetAspectRatioHorizontally
    yScale = 2 / targetAspectRatioVertically * actualAspectRatio / targetAspectRatio
  } else {
    xScale = 2 / targetAspectRatioHorizontally * targetAspectRatio / actualAspectRatio
    yScale = 2 / targetAspectRatioVertically
  }
  actualWidth = 2 / xScale
  actualHeight = 2 / yScale
  gl.viewport(0, 0, width, height)
}
