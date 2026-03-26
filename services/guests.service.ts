import { toClient, toDb } from "@/mappers/guest.mapper";

import { ApiError } from "@/exceptions/ApiError";
import { GuestDto } from "@/schemas/guest.schema";
import { supabase } from "@/db/supabase";

class GuestsService {
    async getAll() {
        const { data, error } = await supabase.from("guests").select("*");
        if (error) throw ApiError.ServerError(error.message);
        
        return data.map(toClient);
    }

    async create(guest: GuestDto) {
        const insertData = toDb(guest);

        const { data, error } = await supabase.from("guests").insert([insertData]).select();
        if (error) throw ApiError.ServerError(error.message);
        
        return data;
    }
};

export const guestService = new GuestsService();