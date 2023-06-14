import mongoose from 'mongoose';
import { VersionedFields } from '../constants';
import { SchemaVersionedDocument } from '../schema-versioned-document';

export function getFindVersionFunction(versionedModel: mongoose.Model<SchemaVersionedDocument, {}, {}, {}, any>): (this: mongoose.Model<any, any, any, any, any>, ...args: Array<any>) => Promise<SchemaVersionedDocument | null> {
    return async (id: mongoose.Types.ObjectId, version: number) : Promise<SchemaVersionedDocument | null> => {
        // check versioned collection
        const query: mongoose.FilterQuery<SchemaVersionedDocument> = {};
        const versionedId: { [VersionedFields.ID]: mongoose.Types.ObjectId; [VersionedFields.VERSION]: number; } = {
            [VersionedFields.ID]: new mongoose.Types.ObjectId(id),
            [VersionedFields.VERSION]: version
        };
        query[VersionedFields.ID] = versionedId;

        const document = await versionedModel.findOne(query);
        return document;
    };
}
