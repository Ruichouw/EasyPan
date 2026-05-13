<template>
  <section class="grid gap-4 md:grid-cols-2">
    <article class="rounded-2xl bg-white p-5 shadow-sm">
      <h2 class="text-xl font-semibold">Pinia 状态</h2>
      <p class="mt-3 text-slate-600">访问次数：{{ appStore.visitCount }}</p>
      <button class="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-black" @click="appStore.bumpVisit">增加计数</button>
    </article>

    <article class="rounded-2xl bg-white p-5 shadow-sm">
      <h2 class="text-xl font-semibold">Vue Query</h2>
      <p v-if="healthQuery.isLoading.value" class="mt-3 text-slate-500">加载中...</p>
      <p v-else-if="healthQuery.error.value" class="mt-3 text-red-600">请求失败</p>
      <div v-else class="mt-3 text-slate-700">
        <p>状态：{{ healthQuery.data.value?.status }}</p>
        <p>时间：{{ healthQuery.data.value?.timestamp }}</p>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAppStore } from "@/stores/app";
import { useHealthQuery } from "@/composables/useHealthQuery";

const appStore = useAppStore();
const healthQuery = useHealthQuery();

onMounted(() => {
  appStore.bumpVisit();
});
</script>