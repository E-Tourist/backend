import { Document } from 'mongoose';
import { IMapRoute } from '@interfaces/models/map-route.interface';

export interface IUser extends Document {
    externalId: string;
    email: string;
    username?: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    bio?: string;
    hasNewsletterSubscription: boolean;
    createdDateTime: Date;
    totalDistanceTraveledInKm: number;
    friends: Array<IUser['_id']>;
    routes: Array<IMapRoute['_id']>;
}