function positionedSprite(x, y, width, height) {
  width /= 2
  height /= 2
  sprite(
    (x - width) * xScale,
    (y - height) * yScale,
    (x + width) * xScale,
    (y + height) * yScale,
    -width,
    -height,
    width,
    height
  )
}

function fitBackground() {
  positionedSprite(
    0,
    0,
    targetAspectRatioHorizontally,
    targetAspectRatioVertically
  )
}

function fillBackground() {
  positionedSprite(
    0,
    0,
    actualWidth,
    actualHeight
  )
}
