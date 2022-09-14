import { UserEntity } from "src/user/user.entity";
import {Request} from 'express';

export interface ExpressResponseInterface extends Request {
    user?: UserEntity;
} 