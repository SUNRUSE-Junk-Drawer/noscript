# noscript

This is a little build pipeline which compiles small applications without any
runtime JavaScript, intended for esoteric entries to the
[Js13kGames competition](https://js13kgames.com).

It is a (heavily diverged) fork of
[Spartan Engine](https://github.com/jameswilddev/spartan-engine) and
[js13kgames-template](https://github.com/jameswilddev/js13kgames-template).

# Build pipeline

The build pipeline is a Node.JS application which is capable of watching for
changes and incrementally building the game code and content as changes occur.

## Building

Node.JS is a build-time dependency of every platform as it is required to host
the build pipeline.

### One-off builds

One-off builds start and then stop on error (exit code 1) or success (exit code
0).  They can be started from the terminal by entering `npm run-script oneOff`,
or by selecting the "One-off build" build task in Visual Studio Code.

### Watch builds

Watch builds start and do not stop until terminated, automatically incrementally
building on changes.  Errors may prevent end-products being created, but do not
cancel the process.  They can be started from the terminal by entering
`npm run-script watch`, or by selecting the "Watch for changes" build task in
Visual Studio Code.
