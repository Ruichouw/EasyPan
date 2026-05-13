import type { App } from "vue";
import { vPermission } from "./permission";
import { vDebounce } from "./debounce";

export function setupDirectives(app: App) {
  app.directive("permission", vPermission);
  app.directive("debounce", vDebounce);
}