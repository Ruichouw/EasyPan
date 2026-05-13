export class ApiError extends Error {
    status;
    body;
    constructor(status, body, message) {
        super(message ?? `HTTP ${status}`);
        this.name = "ApiError";
        this.status = status;
        this.body = body;
    }
}
export async function unwrapJson(promise) {
    const response = await promise;
    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new ApiError(response.status, body, body.error ?? response.statusText);
    }
    return response.json();
}
