import { unwrapJson } from "@/lib/http";
import type { SessionData } from "@/types/auth";

export async function getSession(): Promise<SessionData | null> {
  const res = await fetch("/api/auth/get-session", { credentials: "include" });
  if (!res.ok) {
    return null;
  }
  return unwrapJson<SessionData>(Promise.resolve(res));
}

export async function signOut(): Promise<void> {
  const res = await fetch("/api/auth/sign-out", {
    method: "POST",
    credentials: "include"
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? "退出登录失败");
  }
}