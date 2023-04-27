import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.model";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';

@Injectable()

export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    //* REGISTER USER
    async registerUser(username: string, email: string, password: string) {
        try {
            const usernameCheck = await this.userModel.findOne({ username });
            if (usernameCheck) return { msg: 'Username already used.', status: false };
            const emailCheck = await this.userModel.findOne({ email });
            if (emailCheck) return { msg: 'Email already used.', status: false };
            const hashedPassword = await bcrypt.hash(password, 10);
            await this.userModel.create({
                username,
                email,
                password: hashedPassword
            });
            return { status: true, user: { username, email } };
        } catch (error) {
            console.error(error);
        }
    }

    // * LOGIN USER
    async loginUser(username: string, password: string) {
        try {
            const user = await this.userModel.findOne({ username });
            if (!user) return { msg: 'Incorrect username or password', status: false };
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) return { msg: 'Incorrect username or password', status: false };
            return { status: true, user: { username, id: user.id, avatarImage: user.avatarImage, isAvatarImageSet: user.isAvatarImageSet } };
        } catch (error) {
            console.error(error);
        }
    }

    // * SET AVATAR
    async setUserAvatar(id: string, avatarImage: string) {
        try {
            const userData = await this.userModel.findByIdAndUpdate(id, {
                isAvatarImageSet: true,
                avatarImage: avatarImage
            })
            return {
                isSet: userData.isAvatarImageSet,
                image: userData.avatarImage,
            }
        } catch (error) {
            return new Error('Error updating user avatar');
        }
    }

    //* GET ALL USERS
    async getUsers(id: string) {
        try {
            const Users = this.userModel.find({ _id: { $ne: id } }).select([
                "email", "username", "avatarImage", "id"
            ]);
            return Users;
        } catch (error) {

        }
    }
}