<template>
  <aside class="w-56 rounded-2xl bg-white p-3 shadow-sm">
    <nav class="space-y-2">
      <RouterLink class="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100" to="/dashboard">概览</RouterLink>
      <RouterLink class="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100" to="/user/list">用户</RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>