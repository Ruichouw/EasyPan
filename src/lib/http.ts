export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `HTTP ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function unwrapJson<T>(promise: Promise<Response>): Promise<T> {
  const response = await promise;
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(response.status, body, (body as { error?: string }).error ?? response.statusText);
  }
  return response.json() as Promise<T>;
}