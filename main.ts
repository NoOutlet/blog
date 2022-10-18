import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "./plugins/fontawesome/fontawesome";
import "./styles/main.scss";

const app = createApp(App);
// Register the directive for autofocusing
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});

// Use the defined router
app.use(router);

// Register the global component for Font Awesome icons
app.component("fa", FontAwesomeIcon);

// Mount the application
app.mount("#app");
