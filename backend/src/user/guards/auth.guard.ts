import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ExpressResponseInterface } from "src/types/ExpressRequest.interface";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<ExpressResponseInterface>();
        if (request.user) {
            return true;
        }
        throw new HttpException('Not autorized', HttpStatus.UNAUTHORIZED);
    }
}