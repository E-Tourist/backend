import mongoose from 'mongoose';
import { VersionedFields } from '../constants';
import { SchemaVersionedDocument } from '../schema-versioned-document';

export function getUpdatePrevDocFunction(versionedModel: mongoose.Model<SchemaVersionedDocument, {}, {}, {}, any>, versionedId: string): mongoose.PreSaveMiddlewareFunction<SchemaVersionedDocument> {
    return async function (this: SchemaVersionedDocument, next): Promise<void> {
        const base = this;

        // get the transaction session
        const session = { session: this[VersionedFields.SESSION] };
        delete this[VersionedFields.SESSION];

        // // Special case for the findAndDelete to include deletion information
        // if (this[VersionedFields.DELETION]) {
        //     let deleteInfo = this[VersionedFields.DELETION];
        //     delete this[VersionedFields.DELETION];
        //     if (deleteInfo) {
        //         clone[VersionedFields.DELETER] = deleteInfo[VersionedFields.DELETER];
        //     }
        // }
        // // Save versioned document
        // const versionedDoc = new versionedModel(clone);
        let prevVersionedDoc: SchemaVersionedDocument | null = null;


        if (!this.isNew) {
            prevVersionedDoc = await versionedModel.findOne({ [versionedId]: this[VersionedFields.ID], [VersionedFields.VERSION]: this[VersionedFields.VERSION] - 1 });
            if (prevVersionedDoc) {
                // Set validity to start of current in end for versioned
                const start = base[VersionedFields.VALIDITY].start;

                prevVersionedDoc[VersionedFields.VALIDITY].end = start;

                const saveOptions: mongoose.SaveOptions = {};
                if (!!session && !!session.session) {
                    saveOptions.session = session.session;
                }

                await prevVersionedDoc.save(saveOptions);
            }
        }

        next();
    };
}
