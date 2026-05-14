<template>
  <aside class="flex w-[290px] flex-col border-r border-slate-800 bg-[#171a21]">
    <div class="border-b border-slate-800 px-4 py-4">
      <div class="flex items-center gap-2">
        <div class="h-5 w-8 rounded bg-gradient-to-r from-blue-500 via-green-400 to-amber-300"></div>
        <h1 class="text-3xl font-semibold tracking-tight text-slate-200">ZPan</h1>
      </div>
    </div>

    <div class="px-4 py-3">
      <div class="flex items-center justify-between rounded-xl border border-slate-700 bg-[#141922] px-3 py-2 text-slate-200">
        <div class="flex items-center gap-2">
          <div class="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold">R</div>
          <span>{{ userStore.name || "ruichouw" }}</span>
        </div>
        <span class="text-slate-500">⌄</span>
      </div>
    </div>

    <nav class="flex-1 space-y-1 px-4">
      <RouterLink class="nav-item" :class="{ 'nav-item-active': isFilesRoot }" :to="{ path: '/files', query: baseFilesQuery }">我的文件</RouterLink>
      <RouterLink class="nav-item" :class="{ 'nav-item-active': activeType === 'photos' }" :to="{ path: '/files', query: typeQuery('photos') }">照片</RouterLink>
      <RouterLink class="nav-item" :class="{ 'nav-item-active': activeType === 'videos' }" :to="{ path: '/files', query: typeQuery('videos') }">视频</RouterLink>
      <RouterLink class="nav-item" :class="{ 'nav-item-active': activeType === 'music' }" :to="{ path: '/files', query: typeQuery('music') }">音乐</RouterLink>
      <RouterLink class="nav-item" :class="{ 'nav-item-active': activeType === 'documents' }" :to="{ path: '/files', query: typeQuery('documents') }">文档</RouterLink>
      <a class="nav-item" href="javascript:void(0)">我的分享</a>
      <a class="nav-item" href="javascript:void(0)">任务</a>
      <RouterLink class="nav-item" :class="{ 'nav-item-active': isTrash }" to="/trash">回收站</RouterLink>
    </nav>

    <div class="px-4 py-2 text-center text-xs text-slate-500">Powered by ZPan</div>

    <div class="border-y border-slate-800 px-4 py-3">
      <div class="mb-2 flex items-center justify-between text-sm text-slate-300">
        <span>存储空间</span>
        <span>0%</span>
      </div>
      <div class="h-2 rounded bg-slate-700">
        <div class="h-2 w-0 rounded bg-blue-500"></div>
      </div>
      <p class="mt-2 text-sm text-slate-400">0 B / 10.0 MB 已使用</p>
    </div>

    <div class="px-4 py-3">
      <div class="flex items-center justify-between rounded-xl border border-slate-700 bg-[#141922] px-3 py-2 text-slate-200">
        <div class="flex items-center gap-2">
          <div class="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold">R</div>
          <span>{{ userStore.name || "ruichouw" }}</span>
        </div>
        <span class="text-slate-500">⌃</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();
const route = useRoute();
const activeType = computed(() => (typeof route.query.type === "string" ? route.query.type : ""));
const view = computed(() => (typeof route.query.view === "string" ? route.query.view : ""));
const isFilesRoot = computed(() => route.path === "/files" && !activeType.value);
const isTrash = computed(() => route.path === "/trash");
const baseFilesQuery = computed(() => (view.value ? { view: view.value } : {}));

function typeQuery(type: string) {
  return view.value ? { type, view: view.value } : { type };
}
</script>

<style scoped>
.nav-item {
  display: block;
  border-radius: 10px;
  padding: 9px 12px;
  color: #d1d5db;
  text-decoration: none;
}

.nav-item:hover {
  background: #1f2937;
}

.nav-item-active {
  background: #16366c;
  color: #eff6ff;
}
</style>
