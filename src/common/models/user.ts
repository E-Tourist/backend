import { IUser } from '@interfaces/models/user.interface';
import mongoose, { Schema, Types } from 'mongoose';

const UserSchema: Schema = new Schema({
    externalId: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: { type: String, required: false },
    hasNewsletterSubscription: { type: Boolean, required: true },
    createdDateTime: { type: Date, required: true },
    totalDistanceTraveled: { type: Number, required: true },
    friends: [{ type: Types.ObjectId, ref: 'User', required: false }]
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);