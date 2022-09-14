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

    generateJWT(user: UserEntity): string {
        return sign({
            "email": user.email,
            "nickname": user.nickname
        }, 'secrretkey')
    }
}
