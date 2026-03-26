import { GuestDto, guestDto } from "@/schemas/guest.schema";

import { ApiError } from "@/exceptions/ApiError";
import { guestService } from "@/services/guests.service";
import { validate } from "@/middlewares/validate";

export class GuestsController {
    static async GET() {
        const data = await guestService.getAll();
        
        return new Response(JSON.stringify(data), { status: 200 });
    }

    static async POST(req: Request) {
        const body: GuestDto = await req.json().catch(() => {
            throw ApiError.BadRequest("Request body is required");
        });
        const parsed: GuestDto = validate({ body: guestDto }, { body }).body;
        
        const data = await guestService.create(parsed);

        return new Response(JSON.stringify(data), { status: 201 });
    };
}