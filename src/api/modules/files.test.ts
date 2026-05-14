import { beforeEach, describe, expect, it, vi } from "vitest";
import { getFileList, renameFile, trashFile } from "./files";

const getMock = vi.fn();
const patchMock = vi.fn();

vi.mock("@/utils/request", () => ({
  http: {
    get: (...args: unknown[]) => getMock(...args),
    patch: (...args: unknown[]) => patchMock(...args)
  }
}));

describe("files api mapping", () => {
  beforeEach(() => {
    getMock.mockReset();
    patchMock.mockReset();
  });

  it("maps list payload and keeps query params", async () => {
    getMock.mockResolvedValue({
      list: [
        {
          id: "f-1",
          name: "demo.txt",
          type: "text/plain",
          size: 256,
          dirtype: 0,
          parent: "",
          updatedAt: 1711111111111,
          status: "active"
        }
      ],
      total: 9,
      page: 2,
      pageSize: 20
    });

    const result = await getFileList({
      path: "/",
      status: "active",
      type: "documents",
      search: "demo",
      page: 2,
      pageSize: 20
    });

    expect(getMock).toHaveBeenCalledWith("api/objects", {
      params: {
        path: "/",
        status: "active",
        type: "documents",
        search: "demo",
        page: 2,
        pageSize: 20
      }
    });
    expect(result).toEqual({
      items: [
        {
          id: "f-1",
          name: "demo.txt",
          type: "text/plain",
          size: 256,
          dirtype: 0,
          parent: "",
          updatedAt: 1711111111111,
          status: "active"
        }
      ],
      total: 9,
      page: 2,
      pageSize: 20
    });
  });

  it("falls back to default pagination and filters invalid items", async () => {
    getMock.mockResolvedValue({
      rows: [{ id: "", name: "" }, { id: "v-1", name: "photo.png", dirtype: 0 }]
    });

    const result = await getFileList();

    expect(getMock).toHaveBeenCalledWith("api/objects", {
      params: {
        path: "",
        status: "active",
        type: undefined,
        search: undefined,
        page: 1,
        pageSize: 50
      }
    });
    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(50);
  });

  it("maps rename and trash patch actions", async () => {
    patchMock.mockResolvedValue({
      id: "m1",
      name: "renamed.txt",
      dirtype: 0,
      parent: "",
      size: 1,
      type: "text/plain",
      status: "active",
      updatedAt: 1
    });
    await renameFile("m1", "renamed.txt");
    expect(patchMock).toHaveBeenCalledWith("api/objects/m1", {
      action: "update",
      name: "renamed.txt"
    });

    patchMock.mockResolvedValue({
      id: "m1",
      name: "renamed.txt",
      dirtype: 0,
      parent: "",
      size: 1,
      type: "text/plain",
      status: "trashed",
      updatedAt: 2
    });
    await trashFile("m1");
    expect(patchMock).toHaveBeenCalledWith("api/objects/m1", {
      action: "trash"
    });
  });
});
