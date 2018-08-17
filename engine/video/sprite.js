function createBuffer(target, data) {
  var buffer = gl.createBuffer()
  gl.bindBuffer(target, buffer)
  gl.bufferData(target, data, GL_STATIC_DRAW)
  return buffer
}

var vertexBuffer = createBuffer(GL_ARRAY_BUFFER, new Uint8Array([
  0, 0,
  0, 255,
  255, 255,
  255, 0
]))

var indexBuffer = createBuffer(GL_ELEMENT_ARRAY_BUFFER, new Uint8Array([
  0, 1, 2,
  2, 3, 0
]))

function createShader(type, source) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, "precision mediump float;" + source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader) + "\n\nSource:\n" + source
  }
  return shader
}

var vertexShader = createShader(
  GL_VERTEX_SHADER,
  "uniform vec4 l;"
  + "uniform vec4 u;"
  + "attribute vec2 v;"
  + "varying vec2 q;"
  + "void main(){"
  + "q=mix(u.xy,u.zw,v);"
  + "gl_Position=vec4(mix(l.xy,l.zw,v),0.,1.);"
  + "}"
)

var currentProgram

function useProgram(program) {
  if (program == currentProgram) {
    return
  }
  if (currentProgram) {
    gl.disableVertexAttribArray(currentProgram.attribute)
  }
  currentProgram = program
  gl.useProgram(program.program)
  gl.vertexAttribPointer(program.attribute, 2, GL_UNSIGNED_BYTE, true, 0, 0)
  gl.enableVertexAttribArray(program.attribute)
}

function compileGlsl(returningValue) {
  var compiled = "varying vec2 q;"
  for (var i = parameters.length - 1; i >= 0; i--) {
    compiled += "uniform " + glslTypeName(parameters[i].mangleableAxes) + " p" + i + ";"
  }
  compiled += "void main(){" + glsl + "gl_FragColor=" + returningValue.glslName + ";}"
  var fragmentShader = createShader(GL_FRAGMENT_SHADER, compiled)
  var program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.useProgram(program)
  var wrappedProgram = {
    program: program,
    locationUniform: gl.getUniformLocation(program, "l"),
    uvUniform: gl.getUniformLocation(program, "u"),
    attribute: gl.getAttribLocation(program, "v")
  }
  for (var i = 0; i < parameters.length; i++) {
    var parameter = parameters[i]
    parameter.location = gl.getUniformLocation(program, parameter.glslName)
  }
  resetEmitted()
  return wrappedProgram
}

function sprite(ndcXN, ndcYN, ndcXP, ndcYP, uvXN, uvYN, uvXP, uvYP) {
  gl.uniform4f(currentProgram.locationUniform, ndcXN, ndcYN, ndcXP, ndcYP)
  gl.uniform4f(currentProgram.uvUniform, uvXN, uvYN, uvXP, uvYP)
  gl.drawElements(GL_TRIANGLES, 6, GL_UNSIGNED_BYTE, 0)
}
