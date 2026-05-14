import { http } from "@/utils/request";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  status: "active" | "disabled";
  createdAt: string;
}

export interface UserListQuery {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export interface UserListResult {
  items: UserListItem[];
  total: number;
  page: number;
  pageSize: number;
}

interface UserListApiPayload {
  items?: Array<Record<string, unknown>>;
  list?: Array<Record<string, unknown>>;
  rows?: Array<Record<string, unknown>>;
  total?: number;
  page?: number;
  pageSize?: number;
}

function toUserStatus(value: unknown): UserListItem["status"] {
  if (value === "active" || value === 1 || value === "1" || value === true) {
    return "active";
  }
  return "disabled";
}

function normalizeUserItem(raw: Record<string, unknown>): UserListItem {
  return {
    id: String(raw.id ?? raw.userId ?? raw.uid ?? ""),
    name: String(raw.name ?? raw.username ?? raw.nickname ?? ""),
    email: String(raw.email ?? ""),
    status: toUserStatus(raw.status),
    createdAt: String(raw.createdAt ?? raw.createTime ?? raw.created_at ?? "")
  };
}

function normalizeUserListPayload(payload: UserListApiPayload, fallbackPage: number, fallbackPageSize: number): UserListResult {
  const sourceList = payload.items ?? payload.list ?? payload.rows ?? [];
  const items = sourceList.map(normalizeUserItem).filter((item) => item.id && item.name);
  return {
    items,
    total: payload.total ?? items.length,
    page: payload.page ?? fallbackPage,
    pageSize: payload.pageSize ?? fallbackPageSize
  };
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  try {
    return await http.get<UserProfile>("api/me");
  } catch {
    return null;
  }
}

export async function getUserList(query: UserListQuery = {}): Promise<UserListResult> {
  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 10;
  const keyword = query.keyword?.trim();

  const data = await http.get<UserListApiPayload>("api/admin/users", {
    params: {
      page,
      pageSize,
      keyword
    }
  });
  return normalizeUserListPayload(data, page, pageSize);
}
