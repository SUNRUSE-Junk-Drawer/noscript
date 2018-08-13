# js13kgames-template

This is a little build pipeline which compiles small applications, intended for
the [Js13kGames competition](https://js13kgames.com).

It is a (heavily diverged) fork of
[Spartan Engine](https://github.com/jameswilddev/spartan-engine).

# Build pipeline

The build pipeline is a Node.JS application which is capable of watching for
changes and incrementally building the game code and content as changes occur.

## Metadata

Each game includes a `metadata.json` file which describes metadata about the
game.  This includes:

<dl>
  <dt>applicationId</dt>
  <dd>An invariant name for the application, without spaces.</dd>
  <dt>applicationName</dt>
  <dd>A "friendly" name for the application, as would be shown to the user.</dd>
  <dt>productId</dt>
  <dd>An invariant name for the product the application is part of, without
  spaces.</dd>
  <dt>productName</dt>
  <dd>A "friendly" name for the product the application is part of, as would be
  shown to the user.</dd>
  <dt>companyId</dt>
  <dd>An invariant name for the company which created the application, without
  spaces.</dd>
  <dt>companyName</dt>
  <dd>A "friendly" name for the company which created the application, as would
  be shown to the user.</dd>
  <dt>description</dt>
  <dd>A description of the application, as would be shown to the user.</dd>
  <dt>timing.beatsPerMinute</dt>
  <dd>
  The number of beats per minute of the timing system.
  The "beat" function is executed once per beat.
  </dd>
  <dt>timing.ticksPerBeat</dt>
  <dd>
  The number of ticks per beat of the timing system.
  This should be used by your game logic (i.e. physics).
  </dd>
  <dt>timing.beatsPerBar</dt>
  <dd>
  The number of beats per bar of the timing system.
  This should be used by your procedural music.
  </dd>
  <dt>targetAspectRatio.horizontally</dt>
  <dd>The horizontal of the target aspect ratio; the 16 in 16:9.</dd>
  <dt>targetAspectRatio.vertically</dt>
  <dd>The vertical of the target aspect ratio; the 9 in 16:9.</dd>
</dl>

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
