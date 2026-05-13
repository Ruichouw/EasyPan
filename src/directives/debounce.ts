import type { DirectiveBinding } from "vue";

interface DebounceEl extends HTMLElement {
  __debounceHandler__?: EventListener;
}

export const vDebounce = {
  mounted(el: DebounceEl, binding: DirectiveBinding<number>) {
    const delay = binding.value ?? 300;

    let timer: ReturnType<typeof setTimeout> | null = null;
    const wrapped: EventListener = (event) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        el.dispatchEvent(new CustomEvent("debounced-click", { detail: event }));
      }, delay);
    };

    el.__debounceHandler__ = wrapped;
    el.addEventListener("click", wrapped);
  },
  beforeUnmount(el: DebounceEl) {
    if (el.__debounceHandler__) {
      el.removeEventListener("click", el.__debounceHandler__);
    }
  }
};