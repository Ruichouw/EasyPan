<template>
  <header class="border-b border-slate-200 bg-white">
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
      <h1 class="text-lg font-semibold text-slate-900">EasyPan Admin</h1>
      <div class="flex items-center gap-3 text-sm">
        <span class="text-slate-600">{{ userStore.name || "未命名用户" }}</span>
        <button class="rounded-md border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-50" @click="onLogout">
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