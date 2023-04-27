import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Messages } from "./messages.model";

@Injectable()
export class MessagesService {
    constructor(@InjectModel('Messages') private readonly messageModel: Model<Messages>) { }

    //* ADD MSG TO DATABSE
    async addMessage(from: string, to: string, message: string) {
        try {
            const data = await this.messageModel.create({
                message: { text: message },
                users: [from, to],
                sender: from,
            });
            if (data) return { msg: "Message added successfully," }
            return { msg: "Failed to add message to the databse." }
        } catch (error) {
            console.log(error);
        }
    }

    //* GET ALL MSG FROM DATABASE
    async getAllMessage(from: string, to: string) {
        try {
            const messages = await this.messageModel.find({
                users: {
                    $all: [from, to],
                },
            })
                .sort({ updatedAt: 1 });
            const projectMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                }
            })
            return { projectMessages }
        } catch (error) {
            console.log(error)
        }
    }
}