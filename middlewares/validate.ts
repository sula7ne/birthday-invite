import { ZodError, ZodType } from "zod";

import { ApiError } from "@/exceptions/ApiError";

interface ISchema {
    body?: ZodType<any>;
    params?: ZodType<any>;
    query?: ZodType<any>;
    cookies?: ZodType<any>;
}

export function validate(schema: ISchema, data: { body?: any, params?: any, query?: any, cookies?: any }) {
    try {
        if (schema.body) data.body = schema.body.parse(data.body);
        if (schema.params) data.params = schema.params.parse(data.params);
        if (schema.query) data.query = schema.query.parse(data.query);
        if(schema.cookies) data.cookies = schema.cookies.parse(data.cookies);

        return data;
    } catch (err: any) {
        if (err instanceof ZodError) {
            const errors = err.issues.map(e => ({ field: e.path.join('.'), message: e.message }));

            throw ApiError.BadRequest("Validation failed", errors);
        }

        throw err;
    }
}