import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TelegramService } from "./telegram.service";
import { TelegramController } from "./telegtam.controller";

@Module({
    // imports: [TypeOrmModule.forFeature([TelegramEntity])],
    controllers: [TelegramController],
    providers: [TelegramService],
})
export class TelegramModule { }
