import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/api/auth/register')
    async registerUser(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        return await this.userService.registerUser(username, email, password);
    }

    @Post('/api/auth/login')
    async loginUser(
        @Body('username') username: string,
        @Body('password') password: string
    ) {
        return await this.userService.loginUser(username, password);
    }

    @Post('/api/auth/setAvatar/:id')
    async setAvatar(
        @Param('id') id: string,
        @Body('image') avatarImage: string
    ) {
        return await this.userService.setUserAvatar(id, avatarImage);
    }

    @Get('/api/auth/allUsers/:id')
    async getUsers(
        @Param('id') id: string
    ) {
        return await this.userService.getUsers(id);
    }
}