import { Document } from 'mongoose';
import { IUser } from './user.interface';
import { IMapRoute } from './map-route.interface';

export interface IComment extends Document {
    author: IUser['_id'];
    route: IMapRoute['_id'];
    content: string;
    createdDateTime: Date;
}