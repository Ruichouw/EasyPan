import { createApp } from "vue";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";
import router from "./router";
import { pinia } from "./store";
import { setupDirectives } from "./directives";
import "./styles/index.scss";

const app = createApp(App);
const queryClient = new QueryClient();

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, { queryClient });
setupDirectives(app);

app.mount("#app");