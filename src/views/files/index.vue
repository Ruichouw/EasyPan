<template>
  <section class="space-y-3">
    <div class="rounded-2xl border border-slate-700 bg-[#1a212d]">
      <FilesHeader :title="pageTitle" />
      <FilesToolbar :total="filesQuery.data.value?.total ?? 0" :view="viewMode" :search="searchInput" @update:view="onChangeViewMode" @update:search="onSearchInput" />
      <div v-if="filesQuery.isLoading.value" class="px-4 py-6 text-slate-400">加载文件中...</div>
      <PageState
        v-else-if="filesQuery.isError.value"
        class="m-4"
        tone="error"
        message="文件列表加载失败，请稍后重试。"
        retry-text="重新加载"
        :on-retry="onRetryFiles"
      />
      <FilesEmptyState v-else-if="!(filesQuery.data.value?.items.length ?? 0)" :description="emptyDescription" :view="viewMode" />
      <FilesList v-else-if="viewMode === 'list'" :items="filesQuery.data.value?.items ?? []" />
      <FilesGrid v-else :items="filesQuery.data.value?.items ?? []" />

      <div class="flex items-center justify-between border-t border-slate-700 px-4 py-3 text-sm text-slate-400">
        <button class="rounded border border-slate-600 px-3 py-1 disabled:opacity-40" :disabled="page <= 1" @click="onPrevPage">上一页</button>
        <span>第 {{ page }} 页</span>
        <button
          class="rounded border border-slate-600 px-3 py-1 disabled:opacity-40"
          :disabled="(filesQuery.data.value?.items.length ?? 0) < pageSize"
          @click="onNextPage"
        >
          下一页
        </button>
      </div>
    </div>

    <div class="grid gap-3 lg:grid-cols-2">
      <PageState v-if="sessionQuery.isLoading.value" message="读取会话中..." />
      <PageState v-else-if="sessionQuery.isError.value" tone="error" message="会话读取失败，请刷新页面或重新登录。" />
      <PageState v-else-if="!sessionQuery.data.value" tone="warning" message="当前未登录（或接口未接通）" />
      <div v-else class="rounded-xl border border-slate-700 bg-[#1a212d] px-4 py-3 text-slate-300">
        <p>当前用户：{{ sessionQuery.data.value.user.name }}</p>
        <p>邮箱：{{ sessionQuery.data.value.user.email }}</p>
      </div>

      <PageState v-if="healthQuery.isLoading.value" message="检查服务可用性中..." />
      <PageState v-else-if="healthQuery.error.value" tone="error" message="后端接口不可达或未登录" />
      <div v-else class="rounded-xl border border-slate-700 bg-[#1a212d] px-4 py-3 text-slate-300">
        <p>状态：{{ healthQuery.data.value?.status ?? "unknown" }}</p>
        <p>时间：{{ healthQuery.data.value?.timestamp ?? "-" }}</p>
      </div>
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
import { useHealthQuery } from "@/composables/useHealthQuery";
import { useSessionQuery } from "@/composables/useSessionQuery";

const healthQuery = useHealthQuery();
const sessionQuery = useSessionQuery();
const route = useRoute();
const router = useRouter();

const activeType = computed(() => (typeof route.query.type === "string" ? route.query.type : ""));
const pageTitle = computed(() => {
  if (activeType.value === "photos") return "照片";
  if (activeType.value === "videos") return "视频";
  if (activeType.value === "music") return "音乐";
  if (activeType.value === "documents") return "文档";
  return "文件";
});
const emptyDescription = computed(() => {
  if (!activeType.value) return "拖放文件到此处或创建文件夹开始使用。";
  return `当前${pageTitle.value}分类暂无内容。`;
});

const viewMode = computed<"list" | "grid">(() => (route.query.view === "grid" ? "grid" : "list"));
const page = computed(() => {
  const raw = Number(route.query.page ?? 1);
  return Number.isFinite(raw) && raw > 0 ? raw : 1;
});
const pageSize = 20;
const searchInput = computed(() => (typeof route.query.search === "string" ? route.query.search : ""));
const filesQuery = useFilesQuery({
  path: computed(() => ""),
  status: computed(() => "active" as const),
  type: activeType,
  search: searchInput,
  page,
  pageSize: computed(() => pageSize)
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

function onPrevPage() {
  if (page.value <= 1) return;
  router.replace({
    path: route.path,
    query: {
      ...route.query,
      page: String(page.value - 1)
    }
  });
}

function onNextPage() {
  router.replace({
    path: route.path,
    query: {
      ...route.query,
      page: String(page.value + 1)
    }
  });
}

function onRetryFiles() {
  filesQuery.refetch();
}
</script>
