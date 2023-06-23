import { IRate } from '@interfaces/models/rate.interface';
import mongoose, { Schema } from 'mongoose';

const RateSchema: Schema = new Schema({
    value: { type: Number, required: true, min: 1, max: 5 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    route: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
    createdDateTime: { type: Date, default: Date.now },
});

export const RateModel = mongoose.model<IRate>('Rate', RateSchema);
