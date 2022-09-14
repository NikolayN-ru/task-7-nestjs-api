import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { getTelegramConfig } from './telegram.config';
import { ITelegramOptions } from './telegram.interface';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {

    bot: Telegraf;
    options: ITelegramOptions;


    constructor(

        // @InjectRepository(TagEntity) 
        // private readonly tagRepository: Repository<TagEntity>
    ) {
        this.options = getTelegramConfig();
        this.bot = new Telegraf(this.options.token)
    }

    async whoami() {
        return 'message';
    }

    async sendMessage(message: string, chatId: string = this.options.chatId) {
        await this.bot.telegram.sendMessage(chatId, message)
    }

}