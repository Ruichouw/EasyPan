import type { SessionData } from "@/types/auth";
import { ApiError, http } from "@/utils/request";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user?: {
    name?: string;
  };
}

export async function login(payload: LoginPayload): Promise<LoginResult> {
  return http.post<LoginResult, LoginPayload>("api/auth/login", payload);
}

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