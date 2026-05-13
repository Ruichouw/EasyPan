<template>
  <div class="min-h-screen bg-slate-50">
    <Header />
    <div class="mx-auto flex max-w-7xl gap-4 p-4">
      <Sidebar />
      <main class="min-h-[70vh] flex-1 rounded-2xl bg-white p-4 shadow-sm">
        <Tabs />
        <div class="mt-4">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
import Tabs from "./Tabs.vue";
</script>