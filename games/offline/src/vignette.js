var vignetteProgram = compileGlsl(
  vector(
    float(0),
    float(0),
    float(0),
    divide(
      distance(uv, vector(float(0), float(0))),
      float(9)
    )
  )
)
