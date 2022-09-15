import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { User } from "src/user/decorators/user.derocator";
import { AuthGuard } from "src/user/guards/auth.guard";
import { UserEntity } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { CreateTagDto } from "./dto/tag.dto";
import { TagEntity } from "./tag.entity";
import { TagService } from "./tag.service";
import { TagResponseInterface } from "./types/tagResponse.interface";

@Controller()
export class TagController {
    constructor(
        private readonly tagService: TagService,
        private readonly userService: UserService,
    ) { }

    @Get('tags')
    async findAllTags(): Promise<{ tags: { id: number, name: string, sortOrder: string }[] }> {
        const tags: TagEntity[] = await this.tagService.findAllTags();
        return {
            "tags": tags.map((tag) => ({ "id": tag.id, "name": tag.name, "sortOrder": tag.sortOrder })),
        }
    }

    @Post('tags')
    @UseGuards(AuthGuard)
    async createTag(
        @User() user: UserEntity,
        @Body() createTagDto: CreateTagDto
    ): Promise<TagResponseInterface> {
        const tag = await this.tagService.createTag(createTagDto, user.uuid);
        return {
            "id": tag.id,
            "name": tag.name,
            "sortOrder": tag.sortOrder
        }
    }

    @Get('tags/:id')
    @UseGuards(AuthGuard)
    async getTagId(
        @Param('id') id: number
    ): Promise<any> {
        const tag = await this.tagService.findTag(id);
        const user = await this.userService.findUser(tag.creator);
        return {
            "creator": {
                "nickname": user.nickname,
                "uid": user.uuid,
            },
            "name": tag.name,
            "sortOrder": tag.sortOrder
        }
    }

    @Get('tag')
    // @UseGuards(AuthGuard)
    async getSortTags(
        @Query() params: any,
    ): Promise<any> {
        console.log('params', params);
        const sortTags = await this.tagService.sortTags();
        return {
            data: [
                // todo доделать !!
            ],
            "meta": {
                "offset": Number(params.offset),
                "length": Number(params.length),
                "quantity": 100
            }
        }
    }

    @Put('tag/:id')
    @UseGuards(AuthGuard)
    async changeTag(
        @Param('id') id: number,
        @Body() createTagDto: CreateTagDto,
        @User() user: UserEntity,
    ): Promise<any> {
        const candidate = await this.tagService.searchTagById(id);
        // const user = await this.userService.findUser(candidate.creator);

        const tag = await this.tagService.changeTag(candidate, createTagDto, user);
        return {
            "creator": {
                "nickname": user.nickname,
                "uid": user.uuid,
            },
            "name": tag.name,
            "sortOrder": tag.sortOrder
        }
    }

    @Delete('tag/:id')
    @UseGuards(AuthGuard)
    async deleteTag(
        @Param('id') id: number,
        @User() user: UserEntity,
    ): Promise<any> {
        await this.tagService.deleteTag(id);
        return `тег ${id} удален`
    }
}
