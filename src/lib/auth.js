import { unwrapJson } from "@/lib/http";
export async function getSession() {
    const res = await fetch("/api/auth/get-session", { credentials: "include" });
    if (!res.ok) {
        return null;
    }
    return unwrapJson(Promise.resolve(res));
}
export async function signOut() {
    const res = await fetch("/api/auth/sign-out", {
        method: "POST",
        credentials: "include"
    });
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "退出登录失败");
    }
}
