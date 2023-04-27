import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { MongooseModule } from "@nestjs/mongoose";
import { messagesSchema } from "./messages.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Messages', schema: messagesSchema }])],
    controllers: [MessagesController],
    providers: [MessagesService]
})
export class MessagesModule { }