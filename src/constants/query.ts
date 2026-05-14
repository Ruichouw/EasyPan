export const queryKeys = {
  session: ["session"] as const,
  health: ["health"] as const,
  files: (params: { path: string; status: "active" | "trashed"; type: string; search: string; page: number; pageSize: number }) =>
    ["files", params.path, params.status, params.type, params.search, params.page, params.pageSize] as const,
  users: (params: { page: number; pageSize: number; keyword: string }) =>
    ["users", params.page, params.pageSize, params.keyword] as const
};
