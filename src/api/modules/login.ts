import { ApiError, http } from "@/utils/request";
import type { SessionData } from "@/types/auth";

export async function getSession(): Promise<SessionData | null> {
  try {
    return await http.get<SessionData>("api/auth/get-session");
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    return null;
  }
}

export async function signOut(): Promise<void> {
  await http.post<void>("api/auth/sign-out");
}