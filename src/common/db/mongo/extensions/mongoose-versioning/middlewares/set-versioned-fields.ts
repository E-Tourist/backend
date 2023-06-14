import mongoose from 'mongoose';
import { VersionedFields } from '../constants';
import { SchemaVersionedDocument } from '../schema-versioned-document';

export function getSetVersionedFieldsFunction(): mongoose.PreSaveMiddlewareFunction<SchemaVersionedDocument> {
    return async function (this: SchemaVersionedDocument, next): Promise<void> {
        if (this.isNew) {
            this[VersionedFields.VERSION] = 1;
        } else {
            // Increment version number
            this[VersionedFields.VERSION] = this[VersionedFields.VERSION] + 1;
        }

        const now = new Date();
        this[VersionedFields.VALIDITY] = { start: now };
    };
}
