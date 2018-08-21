import CleanCss from "clean-css"

export default {
  cleanCss(css, onSuccess, onError) {
    const minified = new CleanCss({
      level: {
        2: {
          all: true
        }
      }
    }).minify(css)

    if (minified.errors.length) {
      onError(minified.errors)
    } else {
      onSuccess(minified.styles)
    }
  }
}
