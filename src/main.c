#include "platforms/platforms.h"
#include "game/game.h"

#include "game/game.c"

#ifdef _WIN32
#include "platforms/win32.c"
#elif __linux__
#include "platforms/linux.c"
#else
#error "Unknown platform."
#endif
