function tick() {
}

function beat() {
}

function bar() {
  kick(0)
  kick(2.75)
  if (numberOfBars % 2) {
    kick(3.5)
    openHiHat(3.75)
  }
  snare(1)
  snare(2)
  snare(2.25)
  snare(3)
  openHiHat(0)
  openHiHat(2.75)
  for (var i = 0.25; i < 4; i += 0.25) {
    if (i != 2.75 && (i != 3.75 || !(numberOfBars % 2))) closedHiHat(i)
  }
}

function render() {
}
