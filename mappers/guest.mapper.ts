import { GuestDb, GuestDto } from "@/schemas/guest.schema";

export function toDb(guest: GuestDto) {
    return {
        name: guest.name,
        is_come: guest.isCome,
        comment: guest.comment,
    };
}

export function toClient(guest: GuestDb) {
    return {
        id: guest.id,
        name: guest.name,
        isCome: guest.is_come,
        comment: guest.comment,
        createdAt: guest.created_at
    };
}