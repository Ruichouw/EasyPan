<template>
  <section class="grid gap-4 lg:grid-cols-3">
    <article class="rounded-2xl bg-white p-5 shadow-sm lg:col-span-1">
      <h2 class="text-xl font-semibold">会话状态</h2>
      <p v-if="sessionQuery.isLoading.value" class="mt-3 text-slate-500">读取会话中...</p>
      <p v-else-if="!sessionQuery.data.value" class="mt-3 text-amber-700">当前未登录（或接口未接通）</p>
      <div v-else class="mt-3 space-y-1 text-slate-700">
        <p>用户：{{ sessionQuery.data.value.user.name }}</p>
        <p>邮箱：{{ sessionQuery.data.value.user.email }}</p>
      </div>
    </article>

    <article class="rounded-2xl bg-white p-5 shadow-sm lg:col-span-1">
      <h2 class="text-xl font-semibold">服务可用性</h2>
      <p v-if="healthQuery.isLoading.value" class="mt-3 text-slate-500">检查中...</p>
      <p v-else-if="healthQuery.error.value" class="mt-3 text-red-600">后端接口不可达或未登录</p>
      <div v-else class="mt-3 text-slate-700">
        <p>状态：{{ healthQuery.data.value?.status }}</p>
        <p>时间：{{ healthQuery.data.value?.timestamp }}</p>
      </div>
    </article>

    <article class="rounded-2xl bg-white p-5 shadow-sm lg:col-span-1">
      <h2 class="text-xl font-semibold">本地应用状态</h2>
      <p class="mt-3 text-slate-600">访问次数：{{ appStore.visitCount }}</p>
      <button class="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-black" @click="appStore.bumpVisit">增加计数</button>
    </article>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAppStore } from "@/stores/app";
import { useHealthQuery } from "@/composables/useHealthQuery";
import { useSessionQuery } from "@/composables/useSessionQuery";

const appStore = useAppStore();
const healthQuery = useHealthQuery();
const sessionQuery = useSessionQuery();

onMounted(() => {
  appStore.bumpVisit();
});
</script>