# Spartan Engine

A crude, early, work-in-progress games engine.

## Architecture

This engine is divided into two components; the build pipeline and the runtime
engine.

### Build pipeline

The build pipeline is a Node.JS application which is capable of watching for
changes and incrementally building the game code and content as changes occur.

### Runtime engine

The runtime engine is a C89 application combining game-specific code with a slim
platform abstraction layer (excepting the Web, where the platform abstraction
layer is written in JavaScript).

## Platform abstraction

The platform abstraction layer exposes a minimalist subset of graphics, audio,
input, timing and I/O functions which are designed to be easy to port.

The "main" function is to be implemented by the platform abstraction layer,
which will then call into functions exposed by the game code when events occur.

### Error handling

If an error occurs, such as:

- A failure to allocate memory.
- A failure to create native resources.
- A failure to read data.
- The game code itself determines that a problem has occurred.

An error message will be shown before the engine immediately stops.

### Graphics

The graphics system renders flat-shaded triangulated meshes (vector graphics)
onto a 192x108 "safe area" which is scaled to fill the display and centered.
Non-16:9 aspect ratios will show any additional surfaces outside of this "safe
area", to the sides when wider, and to the top/bottom when taller.

### Audio

To be determined.

### Input

Input is fully callback-driven.  Functions are exposed by the game code, and
called when:

- A button is pressed.
- A button is released.
- A stick moves away from the center.
- A stick returns to the center.
- The mouse moves.
- A mouse click occurs.
- A touch interaction starts.
- A touch point moves.
- A touch interaction ends.

### Timing

Timing is kept simple in the platform abstraction layer; every frame, the
number of seconds since the previous frame is given to a function exposed by
the game code before rendering occurs.

### I/O

To be determined.

## Data

All data is little-endian.

### Identifiers

Almost every piece of data with a surrogate identity (content, static data,
etc.) is referred to by an identifier, which is a 32-bit unsigned integer.

#### Alphanumeric form

Identifiers can be converted from their 32-bit unsigned integer form to or from
a simplistic 6-character alphanumeric code, which allows for identifiers
provided by content creators to be kept persistent between builds, and for
debugging tools to identify content.

The alphanumeric format can be described as base-37, where the 37 characters are
`_abcdefghijklmnopqrstuvwxyz0123456789`.  When converting from alphanumeric form
into integer form, strings shorter than 6 characters are to be left-padded with
underscores.

### Logo

Each game includes a `logo.svg` file which is processed by the build pipeline
to produce icons for each platform.  This would, for instance, be used as the
Windows *.exe icon, MacOS *.app bundle icon, or Web "favicon"

### Metadata

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
</dl>

### Read-only database

A "read-only database" exists in the form of CSV files which are processed by
the build pipeline.  This is intended for your game's static data.

#### Schema

To be determined.

#### Hierarchy

To be determined.

#### Code generation

To be determined.

### Scene files

To be determined.

### Music

To be determined.

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

### Build host compatability matrix

| ↓ Platform | Can Build → | Windows | Debian | MacOS | Web |
| ---------- | ----------- | ------- | ------ | ----- | --- |
| Windows    |             | ✔       |        |       | ✔   |
| Debian     |             | ✔       | ✔      |       | ✔   |
| MacOS      |             |         |        | ✔     | ✔   |

### Dependencies

#### Windows

- MinGW-w64 (i686-w64-mingw32-gcc accessible via PATH).

#### Linux

- gcc (x86_64-linux-gnu-gcc accessible via PATH).
- libx11-dev.
- libgtk2.0-dev.
- libcanberra-gtk-module.

#### MacOS

To be determined.

#### Web

- Emscripten (emcc accessible via PATH).
