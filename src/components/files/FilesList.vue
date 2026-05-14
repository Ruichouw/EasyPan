<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-700 text-sm">
      <thead class="bg-slate-800/40 text-left text-slate-300">
        <tr>
          <th class="px-4 py-3 font-medium">名称</th>
          <th class="px-4 py-3 font-medium">类型</th>
          <th class="px-4 py-3 font-medium">大小</th>
          <th class="px-4 py-3 font-medium">状态</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-800 text-slate-200">
        <tr v-for="item in items" :key="item.id" class="hover:bg-slate-800/30">
          <td class="px-4 py-3">{{ item.name }}</td>
          <td class="px-4 py-3">{{ item.dirtype === 0 ? "文件" : "文件夹" }}</td>
          <td class="px-4 py-3">{{ formatSize(item.size) }}</td>
          <td class="px-4 py-3">{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
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
