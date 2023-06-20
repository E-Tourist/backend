import mongoose, { Schema } from 'mongoose';
import { IRoute } from '@interfaces/models/route.interface';

const RouteSchema: Schema = new Schema({
    distance: { type: Number, required: true },
    travelTimeInMinutes: { type: Number, required: true },
    ownerExternalId: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    description: { type: String, default: false }
});

export const Route = mongoose.model<IRoute>('Route', RouteSchema);