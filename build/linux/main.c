#include <gtk/gtk.h>

void se_platform_critical_stop(const char *reason) {
  GtkWidget *window = gtk_message_dialog_new(
      NULL, GTK_DIALOG_MODAL | GTK_DIALOG_DESTROY_WITH_PARENT,
      GTK_MESSAGE_ERROR, GTK_BUTTONS_OK, "%s", reason);
  gtk_window_set_title(GTK_WINDOW(window), SE_METADATA_APPLICATION_NAME);
  gtk_dialog_run(GTK_DIALOG(window));
}

int main(int argc, char *argv[]) {
  gtk_init(&argc, &argv);
  se_game_initialize();
}
