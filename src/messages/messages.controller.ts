import { Body, Controller, Post } from "@nestjs/common"
import { MessagesService } from "./messages.service";

@Controller()
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Post('api/messages/addmsg')
    async addMsg(
        @Body('from') from: string,
        @Body('to') to: string,
        @Body('message') message: string,
    ) {
        return await this.messagesService.addMessage(from, to, message);
    };

    @Post('api/messages/getmsg')
    async getMsg(
        @Body('from') from: string,
        @Body('to') to: string,
    ) {
        return await this.messagesService.getAllMessage(from, to);
    }
}