// This algorithm is based on http://glslsandbox.com/e#32326.0.
function random(a, seed, period) {
  function hash(b) {
    var scaled = multiply(b, seed)
    var wrapped = multiply(fract(divide(scaled, period)), period)
    return fract(multiply(wrapped, fract(wrapped)))
  }
  switch (a.mangleableAxes) {
    case 1:
      return hash(a)
    case 2:
      return hash(add(
        x(a),
        hash(y(a))
      ))
    case 3:
      return hash(add(
        x(a),
        hash(add(
          y(a),
          hash(z(a))
        ))
      ))
    case 4:
      return hash(add(
        x(a),
        hash(add(
          y(a),
          hash(add(
            z(a),
            hash(w(a))
          ))
        ))
      ))
  }
}
