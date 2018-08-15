// This algorithm is based on http://glslsandbox.com/e#32326.0.
function random(a, seed) {
  function hash(b) {
    var scaled = multiply(b, seed)
    return fract(multiply(scaled, fract(scaled)))
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
