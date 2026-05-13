<template>
  <div class="mx-auto max-w-5xl p-4 md:p-8">
    <header class="mb-8 rounded-2xl bg-white/80 p-5 shadow-md backdrop-blur">
      <h1 class="text-3xl font-bold text-slate-900">{{ appStore.title }}</h1>
      <p class="mt-2 text-slate-600">Vue 3 + TypeScript + Vite 8 baseline</p>
      <div class="mt-4 flex gap-3">
        <RouterLink class="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700" to="/">首页</RouterLink>
        <RouterLink class="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-50" to="/form">表单示例</RouterLink>
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
</script>