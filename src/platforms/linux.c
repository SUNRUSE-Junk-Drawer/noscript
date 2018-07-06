#include <gtk/gtk.h>

void se_platform_critical_stop(const char *reason) {
  GtkWidget *window = gtk_message_dialog_new(
      NULL, GTK_DIALOG_MODAL | GTK_DIALOG_DESTROY_WITH_PARENT,
      GTK_MESSAGE_ERROR, GTK_BUTTONS_OK, "%s", reason);
  gtk_window_set_title(GTK_WINDOW(window), SE_GAME_TITLE);
  gtk_dialog_run(GTK_DIALOG(window));
}

int main(int argc, char *argv[]) {
  gtk_init(&argc, &argv);
  se_game_initialize();
}

// #include <stdlib.h>
// #include <X11/Xlib.h>

// void se_platform_critical_stop(const char *reason) {
//   fprintf(stderr, "%s\n", reason);
//   Display *display = XOpenDisplay(NULL);

//   if (!display) {
//     fprintf(stderr,
//             "Failed to open the X11 display to display the error
//             message.\n");
//     exit(EXIT_FAILURE);
//   }

//   int screen = DefaultScreen(display);

//   Window window = XCreateSimpleWindow(
//       display, RootWindow(display, screen), 10, 10, 100, 100, 1,
//       BlackPixel(display, screen), WhitePixel(display, screen));

//   XSelectInput(display, window, ExposureMask | KeyPressMask);
//   XMapWindow(display, window);

//   while (1) {
//     XEvent event;
//     XNextEvent(display, &event);
//     switch (event.type) {
//     case Expose:
//       break;
//     case KeyPress:
//       exit(EXIT_FAILURE);
//       break;
//     }
//   }
// }

// int main(int argc, char *argv[]) { se_game_initialize(); }
