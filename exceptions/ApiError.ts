export interface IErrors {
    field: string;
    message: string;
}

export class ApiError extends Error {
    status: number;
    errors: IErrors[];

    constructor(status: number, message: string, errors: IErrors[] = []) {
        super(message);
        
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message: string, errors: IErrors[] = []) {
        return new ApiError(400, message, errors);
    } 

    static Unauthorized(message: string, errors: IErrors[] = []) {
        return new ApiError(401, message, errors);
    }

    static Forbidden(message: string, errors: IErrors[] = []) {
        return new ApiError(403, message, errors);
    }

    static NotFound(message: string, errors: IErrors[] = []) {
        return new ApiError(404, message, errors);
    }

    static ServerError(message: string, errors: IErrors[] = []) {
        return new ApiError(500, message, errors);
    }
}