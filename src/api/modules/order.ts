import { http } from "@/utils/request";

export interface HealthResult {
  status: string;
  timestamp: string;
}

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

export async function getSystemHealth(): Promise<HealthResult> {
  await http.get("api/system/options");
  return {
    status: "ok",
    timestamp: new Date().toISOString()
  };
}

export async function getOrderList(): Promise<OrderListResult> {
  try {
    return await http.get<OrderListResult>("api/store/orders");
  } catch {
    return {
      items: [
        {
          id: "demo_order_1",
          amount: 99,
          currency: "CNY",
          status: "paid",
          createdAt: new Date().toISOString()
        }
      ],
      total: 1
    };
  }
}