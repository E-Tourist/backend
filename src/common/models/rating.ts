import mongoose, { Schema } from 'mongoose';
import { IRating } from '@interfaces/models/rating.interface';

const RatingSchema: Schema = new Schema({
    value: { type: Number, required: true, min: 1, max: 5 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    route: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
    createdDateTime: { type: Date, default: Date.now },
});

export const Rating = mongoose.model<IRating>('Rating', RatingSchema);
