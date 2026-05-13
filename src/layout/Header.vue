<template>
  <header class="border-b border-slate-200 bg-white">
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
      <h1 class="text-lg font-semibold text-slate-900">EasyPan Admin</h1>
      <RouterLink class="text-sm text-blue-600 hover:text-blue-700" to="/dashboard">Dashboard</RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>