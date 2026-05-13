<template>
  <section class="rounded-2xl bg-white p-5 shadow-sm">
    <h2 class="text-xl font-semibold">zod + vee-validate 表单</h2>
    <form class="mt-4 grid gap-4" @submit="onSubmit">
      <div>
        <label class="mb-1 block text-sm text-slate-700" for="email">邮箱</label>
        <input id="email" v-model="email" class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-200 focus:ring" type="email" />
        <p class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>

      <div>
        <label class="mb-1 block text-sm text-slate-700" for="password">密码</label>
        <input id="password" v-model="password" class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-200 focus:ring" type="password" />
        <p class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
      </div>

      <button class="w-fit rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" type="submit">提交</button>
    </form>

    <p v-if="submitted" class="mt-4 rounded-lg bg-emerald-50 p-3 text-emerald-700">提交成功：{{ submitted }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const schema = toTypedSchema(
  z.object({
    email: z.string().email("请输入有效邮箱"),
    password: z.string().min(8, "密码至少 8 位")
  })
);

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema
});

const [email] = defineField("email");
const [password] = defineField("password");
const submitted = ref("");

const onSubmit = handleSubmit((values) => {
  submitted.value = JSON.stringify(values);
});

computed(() => ({ email: email.value, password: password.value }));
</script>