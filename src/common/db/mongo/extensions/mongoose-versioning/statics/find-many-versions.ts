import mongoose from 'mongoose';
import { VersionedFields } from '../constants';
import { SchemaVersionedDocument } from '../schema-versioned-document';

export function getFindManyVersionsFunction(versionedModel: mongoose.Model<SchemaVersionedDocument, {}, {}, {}, any>): (this: mongoose.Model<any, any, any, any, any>, ...args: Array<any>) => Promise<Array<SchemaVersionedDocument>> {
    return async (versions: Array<{ id: mongoose.Types.ObjectId, version: number }>): Promise<Array<SchemaVersionedDocument>> => {
        // check versioned collection
        const query: mongoose.FilterQuery<SchemaVersionedDocument> = {};
        const versionedIds: Array<{ [VersionedFields.ID]: mongoose.Types.ObjectId, [VersionedFields.VERSION]: number }> = versions.map(item => ({
            [VersionedFields.ID]: new mongoose.Types.ObjectId(item.id),
            [VersionedFields.VERSION]: item.version
        }));
        query[VersionedFields.ID] = {
            $in: versionedIds
        };

        const documents = await versionedModel.find(query);
        return documents;
    };
}
