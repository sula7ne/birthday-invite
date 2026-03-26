import { ApiError } from "@/exceptions/ApiError";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),

    NEXT_PUBLIC_SUPABASE_URL: z.url(),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error(parsed.error.message);
    
    throw ApiError.ServerError("Invalid environment variables");
}

export const env = parsed.data; 