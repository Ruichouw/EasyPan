<template>
  <div class="flex items-center justify-between border-b border-slate-700 px-4 py-4">
    <h2 class="text-4xl font-semibold text-slate-100">{{ title }}</h2>
    <div class="flex items-center gap-2">
      <button class="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-slate-200 hover:bg-slate-700" type="button">
        新建文件夹
      </button>
      <button class="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-400" type="button">
        上传
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
