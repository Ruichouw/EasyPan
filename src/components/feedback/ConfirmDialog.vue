<template>
  <div v-if="state.open" class="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
    <div class="w-full max-w-md rounded-xl border border-slate-700 bg-[#121826] p-5 text-slate-100 shadow-xl">
      <h3 class="text-lg font-semibold">{{ state.title }}</h3>
      <p class="mt-2 text-sm text-slate-300">{{ state.message }}</p>
      <div class="mt-5 flex justify-end gap-2">
        <button class="rounded border border-slate-600 px-3 py-1.5 text-sm text-slate-200" type="button" @click="close(false)">
          {{ state.cancelText }}
        </button>
        <button class="rounded bg-rose-600 px-3 py-1.5 text-sm text-white" type="button" @click="close(true)">
          {{ state.confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfirm } from "@/composables/useConfirm";

const { state, close } = useConfirm();
</script>
