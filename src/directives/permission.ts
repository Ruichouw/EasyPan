import type { Directive } from "vue";

export const vPermission: Directive<HTMLElement, boolean> = {
  mounted(el, binding) {
    if (!binding.value) {
      el.style.display = "none";
    }
  }
};