import { Document } from 'mongoose';
import { IUser } from '@interfaces/models/user.interface';
import { IRate } from '@interfaces/models/rate.interface';
import { IComment } from '@interfaces/models/comment.interface';
import { IDirectionDTO } from '@interfaces/dto/map-route.interface.dto';

export interface IMapRoute extends Document {
    name: string;
    imageUrls?: Array<string>;
    distance: number;
    travelTimeInMinutes: number;
    author: IUser['_id'];
    isVerified: boolean;
    description?: string;
    direction: IDirectionDTO;
    rates?: Array<IRate['_id']>;
    comments?: Array<IComment['_id']>;
}
