import { IComment } from '@interfaces/models/comment.interface';
import mongoose, { Schema, Types } from 'mongoose';

const CommentSchema: Schema = new Schema({
    author: { type: Types.ObjectId, ref: 'User', required: true },
    route: { type: Types.ObjectId, ref: 'Route', required: true },
    content: { type: String, required: true },
    createdDateTime: { type: Date, default: Date.now }
});

export const CommentModel = mongoose.model<IComment>('Comment', CommentSchema);
