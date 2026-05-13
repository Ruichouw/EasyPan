<template>
  <div class="rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm text-slate-600">
    当前页面标签：{{ route.name }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>