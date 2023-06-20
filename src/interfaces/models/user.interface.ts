import { Document } from 'mongoose';

export interface IUser extends Document {
    externalId: string;
    email: string;
    username?: string;
    firstName: string;
    lastName: string;
    bio?: string;
    hasNewsletterSubscription: boolean;
    createdDateTime: Date;
    totalDistanceTraveled: number;
    friends: Array<string>;
}