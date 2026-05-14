# EasyPan Frontend

`EasyPan` 是 `zpan` 仓库下的 Vue3 + TS + Vite8 重构实验前端，目标是按原项目文件主页原型完成可联调版本。

## 开发启动

1. 启动后端（建议主仓库根目录）
2. 在 `EasyPan/.env` 配置：

```env
VITE_API_PROXY_TARGET=http://localhost:8222
```

3. 启动前端：

```bash
pnpm dev
```

## 第一版重构已完成能力

- 主框架原型：深色侧栏 + 顶栏搜索 + 文件主内容区
- 登录/注册 + `get-session` 会话统一落库
- 文件页 `/files`：
  - 真实接口 `/api/objects` 列表
  - 分类筛选（`type`）、搜索（`search`）、分页（`page`）
  - 视图切换（`view=list|grid`）
  - 新建文件夹（真实 `POST /api/objects`）
  - 文件上传（`POST /api/objects` draft + 直传 + `PATCH confirm`）
  - 文件重命名 / 移动 / 删除到回收站
  - 多选批量移动 / 批量删除
  - loading / error / empty 状态
- 回收站 `/trash`：
  - 真实接口 `/api/objects?status=trashed`
  - 搜索、分页与视图切换
  - 恢复与彻底删除动作
  - 多选批量恢复 / 批量彻底删除 / 清空回收站
- 统一交互反馈：
  - 全局确认弹窗（ConfirmDialog）
  - 全局消息提示（ToastStack）

## 验证命令

```bash
pnpm typecheck
pnpm test
pnpm build
```
