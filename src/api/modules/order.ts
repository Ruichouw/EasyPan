import { http } from "@/utils/request";

export interface OrderListItem {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "canceled";
  createdAt: string;
}

export interface OrderListResult {
  items: OrderListItem[];
  total: number;
}

interface OrderListApiPayload {
  items?: Array<Record<string, unknown>>;
  list?: Array<Record<string, unknown>>;
  rows?: Array<Record<string, unknown>>;
  total?: number;
}

function toOrderStatus(value: unknown): OrderListItem["status"] {
  if (value === "paid" || value === 1 || value === "1") return "paid";
  if (value === "pending" || value === 0 || value === "0") return "pending";
  return "canceled";
}

function normalizeOrderItem(raw: Record<string, unknown>): OrderListItem {
  return {
    id: String(raw.id ?? raw.orderId ?? raw.no ?? ""),
    amount: Number(raw.amount ?? raw.totalAmount ?? raw.total ?? 0),
    currency: String(raw.currency ?? "CNY"),
    status: toOrderStatus(raw.status),
    createdAt: String(raw.createdAt ?? raw.createTime ?? raw.created_at ?? "")
  };
}

function normalizeOrderListPayload(payload: OrderListApiPayload): OrderListResult {
  const sourceList = payload.items ?? payload.list ?? payload.rows ?? [];
  const items = sourceList.map(normalizeOrderItem).filter((item) => item.id);
  return {
    items,
    total: payload.total ?? items.length
  };
}

export async function getOrderList(): Promise<OrderListResult> {
  const data = await http.get<OrderListApiPayload>("api/store/orders");
  return normalizeOrderListPayload(data);
}
