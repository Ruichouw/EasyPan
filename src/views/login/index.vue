<template>
  <div class="flex min-h-[70vh] items-center justify-center">
    <section class="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm">
      <h2 class="text-2xl font-semibold text-slate-900">登录 EasyPan</h2>
      <p class="mt-2 text-sm text-slate-600">请输入账号密码进入控制台。</p>

      <form class="mt-6 space-y-4" @submit="onSubmit">
        <div>
          <label class="mb-1 block text-sm text-slate-700" for="username">用户名</label>
          <input id="username" v-model="username" class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-200 focus:ring" type="text" autocomplete="username" />
          <p class="mt-1 text-sm text-red-600">{{ errors.username }}</p>
        </div>

        <div>
          <label class="mb-1 block text-sm text-slate-700" for="password">密码</label>
          <input id="password" v-model="password" class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-200 focus:ring" type="password" autocomplete="current-password" />
          <p class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
        </div>

        <p v-if="errorMessage" class="rounded-lg bg-red-50 p-2 text-sm text-red-700">{{ errorMessage }}</p>

        <button :disabled="isSubmitting" class="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60" type="submit">
          {{ isSubmitting ? "登录中..." : "登录" }}
        </button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { login } from "@/api";
import { useUserStore } from "@/store/modules/user";
import { ApiError } from "@/utils/request";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const errorMessage = ref("");

const schema = toTypedSchema(
  z.object({
    username: z.string().min(1, "请输入用户名"),
    password: z.string().min(6, "密码至少 6 位")
  })
);

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
});

const [username] = defineField("username");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = "";
  try {
    const result = await login(values);
    userStore.login(result.token, result.user?.name ?? values.username);
    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/dashboard";
    await router.replace(redirect);
  } catch (error) {
    errorMessage.value = error instanceof ApiError ? error.message : "登录失败，请稍后重试";
  }
});
</script>