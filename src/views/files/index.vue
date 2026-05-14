<template>
  <section class="space-y-3">
    <div class="rounded-2xl border border-slate-700 bg-[#1a212d]">
      <FilesHeader :title="pageTitle" :disabled="isMutating" @create-folder="onCreateFolder" @upload="onOpenUploadDialog" />
      <FilesToolbar :total="filesQuery.data.value?.total ?? 0" :view="viewMode" :search="searchInput" @update:view="onChangeViewMode" @update:search="onSearchInput" />

      <div class="flex flex-wrap items-center gap-2 border-b border-slate-700 px-4 py-2 text-xs text-slate-300">
        <span>已选 {{ selectedIds.length }} 项</span>
        <button class="rounded border border-sky-700 px-2 py-1 text-sky-300 disabled:opacity-40" :disabled="!selectedIds.length || isMutating" @click="onBatchMove">
          批量移动
        </button>
        <button class="rounded border border-amber-700 px-2 py-1 text-amber-300 disabled:opacity-40" :disabled="!selectedIds.length || isMutating" @click="onBatchTrash">
          批量删除
        </button>
        <button class="rounded border border-slate-600 px-2 py-1 text-slate-300 disabled:opacity-40" :disabled="!selectedIds.length || isMutating" @click="selectedIds = []">
          清空选择
        </button>
      </div>

      <div v-if="filesQuery.isLoading.value" class="px-4 py-6 text-slate-400">加载文件中...</div>
      <PageState v-else-if="filesQuery.isError.value" class="m-4" tone="error" message="文件列表加载失败，请稍后重试。" retry-text="重新加载" :on-retry="onRetryFiles" />
      <FilesEmptyState v-else-if="!(filesQuery.data.value?.items.length ?? 0)" :description="emptyDescription" :view="viewMode" />
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
    <input ref="uploadInputRef" class="hidden" type="file" multiple @change="onUploadFileChange" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  cancelFileUpload,
  confirmFileUpload,
  createFolder,
  createUploadDraft,
  moveFile,
  putFileToUploadUrl,
  renameFile,
  trashFile,
  type FileItem
} from "@/api";
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

const activeType = computed(() => (typeof route.query.type === "string" ? route.query.type : ""));
const pageTitle = computed(() => {
  if (activeType.value === "photos") return "照片";
  if (activeType.value === "videos") return "视频";
  if (activeType.value === "music") return "音乐";
  if (activeType.value === "documents") return "文档";
  return "文件";
});
const emptyDescription = computed(() => (!activeType.value ? "拖放文件到此处或创建文件夹开始使用。" : `当前${pageTitle.value}分类暂无内容。`));

const viewMode = computed<"list" | "grid">(() => (route.query.view === "grid" ? "grid" : "list"));
const uploadInputRef = ref<HTMLInputElement | null>(null);
const isMutating = ref(false);
const page = computed(() => {
  const raw = Number(route.query.page ?? 1);
  return Number.isFinite(raw) && raw > 0 ? raw : 1;
});
const pageSize = 20;
const searchInput = computed(() => (typeof route.query.search === "string" ? route.query.search : ""));
const selectedIds = ref<string[]>([]);

const filesQuery = useFilesQuery({
  path: computed(() => ""),
  status: computed(() => "active" as const),
  type: activeType,
  search: searchInput,
  page,
  pageSize: computed(() => pageSize)
});

const items = computed(() => filesQuery.data.value?.items ?? []);

const itemActions = computed(() => ({
  loadingId: isMutating.value ? "loading" : null,
  onRename: (item: FileItem) => void onRenameItem(item),
  onMove: (item: FileItem) => void onMoveItem(item),
  onTrash: (item: FileItem) => void onTrashItem(item)
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

async function onCreateFolder() {
  if (isMutating.value) return;
  const name = window.prompt("请输入文件夹名称");
  if (!name?.trim()) return;
  isMutating.value = true;
  try {
    await createFolder(name.trim());
    toast.success("文件夹已创建");
    await filesQuery.refetch();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "新建文件夹失败");
  } finally {
    isMutating.value = false;
  }
}

function onOpenUploadDialog() {
  if (!isMutating.value) uploadInputRef.value?.click();
}

async function onUploadFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const fileList = Array.from(input.files ?? []);
  input.value = "";
  if (!fileList.length || isMutating.value) return;

  isMutating.value = true;
  let successCount = 0;
  try {
    for (const file of fileList) {
      let draftId = "";
      try {
        const draft = await createUploadDraft(file);
        draftId = draft.item.id;
        if (!draft.uploadUrl) throw new Error("上传地址缺失");
        await putFileToUploadUrl(draft.uploadUrl, file);
        await confirmFileUpload(draftId);
        successCount += 1;
      } catch {
        if (draftId) await cancelFileUpload(draftId).catch(() => undefined);
      }
    }
    await filesQuery.refetch();
    toast.success(`上传完成：${successCount}/${fileList.length}`);
  } finally {
    isMutating.value = false;
  }
}

async function onRenameItem(item: FileItem) {
  if (isMutating.value) return;
  const nextName = window.prompt("请输入新名称", item.name);
  if (!nextName?.trim() || nextName.trim() === item.name) return;
  isMutating.value = true;
  try {
    await renameFile(item.id, nextName.trim());
    toast.success("已重命名");
    await filesQuery.refetch();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "重命名失败");
  } finally {
    isMutating.value = false;
  }
}

async function onMoveItem(item: FileItem) {
  if (isMutating.value) return;
  const nextParent = window.prompt("请输入目标路径（根目录留空）", item.parent);
  if (nextParent === null) return;
  isMutating.value = true;
  try {
    await moveFile(item.id, nextParent.trim());
    toast.success("已移动");
    await filesQuery.refetch();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "移动失败");
  } finally {
    isMutating.value = false;
  }
}

async function onTrashItem(item: FileItem) {
  if (isMutating.value) return;
  const ok = await confirm({ title: "删除到回收站", message: `确认将「${item.name}」移入回收站吗？`, confirmText: "删除" });
  if (!ok) return;
  isMutating.value = true;
  try {
    await trashFile(item.id);
    toast.success("已移入回收站");
    await filesQuery.refetch();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "删除失败");
  } finally {
    isMutating.value = false;
  }
}

async function onBatchMove() {
  if (!selectedIds.value.length || isMutating.value) return;
  const nextParent = window.prompt("请输入目标路径（根目录留空）", "");
  if (nextParent === null) return;
  isMutating.value = true;
  try {
    await Promise.all(selectedIds.value.map((id) => moveFile(id, nextParent.trim())));
    selectedIds.value = [];
    toast.success("批量移动完成");
    await filesQuery.refetch();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "批量移动失败");
  } finally {
    isMutating.value = false;
  }
}

async function onBatchTrash() {
  if (!selectedIds.value.length || isMutating.value) return;
  const ok = await confirm({
    title: "批量删除",
    message: `确认将选中的 ${selectedIds.value.length} 个项目移入回收站吗？`,
    confirmText: "删除"
  });
  if (!ok) return;
  isMutating.value = true;
  try {
    await Promise.all(selectedIds.value.map((id) => trashFile(id)));
    selectedIds.value = [];
    toast.success("批量删除完成");
    await filesQuery.refetch();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "批量删除失败");
  } finally {
    isMutating.value = false;
  }
}

function onRetryFiles() {
  filesQuery.refetch();
}
</script>
