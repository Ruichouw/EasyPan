import { reactive } from "vue";

interface ConfirmState {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  resolve?: (value: boolean) => void;
}

const state = reactive<ConfirmState>({
  open: false,
  title: "",
  message: "",
  confirmText: "确认",
  cancelText: "取消"
});

export function useConfirm() {
  function confirm(options: { title: string; message: string; confirmText?: string; cancelText?: string }) {
    state.open = true;
    state.title = options.title;
    state.message = options.message;
    state.confirmText = options.confirmText ?? "确认";
    state.cancelText = options.cancelText ?? "取消";
    return new Promise<boolean>((resolve) => {
      state.resolve = resolve;
    });
  }

  function close(result: boolean) {
    state.open = false;
    state.resolve?.(result);
    state.resolve = undefined;
  }

  return { state, confirm, close };
}
