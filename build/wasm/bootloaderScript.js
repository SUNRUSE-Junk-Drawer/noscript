onerror = function () {
  alert.apply(window, arguments)
}

var svgClassNameVisibility = {
  javascriptWarning: false,
  loading: false,
  downloadFailed: false,
  webAssemblyUnsupported: false,
  downloading: false,
  compilingWebAssembly: false
}

function refreshSvgClassVisibility() {
  var svg = document.getElementById("loading-screen")

  if (!svg) {
    return
  }

  if (!svg.contentDocument) {
    return
  }

  for (var className in svgClassNameVisibility) {
    var elements = svg.contentDocument.getElementsByClassName(className)
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = svgClassNameVisibility[className] ? "block" : "none"
    }
  }
}

if (typeof WebAssembly === "undefined") {
  svgClassNameVisibility.webAssemblyUnsupported = true
} else {
  svgClassNameVisibility.loading = true
}

refreshSvgClassVisibility()

onload = function () {
  refreshSvgClassVisibility()
}
