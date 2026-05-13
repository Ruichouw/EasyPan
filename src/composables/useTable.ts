import { ref } from "vue";

export function useTable<T>() {
  const loading = ref(false);
  const rows = ref<T[]>([]);

  return {
    loading,
    rows
  };
}