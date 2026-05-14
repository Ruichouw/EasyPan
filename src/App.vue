<template>
  <RouterView />
  <ConfirmDialog />
  <ToastStack />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import ConfirmDialog from "@/components/feedback/ConfirmDialog.vue";
import ToastStack from "@/components/feedback/ToastStack.vue";
</script>
