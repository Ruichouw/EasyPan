<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-700 text-sm">
      <thead class="bg-slate-800/40 text-left text-slate-300">
        <tr>
          <th v-if="selection" class="px-4 py-3 font-medium">
            <input type="checkbox" :checked="selection.allSelected" @change="selection.onToggleAll(($event.target as HTMLInputElement).checked)" />
          </th>
          <th class="px-4 py-3 font-medium">名称</th>
          <th class="px-4 py-3 font-medium">类型</th>
          <th class="px-4 py-3 font-medium">大小</th>
          <th class="px-4 py-3 font-medium">状态</th>
          <th v-if="actions" class="px-4 py-3 font-medium">操作</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-800 text-slate-200">
        <tr v-for="item in items" :key="item.id" class="hover:bg-slate-800/30">
          <td v-if="selection" class="px-4 py-3">
            <input type="checkbox" :checked="selection.selectedIds.includes(item.id)" @change="selection.onToggle(item.id, ($event.target as HTMLInputElement).checked)" />
          </td>
          <td class="px-4 py-3">{{ item.name }}</td>
          <td class="px-4 py-3">{{ item.dirtype === 0 ? "文件" : "文件夹" }}</td>
          <td class="px-4 py-3">{{ formatSize(item.size) }}</td>
          <td class="px-4 py-3">{{ item.status }}</td>
          <td v-if="actions" class="px-4 py-3">
            <div class="flex gap-2">
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
          </td>
        </tr>
      </tbody>
    </table>
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
    allSelected: boolean;
    onToggle: (id: string, selected: boolean) => void;
    onToggleAll: (selected: boolean) => void;
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
