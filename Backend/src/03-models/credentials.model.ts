import { Document, Schema, model } from 'mongoose';

export interface ICredentialsModel extends Document {
    username: string;
    password: string;
}

const CredentialsSchema = new Schema({
    username: {
        type: String,
        required: [true, "Missing Username"]
    },
    password: {
        type: String,
        required: [true, "Missing Password"]
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

export const CredentialsModel = model<ICredentialsModel>("CredentialsModel", CredentialsSchema);
