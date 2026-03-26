import { ApiError } from "@/exceptions/ApiError";

export function catchErrors<T extends unknown[]>(fn: (...args: T) => Promise<Response>) {
    return async (...args: T): Promise<Response> => {
        try {
            return await fn(...args);
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                return new Response(JSON.stringify({
                    message: err.message,
                    errors: err.errors.length ? err.errors : undefined
                }), { status: err.status });
            }

            console.error(err);

            return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
        }
    };
}