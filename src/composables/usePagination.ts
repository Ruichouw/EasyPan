import { ref } from "vue";

export function usePagination(initialPage = 1, initialPageSize = 20) {
  const page = ref(initialPage);
  const pageSize = ref(initialPageSize);
  const total = ref(0);

  return {
    page,
    pageSize,
    total
  };
}