import { IMapRoute } from '@interfaces/models/map-route.interface';
import mongoose, { Schema, Types } from 'mongoose';

const MapRouteSchema: Schema = new Schema({
    name: { type: String, required: true },
    imageUrls: [{ type: String, required: false }],
    distance: { type: Number, required: true },
    travelTimeInMinutes: { type: Number, required: true },
    author: { type: Types.ObjectId, ref: 'User', required: true },
    isVerified: { type: Boolean, required: true, default: false },
    description: { type: String, default: false },
    direction: { type: Object, required: true },
    rates: [{ type: Types.ObjectId, ref: 'Rate', required: false }],
    comments: [{ type: Types.ObjectId, ref: 'Comment', required: false }]
});

export const MapRouteModel = mongoose.model<IMapRoute>('MapRoute', MapRouteSchema);