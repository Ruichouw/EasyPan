<template>
  <section class="space-y-3">
    <div class="rounded-2xl border border-slate-700 bg-[#1a212d]">
      <FilesHeader title="回收站" />
      <FilesToolbar :total="filesQuery.data.value?.total ?? 0" :view="viewMode" :search="searchInput" @update:view="onChangeViewMode" @update:search="onSearchInput" />
      <div v-if="filesQuery.isLoading.value" class="px-4 py-6 text-slate-400">加载回收站中...</div>
      <PageState
        v-else-if="filesQuery.isError.value"
        class="m-4"
        tone="error"
        message="回收站列表加载失败，请稍后重试。"
        retry-text="重新加载"
        :on-retry="onRetryFiles"
      />
      <FilesEmptyState v-else-if="!(filesQuery.data.value?.items.length ?? 0)" description="回收站中没有项目" :view="viewMode" />
      <FilesList v-else-if="viewMode === 'list'" :items="filesQuery.data.value?.items ?? []" />
      <FilesGrid v-else :items="filesQuery.data.value?.items ?? []" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import FilesEmptyState from "@/components/files/FilesEmptyState.vue";
import FilesGrid from "@/components/files/FilesGrid.vue";
import FilesHeader from "@/components/files/FilesHeader.vue";
import FilesList from "@/components/files/FilesList.vue";
import FilesToolbar from "@/components/files/FilesToolbar.vue";
import PageState from "@/components/PageState/index.vue";
import { useFilesQuery } from "@/composables/useFilesQuery";

const route = useRoute();
const router = useRouter();

const viewMode = computed<"list" | "grid">(() => (route.query.view === "grid" ? "grid" : "list"));
const page = computed(() => {
  const raw = Number(route.query.page ?? 1);
  return Number.isFinite(raw) && raw > 0 ? raw : 1;
});
const searchInput = computed(() => (typeof route.query.search === "string" ? route.query.search : ""));

const filesQuery = useFilesQuery({
  path: computed(() => ""),
  status: computed(() => "trashed" as const),
  type: computed(() => ""),
  search: searchInput,
  page,
  pageSize: computed(() => 20)
});

function onChangeViewMode(nextView: "list" | "grid") {
  router.replace({
    path: route.path,
    query: {
      ...route.query,
      view: nextView
    }
  });
}

function onSearchInput(nextSearch: string) {
  router.replace({
    path: route.path,
    query: {
      ...route.query,
      search: nextSearch || undefined,
      page: "1"
    }
  });
}

function onRetryFiles() {
  filesQuery.refetch();
}
</script>
