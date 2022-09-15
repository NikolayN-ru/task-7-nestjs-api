import { ExpressResponseInterface } from './../types/ExpressRequest.interface';
import { UserEntity } from './user.entity';
import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './decorators/user.derocator';
import { AuthGuard } from './guards/auth.guard';
import { ChangeUserDto } from './dto/changeUser.dto';

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
        @User() user: UserEntity,
        @User('email') useremail: string,
    ): Promise<any> {
        const t = [
            { 'id': 1, 'name': 'one', 'sortOrder': 0 },
            { 'id': 2, 'name': 'two', 'sortOrder': 1 },
            { 'id': 3, 'name': 'thre', 'sortOrder': 0 },
        ]
        return {
            "email": user.email,
            "nickname": user.nickname,
            "tags": [
                t.map(t => t)
            ]
        }
    }

    @Put('user')
    @UseGuards(AuthGuard)
    async changeUser(
        @Body() changeUserDto: ChangeUserDto,
        @User('id') userId: string,
    ): Promise<{ email: string, nickname: string }> {
        // console.log(userId);
        const user = await this.userService.changeUser(changeUserDto, userId);
        // return this.userService.buildUserResponse(user);
        return {
            'email': user.email,
            'nickname': user.nickname
        }
    }


}
