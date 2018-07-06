#include "platforms/platforms.h"
#include "game/game.h"

#include "game/game.c"

#ifdef _WIN32
#include "platforms/win32.c"
#else
#error "Unknown platform."
#endif
