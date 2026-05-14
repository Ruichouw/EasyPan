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

interface CreateFilePayload {
  name: string;
  type: string;
  size?: number;
  parent: string;
  dirtype: number;
}

interface CreateFileApiResult extends Record<string, unknown> {
  uploadUrl?: string;
}

export interface CreateFileResult {
  item: FileItem;
  uploadUrl?: string;
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

export async function createFolder(name: string, parent = ""): Promise<FileItem> {
  const data = await http.post<Record<string, unknown>, CreateFilePayload>("api/objects", {
    name,
    type: "folder",
    parent,
    dirtype: 1
  });
  return normalizeFileItem(data);
}

export async function createUploadDraft(file: File, parent = ""): Promise<CreateFileResult> {
  const data = await http.post<CreateFileApiResult, CreateFilePayload>("api/objects", {
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size,
    parent,
    dirtype: 0
  });
  return {
    item: normalizeFileItem(data),
    uploadUrl: data.uploadUrl
  };
}

export async function putFileToUploadUrl(uploadUrl: string, file: File): Promise<void> {
  await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type || "application/octet-stream"
    }
  });
}

export async function confirmFileUpload(id: string): Promise<FileItem> {
  const data = await http.patch<Record<string, unknown>, { action: "confirm" }>(`api/objects/${id}`, {
    action: "confirm"
  });
  return normalizeFileItem(data);
}

export async function cancelFileUpload(id: string): Promise<void> {
  await http.patch<{ id: string; cancelled: boolean }, { action: "cancel" }>(`api/objects/${id}`, {
    action: "cancel"
  });
}

export async function restoreFile(id: string): Promise<FileItem> {
  const data = await http.patch<Record<string, unknown>, { action: "restore" }>(`api/objects/${id}`, {
    action: "restore"
  });
  return normalizeFileItem(data);
}

export async function deleteFilePermanently(id: string): Promise<{ id: string; deleted: boolean; purged?: number }> {
  return http.delete<{ id: string; deleted: boolean; purged?: number }>(`api/objects/${id}`);
}

export async function renameFile(id: string, name: string): Promise<FileItem> {
  const data = await http.patch<Record<string, unknown>, { action: "update"; name: string }>(`api/objects/${id}`, {
    action: "update",
    name
  });
  return normalizeFileItem(data);
}

export async function moveFile(id: string, parent: string): Promise<FileItem> {
  const data = await http.patch<Record<string, unknown>, { action: "update"; parent: string }>(`api/objects/${id}`, {
    action: "update",
    parent
  });
  return normalizeFileItem(data);
}

export async function trashFile(id: string): Promise<FileItem> {
  const data = await http.patch<Record<string, unknown>, { action: "trash" }>(`api/objects/${id}`, {
    action: "trash"
  });
  return normalizeFileItem(data);
}

export async function batchRestoreFiles(ids: string[]): Promise<void> {
  await Promise.all(ids.map((id) => restoreFile(id)));
}

export async function batchDeleteFilesPermanently(ids: string[]): Promise<void> {
  await http.delete<{ deleted: number }>("api/objects/batch", {
    data: { ids }
  });
}

export async function emptyTrash(): Promise<void> {
  const trashed = await getFileList({ status: "trashed", page: 1, pageSize: 500 });
  const ids = trashed.items.map((item) => item.id);
  if (!ids.length) return;
  await batchDeleteFilesPermanently(ids);
}
