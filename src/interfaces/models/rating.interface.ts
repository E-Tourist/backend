import { Document } from 'mongoose';
import { IUser } from '@interfaces/models/user.interface';
import { IRoute } from '@interfaces/models/route.interface';

export interface IRating extends Document {
    ratingValue: number;
    user: IUser['_id'];
    route: IRoute['_id'];
    createdDateTime: Date;
}
