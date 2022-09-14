import { AuthGuard } from './guards/auth.guard';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from './user.controller';
import { UserService } from './user.service';
import ormconfig from "src/ormconfig";
import { UserEntity } from "./user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [UserController],
    providers: [UserService, AuthGuard],
    exports: [UserService],
})
export class UserModule { }