import { Document } from 'mongoose';

export interface IRoute extends Document {
    distance: number;
    travelTimeInMinutes: number;
    ownerExternalId: string;
    isVerified: boolean;
    description: string;
}
