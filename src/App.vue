<template>
  <div class="mx-auto max-w-6xl p-4 md:p-8">
    <header class="mb-8 rounded-2xl bg-white/90 p-5 shadow-md backdrop-blur">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="text-3xl font-bold text-slate-900">{{ appStore.title }}</h1>
          <p class="mt-1 text-slate-600">迁移工作区（Vue 3 + TS）</p>
        </div>
        <button class="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50" @click="appStore.toggleSidebar">
          切换侧栏：{{ appStore.sidebarOpen ? "开" : "关" }}
        </button>
      </div>

      <nav class="mt-4 flex gap-3">
        <RouterLink class="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700" to="/">首页</RouterLink>
        <RouterLink class="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-50" to="/form">表单示例</RouterLink>
      </nav>
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