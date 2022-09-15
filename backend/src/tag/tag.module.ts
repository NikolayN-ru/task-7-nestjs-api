import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { TagController } from "./tag.controller";
import { TagEntity } from "./tag.entity";
import { TagService } from "./tag.service";

@Module({
    imports: [TypeOrmModule.forFeature([TagEntity, UserEntity])
    ],
    controllers: [TagController],
    providers: [TagService, UserService],
})
export class TagModule { }
