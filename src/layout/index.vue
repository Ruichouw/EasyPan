<template>
  <div class="min-h-screen bg-[#0b111b] text-slate-100">
    <div class="flex min-h-screen">
      <Sidebar />
      <div class="flex min-h-screen flex-1 flex-col">
        <Header />
        <main class="flex-1 p-4 lg:p-5">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
</script>
