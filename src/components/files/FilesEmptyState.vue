<template>
  <div class="flex min-h-[380px] items-center justify-center px-4 py-10">
    <div class="text-center">
      <div class="mx-auto h-20 w-20 rounded-2xl border border-slate-600 bg-slate-800/40 p-4">
        <div class="h-full w-full rounded-lg border-2 border-slate-500"></div>
      </div>
      <p class="mt-4 text-xl text-slate-400">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  description: string;
  view: "list" | "grid";
}>();
</script>
