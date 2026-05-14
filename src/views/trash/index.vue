<template>
  <section class="space-y-3">
    <div class="rounded-2xl border border-slate-700 bg-[#1a212d]">
      <FilesHeader title="回收站" :disabled="isMutating" />
      <FilesToolbar :total="filesQuery.data.value?.total ?? 0" :view="viewMode" :search="searchInput" @update:view="onChangeViewMode" @update:search="onSearchInput" />

      <div class="flex flex-wrap items-center gap-2 border-b border-slate-700 px-4 py-2 text-xs text-slate-300">
        <span>已选 {{ selectedIds.length }} 项</span>
        <button class="rounded border border-emerald-700 px-2 py-1 text-emerald-300 disabled:opacity-40" :disabled="!selectedIds.length || isMutating" @click="onBatchRestore">
          批量恢复
        </button>
        <button class="rounded border border-rose-700 px-2 py-1 text-rose-300 disabled:opacity-40" :disabled="!selectedIds.length || isMutating" @click="onBatchDelete">
          批量彻底删除
        </button>
        <button class="rounded border border-rose-800 px-2 py-1 text-rose-200 disabled:opacity-40" :disabled="isMutating" @click="onEmptyTrash">
          清空回收站
        </button>
      </div>

      <div v-if="filesQuery.isLoading.value" class="px-4 py-6 text-slate-400">加载回收站中...</div>
      <PageState v-else-if="filesQuery.isError.value" class="m-4" tone="error" message="回收站列表加载失败，请稍后重试。" retry-text="重新加载" :on-retry="onRetryFiles" />
      <FilesEmptyState v-else-if="!(filesQuery.data.value?.items.length ?? 0)" description="回收站中没有项目" :view="viewMode" />
      <FilesList v-else-if="viewMode === 'list'" :items="filesQuery.data.value?.items ?? []" :actions="itemActions" :selection="selectionProps" />
      <FilesGrid v-else :items="filesQuery.data.value?.items ?? []" :actions="itemActions" :selection="selectionPropsForGrid" />

      <div class="flex items-center justify-between border-t border-slate-700 px-4 py-3 text-sm text-slate-400">
        <button class="rounded border border-slate-600 px-3 py-1 disabled:opacity-40" :disabled="page <= 1 || isMutating" @click="onPrevPage">上一页</button>
        <span>第 {{ page }} 页</span>
        <button class="rounded border border-slate-600 px-3 py-1 disabled:opacity-40" :disabled="(filesQuery.data.value?.items.length ?? 0) < pageSize || isMutating" @click="onNextPage">
          下一页
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { batchDeleteFilesPermanently, batchRestoreFiles, deleteFilePermanently, emptyTrash, restoreFile, type FileItem } from "@/api";
import FilesEmptyState from "@/components/files/FilesEmptyState.vue";
import FilesGrid from "@/components/files/FilesGrid.vue";
import FilesHeader from "@/components/files/FilesHeader.vue";
import FilesList from "@/components/files/FilesList.vue";
import FilesToolbar from "@/components/files/FilesToolbar.vue";
import PageState from "@/components/PageState/index.vue";
import { useConfirm } from "@/composables/useConfirm";
import { useFilesQuery } from "@/composables/useFilesQuery";
import { useToast } from "@/composables/useToast";

const route = useRoute();
const router = useRouter();
const { confirm } = useConfirm();
const toast = useToast();

const viewMode = computed<"list" | "grid">(() => (route.query.view === "grid" ? "grid" : "list"));
const page = computed(() => {
  const raw = Number(route.query.page ?? 1);
  return Number.isFinite(raw) && raw > 0 ? raw : 1;
});
const pageSize = 20;
const searchInput = computed(() => (typeof route.query.search === "string" ? route.query.search : ""));
const isMutating = ref(false);
const selectedIds = ref<string[]>([]);

const filesQuery = useFilesQuery({
  path: computed(() => ""),
  status: computed(() => "trashed" as const),
  type: computed(() => ""),
  search: searchInput,
  page,
  pageSize: computed(() => pageSize)
});

const items = computed(() => filesQuery.data.value?.items ?? []);
const itemActions = computed(() => ({
  loadingId: isMutating.value ? "loading" : null,
  onRestore: (item: FileItem) => void onRestoreItem(item),
  onDelete: (item: FileItem) => void onDeleteItem(item)
}));
const selectionProps = computed(() => ({
  selectedIds: selectedIds.value,
  allSelected: Boolean(items.value.length) && selectedIds.value.length === items.value.length,
  onToggle: onToggleSelection,
  onToggleAll: onToggleAllSelection
}));
const selectionPropsForGrid = computed(() => ({
  selectedIds: selectedIds.value,
  onToggle: onToggleSelection
}));

function onToggleSelection(id: string, selected: boolean) {
  if (selected && !selectedIds.value.includes(id)) selectedIds.value.push(id);
  if (!selected) selectedIds.value = selectedIds.value.filter((v) => v !== id);
}

function onToggleAllSelection(selected: boolean) {
  selectedIds.value = selected ? items.value.map((item) => item.id) : [];
}

function onChangeViewMode(nextView: "list" | "grid") {
  router.replace({ path: route.path, query: { ...route.query, view: nextView } });
}

function onSearchInput(nextSearch: string) {
  router.replace({ path: route.path, query: { ...route.query, search: nextSearch || undefined, page: "1" } });
}

function onPrevPage() {
  if (page.value <= 1 || isMutating.value) return;
  router.replace({ path: route.path, query: { ...route.query, page: String(page.value - 1) } });
}

function onNextPage() {
  if (isMutating.value) return;
  router.replace({ path: route.path, query: { ...route.query, page: String(page.value + 1) } });
}

async function onRestoreItem(item: FileItem) {
  if (isMutating.value) return;
  isMutating.value = true;
  try {
    await restoreFile(item.id);
    toast.success("已恢复");
    await filesQuery.refetch();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "恢复失败");
  } finally {
    isMutating.value = false;
  }
}

async function onDeleteItem(item: FileItem) {
  if (isMutating.value) return;
  const ok = await confirm({ title: "彻底删除", message: `确认彻底删除「${item.name}」吗？该操作不可恢复。`, confirmText: "彻底删除" });
  if (!ok) return;
  isMutating.value = true;
  try {
    await deleteFilePermanently(item.id);
    toast.success("已彻底删除");
    await filesQuery.refetch();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "删除失败");
  } finally {
    isMutating.value = false;
  }
}

async function onBatchRestore() {
  if (!selectedIds.value.length || isMutating.value) return;
  isMutating.value = true;
  try {
    await batchRestoreFiles(selectedIds.value);
    selectedIds.value = [];
    toast.success("批量恢复完成");
    await filesQuery.refetch();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "批量恢复失败");
  } finally {
    isMutating.value = false;
  }
}

async function onBatchDelete() {
  if (!selectedIds.value.length || isMutating.value) return;
  const ok = await confirm({ title: "批量彻底删除", message: `确认彻底删除选中的 ${selectedIds.value.length} 项吗？`, confirmText: "彻底删除" });
  if (!ok) return;
  isMutating.value = true;
  try {
    await batchDeleteFilesPermanently(selectedIds.value);
    selectedIds.value = [];
    toast.success("批量彻底删除完成");
    await filesQuery.refetch();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "批量删除失败");
  } finally {
    isMutating.value = false;
  }
}

async function onEmptyTrash() {
  if (isMutating.value) return;
  const ok = await confirm({ title: "清空回收站", message: "确认清空回收站吗？该操作不可恢复。", confirmText: "清空" });
  if (!ok) return;
  isMutating.value = true;
  try {
    await emptyTrash();
    selectedIds.value = [];
    toast.success("回收站已清空");
    await filesQuery.refetch();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "清空失败");
  } finally {
    isMutating.value = false;
  }
}

function onRetryFiles() {
  filesQuery.refetch();
}
</script>
