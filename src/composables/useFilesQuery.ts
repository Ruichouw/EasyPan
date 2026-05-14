import { computed, type Ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getFileList } from "@/api";
import { queryKeys } from "@/constants";

export function useFilesQuery(params: {
  path: Ref<string>;
  status: Ref<"active" | "trashed">;
  type: Ref<string>;
  search: Ref<string>;
  page: Ref<number>;
  pageSize: Ref<number>;
}) {
  const key = computed(() =>
    queryKeys.files({
      path: params.path.value,
      status: params.status.value,
      type: params.type.value,
      search: params.search.value,
      page: params.page.value,
      pageSize: params.pageSize.value
    })
  );

  return useQuery({
    queryKey: key,
    queryFn: () =>
      getFileList({
        path: params.path.value,
        status: params.status.value,
        type: params.type.value,
        search: params.search.value,
        page: params.page.value,
        pageSize: params.pageSize.value
      }),
    staleTime: 20_000,
    gcTime: 5 * 60_000,
    retry: 1
  });
}
