import { Document } from 'mongoose';
import { IUser } from '@interfaces/models/user.interface';
import { IMapRoute } from '@interfaces/models/map-route.interface';

export interface IRate extends Document {
    value: number;
    user: IUser['_id'];
    route: IMapRoute['_id'];
    createdDateTime: Date;
}
