import mongoose from 'mongoose';
import { VersionedFields } from '../constants';
import { SchemaVersionedDocument } from '../schema-versioned-document';

export function getFindValidVersionFunction(versionedModel: mongoose.Model<SchemaVersionedDocument, {}, {}, {}, any>): (this: mongoose.Model<any, any, any, any, any>, ...args: Array<any>) => Promise<SchemaVersionedDocument | null> {
    return async (id: mongoose.Types.ObjectId, date: Date): Promise<SchemaVersionedDocument | null> => {
        const validityEnd = VersionedFields.VALIDITY + '.end';
        const validityStart = VersionedFields.VALIDITY + '.start';
        const versionedId = VersionedFields.ID + '.' + VersionedFields.ID;

        const query: mongoose.FilterQuery<SchemaVersionedDocument> = {};
        query[versionedId] = new mongoose.Types.ObjectId(id),
        query[validityStart] = { $lte: date };
        query[validityEnd] = { $gt: date };

        const version = await versionedModel.findOne(query);
        return version;
    };
}
