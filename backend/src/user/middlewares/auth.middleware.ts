import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { request } from "http";
import { ExpressResponseInterface } from "src/types/ExpressRequest.interface";
import { verify } from 'jsonwebtoken';
import { UserService } from "../user.service";

@Injectable()
export class AuthMeddleware implements NestMiddleware {

    constructor(private readonly userService: UserService) { }

    async use(req: ExpressResponseInterface, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null;
            next();
            return;
        }
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decode = verify(token, 'secrretkey');
            // const user = await this.userService.findByEmail(decode.email);
            const user = await this.userService.findById(decode.id);
            req.user = user;
        } catch (error) {
            req.user = null;
            next()
            return;
        }
        next();
    }
}
