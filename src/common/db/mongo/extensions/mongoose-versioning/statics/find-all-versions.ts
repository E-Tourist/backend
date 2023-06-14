import mongoose from 'mongoose';
import { VersionedFields } from '../constants';
import { SchemaVersionedDocument } from '../schema-versioned-document';


export type FindAllVersionFunction = <T extends mongoose.Document>(id:  mongoose.Types.ObjectId, model: typeof mongoose.Model) => Promise<Array<T>>;

export function getFindAllVersionsFunction(versionedModel: mongoose.Model<SchemaVersionedDocument, {}, {}, {}, any>) : FindAllVersionFunction{
    return async <T extends mongoose.Document>(id: mongoose.Types.ObjectId) : Promise<Array<T>> => {

        const versionedId = `${VersionedFields.ID}.${VersionedFields.ID}`;
        const query: mongoose.FilterQuery<SchemaVersionedDocument>  = {
            [versionedId]: new mongoose.Types.ObjectId(id)
        };

        return versionedModel.find<T>(query);
    };
}