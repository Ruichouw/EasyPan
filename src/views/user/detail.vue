<template>
  <section>
    <h2 class="text-xl font-semibold">用户详情</h2>
    <p class="mt-2 text-slate-600">用户 ID：{{ route.params.id }}</p>
    <RouterLink class="mt-4 inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50" to="/user/list">
      返回列表
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
</script>