import { GuestsController } from "@/controllers/guests.controller";
import { catchErrors } from "@/middlewares/catchErrors";

export const GET = catchErrors(GuestsController.GET);
export const POST = catchErrors((req: Request) => GuestsController.POST(req));