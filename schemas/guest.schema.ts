import z from "zod";

export const guestForm = z.object({
    name: z.string().trim().min(3, "Имя должно содержать минимум 3 символа").max(30, "Имя слишком длинное"),
    isCome: z.enum(['true', 'false']),
    comment: z.string().optional()
});

export const guestDto = z.object({
    name: z.string().trim().min(3, "Имя должно содержать минимум 3 символа").max(30, "Имя слишком длинное"),
    isCome: z.boolean(),
    comment: z.string().optional()
}).strict();

export const guest = guestDto.extend({
    id: z.uuid(),
    createdAt: z.string()
});

export const guestDb = z.object({
    id: z.uuid(),
    name: z.string().trim().min(3, "Имя должно содержать минимум 3 символа").max(30, "Имя слишком длинное"),
    isCome: z.boolean(),
    comment: z.string().optional(),
    created_at: z.string(),
});

export type GuestForm = z.infer<typeof guestForm>; 
export type GuestDto = z.infer<typeof guestDto>;
export type Guest = z.infer<typeof guest>;
export type GuestDb = z.infer<typeof guestDb>;