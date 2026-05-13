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

function buildMockUsers(page: number, pageSize: number, keyword?: string): UserListResult {
  const all = Array.from({ length: 57 }).map((_, idx) => {
    const id = String(idx + 1);
    return {
      id,
      name: `user_${id}`,
      email: `user_${id}@easypan.dev`,
      status: idx % 5 === 0 ? "disabled" : "active",
      createdAt: new Date(Date.now() - idx * 86400000).toISOString()
    } as UserListItem;
  });

  const filtered = keyword
    ? all.filter((u) => u.name.includes(keyword) || u.email.includes(keyword))
    : all;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    items: filtered.slice(start, end),
    total: filtered.length,
    page,
    pageSize
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

  try {
    return await http.get<UserListResult>("api/admin/users", {
      params: {
        page,
        pageSize,
        keyword
      }
    });
  } catch {
    return buildMockUsers(page, pageSize, keyword);
  }
}