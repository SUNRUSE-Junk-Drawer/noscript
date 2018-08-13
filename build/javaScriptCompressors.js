import * as uglifyJs from "uglify-js"
import uglifyJsDomProps from "uglify-js/tools/domprops"

export default {
  uglifyJs: {
    parse(text, onSuccess, onError) {
      const parsed = uglifyJs.minify(text, {
        parse: {},
        compress: false,
        mangle: false,
        output: {
          ast: true,
          code: false
        }
      })
      if (parsed.error) {
        onError(parsed.error)
      } else {
        onSuccess(parsed.ast)
      }
    },
    combine(allParsed, onSuccess, onError) {
      allParsed = allParsed.map(item => item.clone(true))

      const combined = allParsed[0]

      allParsed.slice(1).forEach(item => {
        combined.body = combined.body.concat(item.body)
        combined.end = item.end
      })

      const minified = uglifyJs.minify(combined, {
        mangle: {
          toplevel: true,
          properties: {
            reserved: uglifyJsDomProps
          }
        },
        toplevel: true,
        output: {
          ast: false,
          code: true
        }
      })

      if (minified.error) {
        onError(minified.error)
      } else {
        onSuccess(minified.code)
      }
    }
  }
}
