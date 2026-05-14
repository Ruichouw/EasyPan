<template>
  <header class="border-b border-slate-800 bg-[#111827] px-4 py-3 lg:px-5">
    <div class="flex items-center gap-3">
      <button class="hidden rounded-md border border-slate-700 px-2 py-1 text-slate-300 md:inline-flex" type="button">
        <span class="text-sm">菜单</span>
      </button>
      <button
        class="flex h-10 min-w-0 max-w-[620px] flex-1 items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3 text-left text-sm text-slate-400"
        type="button"
      >
        <span class="text-base">搜索</span>
        <span class="truncate">搜索文件、分享、团队和设置...</span>
        <kbd class="ml-auto hidden rounded border border-slate-600 px-1.5 py-0.5 text-xs text-slate-500 md:inline-block">Ctrl+K</kbd>
      </button>

      <div class="ml-auto flex items-center gap-2">
        <button class="rounded-lg p-2 text-xs text-slate-300 hover:bg-slate-800" title="上传队列" type="button">队列</button>
        <button class="rounded-lg p-2 text-xs text-slate-300 hover:bg-slate-800" title="通知中心" type="button">通知</button>
        <span class="hidden text-sm text-slate-300 md:inline">{{ userStore.name || "未命名用户" }}</span>
        <button class="rounded-md border border-slate-600 px-3 py-1 text-sm text-slate-200 hover:bg-slate-800" @click="onLogout">
          退出
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { signOut } from "@/api";
import { useUserStore } from "@/store/modules/user";

const router = useRouter();
const userStore = useUserStore();

async function onLogout() {
  try {
    await signOut();
  } finally {
    userStore.logout();
    await router.replace("/login");
  }
}
</script>
