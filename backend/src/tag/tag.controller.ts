import { Controller, Get } from "@nestjs/common";
import { TagEntity } from "./tag.entity";
import { TagService } from "./tag.service";

@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) { }

    @Get()
    async findAllTags(): Promise<{ tags: { id: number, name: string, sortOrder: number }[] }> {
        const tags: TagEntity[] = await this.tagService.findAllTags();
        return {
            "tags": tags.map((tag) => ({ "id": tag.id, "name": tag.name, "sortOrder": tag.sortOrder })),
        }
    }
}
