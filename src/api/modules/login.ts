import type { SessionData } from "@/types/auth";
import { ApiError, http } from "@/utils/request";

export interface LoginPayload {
  identity: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginResult {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    username?: string;
  };
}

export interface RegisterResult {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    username?: string;
  };
}

function isEmail(identity: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity);
}

export async function login(payload: LoginPayload): Promise<LoginResult> {
  const identity = payload.identity.trim();
  if (isEmail(identity)) {
    return http.post<LoginResult, { email: string; password: string }>("api/auth/sign-in/email", {
      email: identity,
      password: payload.password
    });
  }

  return http.post<LoginResult, { username: string; password: string }>("api/auth/sign-in/username", {
    username: identity,
    password: payload.password
  });
}

export async function register(payload: RegisterPayload): Promise<RegisterResult> {
  const username = payload.username.trim();
  return http.post<RegisterResult, { name: string; username: string; email: string; password: string }>("api/auth/sign-up/email", {
    name: username,
    username,
    email: payload.email.trim(),
    password: payload.password
  });
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