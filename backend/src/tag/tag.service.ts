import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TagEntity } from "./tag.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
// import { UserEntity } from "src/user/user.entity";

@Injectable()
export class TagService {

    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
        // @InjectRepository(UserEntity)
        // private readonly userRepository: Repository<UserEntity>,
    ) { }

    async findAllTags(): Promise<TagEntity[]> {
        return await this.tagRepository.find();
    }

    async createTag(createTagDto, uuid): Promise<TagEntity> {
        const candidate = await this.tagRepository.findOne({ where: { name: createTagDto.name } });
        if (candidate) {
            throw new HttpException(
                'такой тег уже существует', HttpStatus.UNPROCESSABLE_ENTITY
            );
        }
        if (createTagDto.name.length > 40) {
            throw new HttpException(
                'длина тега больше 40 символов', HttpStatus.UNPROCESSABLE_ENTITY
            );
        }
        const newTag = new TagEntity();
        Object.assign(newTag, createTagDto);
        newTag.creator = uuid;
        return await this.tagRepository.save(newTag);
    }

    async findTag(id: number): Promise<TagEntity> {
        return this.tagRepository.findOne({ where: { id } });
    }


    async sortTags() {
        return
    }

    async searchTagById(id: number): Promise<TagEntity> {
        const candidate = await this.tagRepository.findOne({ where: { id } });

        if (!candidate) {
            throw new HttpException(
                'такой тег не существует', HttpStatus.UNPROCESSABLE_ENTITY
            );
        }

        return candidate;
    }

    async changeTag(candidate, createTagDto, user): Promise<TagEntity> {
        // const candidate = await this.tagRepository.findOne({ where: { id } });
        // console.log(candidate.creator === user.uuid);
        if (candidate.creator === user.uuid) {

        } else{
            throw new HttpException(
                'этот пользователь не может менять тег', HttpStatus.UNPROCESSABLE_ENTITY
            );
        }

        if (createTagDto.name.length > 40) {
            throw new HttpException(
                'длина тега больше 40 символов', HttpStatus.UNPROCESSABLE_ENTITY
            );
        }
        Object.assign(candidate, createTagDto);
        await this.tagRepository.save(candidate);
        return candidate;
    }
    // async findUser(uuid): Promise<UserEntity> {
    // return this.userRepository.findOne({ where: { uuid } });
    // }

    async deleteTag(id): Promise<any>{
        return await this.tagRepository.delete({ id: id });
    }
}
