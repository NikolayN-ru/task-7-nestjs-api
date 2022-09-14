import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ExpressResponseInterface } from "src/types/ExpressRequest.interface";

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ExpressResponseInterface>();
    if (!request.user) {
        return null;
    }
    if (data) {
        return request.user[data];
    }
    return request.user;
});