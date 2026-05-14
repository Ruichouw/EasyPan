<template>
  <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 px-4 py-3 text-lg text-slate-300">
    <div class="flex items-center gap-3">
      <span>共 {{ total }} 项</span>
      <input
        :value="search"
        class="h-9 w-64 rounded-lg border border-slate-600 bg-slate-800 px-3 text-sm text-slate-100 outline-none"
        placeholder="搜索文件..."
        type="text"
        @input="onSearchInput"
      />
    </div>
    <div class="rounded-lg border border-slate-600 p-1 text-sm">
      <button class="rounded px-3 py-1" :class="view === 'list' ? 'bg-slate-700 text-slate-200' : 'text-slate-400'" type="button" @click="$emit('update:view', 'list')">
        列表
      </button>
      <button class="rounded px-3 py-1" :class="view === 'grid' ? 'bg-slate-700 text-slate-200' : 'text-slate-400'" type="button" @click="$emit('update:view', 'grid')">
        网格
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  total: number;
  view: "list" | "grid";
  search: string;
}>();

const emit = defineEmits<{
  "update:view": [value: "list" | "grid"];
  "update:search": [value: string];
}>();

function onSearchInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:search", target.value);
}
</script>
