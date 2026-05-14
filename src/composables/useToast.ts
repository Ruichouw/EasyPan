import { reactive } from "vue";

type ToastTone = "success" | "error" | "info";

interface ToastItem {
  id: number;
  tone: ToastTone;
  message: string;
}

const state = reactive({
  items: [] as ToastItem[]
});

let seed = 1;

export function useToast() {
  function push(message: string, tone: ToastTone = "info") {
    const id = seed++;
    state.items.push({ id, message, tone });
    setTimeout(() => {
      const index = state.items.findIndex((item) => item.id === id);
      if (index >= 0) state.items.splice(index, 1);
    }, 2400);
  }

  function success(message: string) {
    push(message, "success");
  }

  function error(message: string) {
    push(message, "error");
  }

  return { state, push, success, error };
}
