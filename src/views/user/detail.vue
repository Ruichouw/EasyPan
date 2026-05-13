<template>
  <section>
    <h2 class="text-xl font-semibold">用户详情</h2>
    <p class="mt-2 text-slate-600">用户 ID：{{ route.params.id }}</p>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>