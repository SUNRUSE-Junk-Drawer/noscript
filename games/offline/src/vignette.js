var vignetteProgram = compileGlsl(
  vector(
    float(0),
    float(0),
    float(0),
    subtract(
      float(1),
      pow(
        divide(
          float(1),
          divide(
            distance(uv, vector(float(0), float(0))),
            float(6)
          )
        ),
        float(6)
      )
    )
  )
)
