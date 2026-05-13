import { http } from "@/utils/request";

export interface HealthResult {
  status: string;
  timestamp: string;
}

export async function getSystemHealth(): Promise<HealthResult> {
  await http.get("api/system/options");
  return {
    status: "ok",
    timestamp: new Date().toISOString()
  };
}