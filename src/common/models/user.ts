import { IUser } from '@interfaces/models/user.interface';
import mongoose, { Schema, Types } from 'mongoose';

const UserSchema: Schema = new Schema({
    externalId: { type: String, required: true, default: 'anonymous'},
    email: { type: String, required: true },
    username: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatarUrl: { type: String, required: false},
    bio: { type: String, required: false },
    hasNewsletterSubscription: { type: Boolean, required: true, default: false },
    createdDateTime: { type: Date, required: true, default: Date.now() },
    totalDistanceTraveledInKm: { type: Number, required: true, default: 0 },
    friends: [{ type: Types.ObjectId, ref: 'User', required: false, default: [] }],
    routes: [{ type: Types.ObjectId, ref: 'Route', required: false, default: [] }],
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);