import { Document, Schema, model } from 'mongoose';

export interface IUserModel extends Document {
    idCard: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    city: string;
    street: string;
    role: number;
}

const UserSchema = new Schema({
    idCard: {
        type: Number,
        required: [true, "Missing ID Card"]
    },
    firstName: {
        type: String,
        required: [true, "Missing First Name"]
    },
    lastName: {
        type: String,
        required: [true, "Missing Last Name"]
    },
    username: {
        type: String,
        required: [true, "Missing Username"]
    },
    password: {
        type: String,
        required: [true, "Missing Password"]
    },
    city: {
        type: String,
        required: [true, "Missing City"]
    },
    street: {
        type: String,
        required: [true, "Missing Street"]
    },
    role: {
        type: Number,
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

export const UserModel = model<IUserModel>("UserModel", UserSchema, "Users");
