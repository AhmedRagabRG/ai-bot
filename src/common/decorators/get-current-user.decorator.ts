import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentUser = createParamDecorator((data: string | null, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (data) return request.user[data];
    return request.user;
});