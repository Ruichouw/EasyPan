<template>
  <div class="rounded-xl border border-slate-200 bg-white px-4 py-6 text-sm">
    <p :class="toneClass">{{ message }}</p>
    <button
      v-if="retryText && onRetry"
      class="mt-3 rounded border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
      type="button"
      @click="onRetry"
    >
      {{ retryText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    tone?: "neutral" | "error" | "warning";
    message: string;
    retryText?: string;
    onRetry?: (() => void) | undefined;
  }>(),
  {
    tone: "neutral",
    retryText: ""
  }
);

const toneClass = computed(() => {
  if (props.tone === "error") return "text-red-600";
  if (props.tone === "warning") return "text-amber-700";
  return "text-slate-600";
});
</script>
