import { ExpressResponseInterface } from './../types/ExpressRequest.interface';
import { UserEntity } from './user.entity';
import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { Request } from 'express';
import { User } from './decorators/user.derocator';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('user')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(
        // @Req() request: ExpressResponseInterface,
        @User() user: UserEntity,
        @User('email') useremail: string,
    ): Promise<UserResponseInterface> {
        console.log('useremail', useremail);
        return this.userService.buildUserResponse(user);
    }
}
