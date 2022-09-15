import { LoginUserDto } from './dto/loginUser.dto';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from './types/userResponse.interface';
import { compare } from 'bcryptjs';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:
            Repository<UserEntity>,
    ) { }

    async createUser(createUserDto): Promise<UserEntity> {
        const reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
        const myArray = reg.exec(createUserDto.password);

        if (!Array.isArray(myArray)) {
            throw new HttpException(
                'придумайте более сложный пароль', HttpStatus.UNPROCESSABLE_ENTITY
            );
        }

        if (createUserDto.password.length < 8) {
            throw new HttpException(
                'пароль слишком короткий', HttpStatus.UNPROCESSABLE_ENTITY
            );
        }
        const userByEmail = await this.userRepository.findOne({
            where: {
                email: createUserDto.email
            }
        });
        const userByUsername = await this.userRepository.findOne({
            where: {
                email: createUserDto.nickname
            }
        });

        if (userByEmail || userByUsername) {
            throw new HttpException(
                'Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY
            );
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        return await this.userRepository.save(newUser);
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email: loginUserDto.email
            },
            select: ['email', 'password', 'nickname']
        });
        if (!user) {
            throw new HttpException(
                'Email не зарегистриррован', HttpStatus.UNPROCESSABLE_ENTITY
            );
        }

        const isPasswordCorrect = await compare(loginUserDto.password, user.password);

        if (!isPasswordCorrect) {
            throw new HttpException(
                'пароль неверный', HttpStatus.UNPROCESSABLE_ENTITY
            );
        }
        return await user;
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            "token": this.generateJWT(user),
            "expire": String(1800)
        }
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: { email }
        });
    }

    async findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { id } });
    }

    async changeUser(changeUser: any, id): Promise<{ email: string, nickname: string }> {
        const userByEmail = await this.userRepository.findOne({
            where: {
                email: changeUser.email
            }
        });
        const userByUsername = await this.userRepository.findOne({
            where: {
                email: changeUser.nickname
            }
        });

        if (userByEmail || userByUsername) {
            throw new HttpException(
                'на такие данные заменить нильзя !)', HttpStatus.UNPROCESSABLE_ENTITY
            );
        }

        const user = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'uuid', 'email', 'password', 'nickname']
        });
        Object.assign(user, changeUser);
        return await this.userRepository.save(user);
    }

    async findUser(uuid): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { uuid } });
    }

    generateJWT(user: UserEntity): string {
        return sign({
            "id": user.id,
            "email": user.email,
            "nickname": user.nickname
        }, 'secrretkey')
    }
}
