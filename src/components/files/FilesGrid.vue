<template>
  <div class="grid gap-3 px-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <article v-for="item in items" :key="item.id" class="rounded-xl border border-slate-700 bg-slate-800/30 p-3">
      <label v-if="selection" class="mb-2 flex items-center gap-2 text-xs text-slate-400">
        <input type="checkbox" :checked="selection.selectedIds.includes(item.id)" @change="selection.onToggle(item.id, ($event.target as HTMLInputElement).checked)" />
        选择
      </label>
      <div class="h-8 w-8 rounded-md border border-slate-600 bg-slate-700/40 p-1">
        <div class="h-full w-full rounded-sm border border-slate-500"></div>
      </div>
      <h4 class="mt-2 truncate text-sm font-medium text-slate-100">{{ item.name }}</h4>
      <p class="mt-1 text-xs text-slate-400">{{ item.dirtype === 0 ? formatSize(item.size) : "文件夹" }}</p>
      <div v-if="actions" class="mt-3 flex gap-2">
        <button
          v-if="actions.onRestore"
          class="rounded border border-emerald-700 px-2 py-1 text-xs text-emerald-300 disabled:opacity-40"
          :disabled="actions.loadingId === item.id"
          @click="actions.onRestore(item)"
        >
          恢复
        </button>
        <button
          v-if="actions.onDelete"
          class="rounded border border-rose-700 px-2 py-1 text-xs text-rose-300 disabled:opacity-40"
          :disabled="actions.loadingId === item.id"
          @click="actions.onDelete(item)"
        >
          彻底删除
        </button>
        <button
          v-if="actions.onRename"
          class="rounded border border-sky-700 px-2 py-1 text-xs text-sky-300 disabled:opacity-40"
          :disabled="actions.loadingId === item.id"
          @click="actions.onRename(item)"
        >
          重命名
        </button>
        <button
          v-if="actions.onMove"
          class="rounded border border-indigo-700 px-2 py-1 text-xs text-indigo-300 disabled:opacity-40"
          :disabled="actions.loadingId === item.id"
          @click="actions.onMove(item)"
        >
          移动
        </button>
        <button
          v-if="actions.onTrash"
          class="rounded border border-amber-700 px-2 py-1 text-xs text-amber-300 disabled:opacity-40"
          :disabled="actions.loadingId === item.id"
          @click="actions.onTrash(item)"
        >
          删除
        </button>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { FileItem } from "@/api";

defineProps<{
  items: FileItem[];
  actions?: {
    loadingId: string | null;
    onRestore?: (item: FileItem) => void;
    onDelete?: (item: FileItem) => void;
    onRename?: (item: FileItem) => void;
    onMove?: (item: FileItem) => void;
    onTrash?: (item: FileItem) => void;
  };
  selection?: {
    selectedIds: string[];
    onToggle: (id: string, selected: boolean) => void;
  };
}>();

function formatSize(size: number) {
  if (!size) return "-";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
</script>
