<template>
  <div class="flex min-h-[70vh] items-center justify-center">
    <section class="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm">
      <h2 class="text-2xl font-semibold text-slate-900">注册 EasyPan</h2>
      <p class="mt-2 text-sm text-slate-600">创建新账号后自动进入控制台。</p>

      <form class="mt-6 space-y-4" @submit="onSubmit">
        <div>
          <label class="mb-1 block text-sm text-slate-700" for="username">用户名（用于登录）</label>
          <input
            id="username"
            v-model="username"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-200 focus:ring"
            type="text"
            autocomplete="username"
            placeholder="3-30 位，字母数字下划线"
          />
          <p class="mt-1 text-sm text-red-600">{{ errors.username }}</p>
        </div>

        <div>
          <label class="mb-1 block text-sm text-slate-700" for="email">邮箱</label>
          <input id="email" v-model="email" class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-200 focus:ring" type="email" autocomplete="email" />
          <p class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>

        <div>
          <label class="mb-1 block text-sm text-slate-700" for="password">密码</label>
          <input id="password" v-model="password" class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-200 focus:ring" type="password" autocomplete="new-password" />
          <p class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
        </div>

        <div>
          <label class="mb-1 block text-sm text-slate-700" for="confirmPassword">确认密码</label>
          <input id="confirmPassword" v-model="confirmPassword" class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-200 focus:ring" type="password" autocomplete="new-password" />
          <p class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
        </div>

        <p v-if="errorMessage" class="rounded-lg bg-red-50 p-2 text-sm text-red-700">{{ errorMessage }}</p>

        <button :disabled="isSubmitting" class="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60" type="submit">
          {{ isSubmitting ? "注册中..." : "注册" }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-slate-600">
        已有账号？
        <RouterLink class="text-blue-600 hover:text-blue-700" to="/login">去登录</RouterLink>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { register } from "@/api";
import { useAuthSessionSync } from "@/composables/useAuthSessionSync";
import { ApiError } from "@/utils/request";

const router = useRouter();
const route = useRoute();
const { syncSession } = useAuthSessionSync();
const errorMessage = ref("");

const schema = toTypedSchema(
  z
    .object({
      username: z
        .string()
        .min(3, "用户名至少 3 位")
        .max(30, "用户名最多 30 位")
        .regex(/^[a-zA-Z0-9_]+$/, "用户名仅支持字母、数字、下划线"),
      email: z.string().email("请输入有效邮箱"),
      password: z.string().min(6, "密码至少 6 位"),
      confirmPassword: z.string().min(6, "确认密码至少 6 位")
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "两次输入的密码不一致",
      path: ["confirmPassword"]
    })
);

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
});

const [username] = defineField("username");
const [email] = defineField("email");
const [password] = defineField("password");
const [confirmPassword] = defineField("confirmPassword");

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = "";
  try {
    await register({
      username: values.username,
      email: values.email,
      password: values.password
    });
    await syncSession();
    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/files";
    await router.replace(redirect);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      errorMessage.value = "注册接口未命中（404）。请检查 VITE_API_PROXY_TARGET 是否指向后端服务。";
      return;
    }
    errorMessage.value = error instanceof ApiError ? error.message : "注册失败，请稍后重试";
  }
});
</script>
