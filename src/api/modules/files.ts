import { http } from "@/utils/request";

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  dirtype: number;
  parent: string;
  updatedAt: number;
  status: string;
}

export interface FileListQuery {
  path?: string;
  status?: "active" | "trashed";
  type?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface FileListResult {
  items: FileItem[];
  total: number;
  page: number;
  pageSize: number;
}

interface FileListApiPayload {
  items?: Array<Record<string, unknown>>;
  list?: Array<Record<string, unknown>>;
  rows?: Array<Record<string, unknown>>;
  total?: number;
  page?: number;
  pageSize?: number;
}

function normalizeFileItem(raw: Record<string, unknown>): FileItem {
  return {
    id: String(raw.id ?? ""),
    name: String(raw.name ?? ""),
    type: String(raw.type ?? ""),
    size: Number(raw.size ?? 0),
    dirtype: Number(raw.dirtype ?? 1),
    parent: String(raw.parent ?? ""),
    updatedAt: Number(raw.updatedAt ?? Date.now()),
    status: String(raw.status ?? "active")
  };
}

function normalizeFileList(payload: FileListApiPayload, page: number, pageSize: number): FileListResult {
  const source = payload.items ?? payload.list ?? payload.rows ?? [];
  const items = source.map(normalizeFileItem).filter((item) => item.id && item.name);
  return {
    items,
    total: payload.total ?? items.length,
    page: payload.page ?? page,
    pageSize: payload.pageSize ?? pageSize
  };
}

export async function getFileList(query: FileListQuery = {}): Promise<FileListResult> {
  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 50;
  const path = query.path ?? "";
  const status = query.status ?? "active";
  const type = query.type?.trim();
  const search = query.search?.trim();

  const data = await http.get<FileListApiPayload>("api/objects", {
    params: {
      path,
      status,
      type,
      search,
      page,
      pageSize
    }
  });

  return normalizeFileList(data, page, pageSize);
}
