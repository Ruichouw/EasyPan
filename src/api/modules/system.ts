import { http } from "@/utils/request";

export interface HealthResult {
  status: string;
  timestamp: string;
}

interface HealthApiPayload {
  status?: unknown;
  state?: unknown;
  timestamp?: unknown;
  time?: unknown;
}

function normalizeHealthPayload(payload: HealthApiPayload): HealthResult {
  const rawStatus = payload.status ?? payload.state;
  const status = rawStatus == null ? "unknown" : String(rawStatus);
  const rawTimestamp = payload.timestamp ?? payload.time;
  const timestamp = rawTimestamp == null ? new Date().toISOString() : String(rawTimestamp);
  return { status, timestamp };
}

export async function getSystemHealth(): Promise<HealthResult> {
  const data = await http.get<HealthApiPayload>("api/system/options");
  return normalizeHealthPayload(data);
}
