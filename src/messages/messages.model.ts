import * as mongoose from "mongoose";

export const messagesSchema = new mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true
        }
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true
    });

export interface Messages extends mongoose.Document {
    message: {
        text: string,
    },
    users: Array<string>,
    sender: any
} 