import { Controller, Get } from "@nestjs/common";
import { TelegramService } from "./telegram.service";
// import { TagEntity } from "./tag.entity";
// import { TagService } from "./tag.service";

@Controller('tags')
export class TelegramController {
    constructor(private readonly telegramService: TelegramService) { }

    @Get()
    whiami(){
        return 'message';
    }

    

    // async findAllTags(): Promise<{ tags: { id: number, name: string, sortOrder: number }[] }> {
    //     const tags: TagEntity[] = await this.tagService.findAllTags();
    //     return {
    //         "tags": tags.map((tag) => ({ "id": tag.id, "name": tag.name, "sortOrder": tag.sortOrder })),
    //     }
    // }
}
