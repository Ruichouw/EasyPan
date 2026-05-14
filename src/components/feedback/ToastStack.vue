<template>
  <div class="pointer-events-none fixed right-4 top-4 z-50 flex w-[320px] flex-col gap-2">
    <div
      v-for="item in state.items"
      :key="item.id"
      class="rounded-lg border px-3 py-2 text-sm shadow-lg"
      :class="
        item.tone === 'success'
          ? 'border-emerald-700 bg-emerald-950/80 text-emerald-200'
          : item.tone === 'error'
            ? 'border-rose-700 bg-rose-950/80 text-rose-200'
            : 'border-slate-700 bg-slate-900/90 text-slate-200'
      "
    >
      {{ item.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { state } = useToast();
</script>
