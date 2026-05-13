import { onMounted } from "vue";
import { useAppStore } from "@/stores/app";
import { useHealthQuery } from "@/composables/useHealthQuery";
import { useSessionQuery } from "@/composables/useSessionQuery";
const appStore = useAppStore();
const healthQuery = useHealthQuery();
const sessionQuery = useSessionQuery();
onMounted(() => {
    appStore.bumpVisit();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "grid gap-4 lg:grid-cols-3" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "rounded-2xl bg-white p-5 shadow-sm lg:col-span-1" },
});
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:col-span-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-xl font-semibold" },
});
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
if (__VLS_ctx.sessionQuery.isLoading.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-3 text-slate-500" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-500']} */ ;
}
else if (!__VLS_ctx.sessionQuery.data.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-3 text-amber-700" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-amber-700']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-3 space-y-1 text-slate-700" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-700']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.sessionQuery.data.value.user.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.sessionQuery.data.value.user.email);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "rounded-2xl bg-white p-5 shadow-sm lg:col-span-1" },
});
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:col-span-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-xl font-semibold" },
});
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
if (__VLS_ctx.healthQuery.isLoading.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-3 text-slate-500" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-500']} */ ;
}
else if (__VLS_ctx.healthQuery.error.value) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-3 text-red-600" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-3 text-slate-700" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-700']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.healthQuery.data.value?.status);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.healthQuery.data.value?.timestamp);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "rounded-2xl bg-white p-5 shadow-sm lg:col-span-1" },
});
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:col-span-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-xl font-semibold" },
});
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mt-3 text-slate-600" },
});
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-600']} */ ;
(__VLS_ctx.appStore.visitCount);
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.appStore.bumpVisit) },
    ...{ class: "mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-black" },
});
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-black']} */ ;
// @ts-ignore
[sessionQuery, sessionQuery, sessionQuery, sessionQuery, healthQuery, healthQuery, healthQuery, healthQuery, appStore, appStore,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
