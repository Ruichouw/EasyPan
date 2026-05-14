<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold">用户列表</h2>
        <p class="text-sm text-slate-600">展示用户查询、分页与状态渲染</p>
      </div>

      <form class="flex items-center gap-2" @submit.prevent="onSearch">
        <input
          v-model.trim="keywordInput"
          class="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-200 focus:ring"
          placeholder="搜索用户名/邮箱"
          type="text"
        />
        <button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" type="submit">
          搜索
        </button>
      </form>
    </div>

    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <PageState v-if="query.isError.value" class="m-4" tone="error" message="数据加载失败，请稍后重试。" retry-text="重新加载" :on-retry="onRetry" />
      <table class="min-w-full divide-y divide-slate-200 text-sm">
        <thead class="bg-slate-50 text-left text-slate-600">
          <tr>
            <th class="px-4 py-3 font-medium">ID</th>
            <th class="px-4 py-3 font-medium">用户名</th>
            <th class="px-4 py-3 font-medium">邮箱</th>
            <th class="px-4 py-3 font-medium">状态</th>
            <th class="px-4 py-3 font-medium">创建时间</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="query.isLoading.value">
            <td class="px-4 py-6 text-slate-500" colspan="5">加载中...</td>
          </tr>
          <tr v-else-if="query.isError.value">
            <td class="px-4 py-6 text-slate-400" colspan="5">-</td>
          </tr>
          <tr v-else-if="!query.data.value?.items.length">
            <td class="px-4 py-6 text-slate-500" colspan="5">暂无数据</td>
          </tr>
          <tr v-for="item in query.data.value?.items ?? []" :key="item.id" class="hover:bg-slate-50">
            <td class="px-4 py-3">{{ item.id }}</td>
            <td class="px-4 py-3">{{ item.name }}</td>
            <td class="px-4 py-3">{{ item.email }}</td>
            <td class="px-4 py-3">
              <span
                class="rounded-full px-2 py-1 text-xs"
                :class="item.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'"
              >
                {{ item.status }}
              </span>
            </td>
            <td class="px-4 py-3">{{ formatDate(item.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between text-sm text-slate-600">
      <p>共 {{ query.data.value?.total ?? 0 }} 条</p>
      <div class="flex items-center gap-2">
        <button
          class="rounded border border-slate-300 px-3 py-1 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="page <= 1"
          @click="prevPage"
        >
          上一页
        </button>
        <span>第 {{ page }} 页</span>
        <button
          class="rounded border border-slate-300 px-3 py-1 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="(query.data.value?.items.length ?? 0) < pageSize"
          @click="nextPage"
        >
          下一页
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import PageState from "@/components/PageState/index.vue";
import { getUserList } from "@/api";
import { queryKeys } from "@/constants";
import { formatDate } from "@/utils/format";

const page = ref(1);
const pageSize = 10;
const keyword = ref("");
const keywordInput = ref("");

const queryKey = computed(() =>
  queryKeys.users({
    page: page.value,
    pageSize,
    keyword: keyword.value
  })
);

const query = useQuery({
  queryKey,
  queryFn: () =>
    getUserList({
      page: page.value,
      pageSize,
      keyword: keyword.value
    }),
  staleTime: 30_000,
  gcTime: 5 * 60_000,
  retry: 1
});

function onSearch() {
  page.value = 1;
  keyword.value = keywordInput.value;
}

function prevPage() {
  if (page.value > 1) page.value -= 1;
}

function nextPage() {
  page.value += 1;
}

function onRetry() {
  query.refetch();
}
</script>
