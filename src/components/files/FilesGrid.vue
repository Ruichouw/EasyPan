<template>
  <div class="grid gap-3 px-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <article v-for="item in items" :key="item.id" class="rounded-xl border border-slate-700 bg-slate-800/30 p-3">
      <div class="h-8 w-8 rounded-md border border-slate-600 bg-slate-700/40 p-1">
        <div class="h-full w-full rounded-sm border border-slate-500"></div>
      </div>
      <h4 class="mt-2 truncate text-sm font-medium text-slate-100">{{ item.name }}</h4>
      <p class="mt-1 text-xs text-slate-400">{{ item.dirtype === 0 ? formatSize(item.size) : "文件夹" }}</p>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { FileItem } from "@/api";

defineProps<{
  items: FileItem[];
}>();

function formatSize(size: number) {
  if (!size) return "-";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
</script>
