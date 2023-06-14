import { fromJS } from 'immutable';
import mongoose, { ClientSession } from 'mongoose';
import { VersionedFields } from './constants';
import { SchemaVersionedDocument } from './schema-versioned-document';

export async function filterAndModifyOne(operation: string, query: mongoose.Query<any, SchemaVersionedDocument>, next: mongoose.CallbackWithoutResultAndOptionalError): Promise<void> {
    // load the base version
    const base = await queryOne(operation, query, next);
    if (base === null) next();
    else {
        // get the transaction session
        const session = query.getOptions().session;

        // store the session for the save method
        base[VersionedFields.SESSION] = session;

        const update = query.getUpdate();
        if (!update) {
            // special case for delete operations
            const deleteInfo = query.getOptions()[VersionedFields.DELETION] || {};
            deleteInfo[VersionedFields.DELETER] = deleteInfo[VersionedFields.DELETER] || VersionedFields.DEFAULT_DELETER;
            base[VersionedFields.DELETION] = deleteInfo;
        }

        await base.save({session});

        // special case for the replace document, avoid the version to get reseted to zero
        if ((update) && (!query.get('$set'))) {
            query.set(VersionedFields.VERSION, base[VersionedFields.VERSION]);
            query.set(VersionedFields.VALIDITY, base[VersionedFields.VALIDITY]);
        }
    }

    next();
}

export async function filterAndModifyMany(query: mongoose.Query<any, SchemaVersionedDocument>, next: mongoose.CallbackWithoutResultAndOptionalError) : Promise<void> {
    // get the transaction session
    const session = query.getOptions().session;

    // load the base version
    const bases = await query.model
        .find(query.getFilter(), {}, { session });


    for (const base of bases) {

        // store the session for the save method
        base[VersionedFields.SESSION] = session;

        if (!query.getUpdate()) {
            // special case for delete operations
            const deleteInfo = query.getOptions()[VersionedFields.DELETION] || {};
            deleteInfo[VersionedFields.DELETER] = deleteInfo[VersionedFields.DELETER] || VersionedFields.DEFAULT_DELETER;
            base[VersionedFields.DELETION] = deleteInfo;
        }

        await base.save({session});
    }
    next();
}

function getQueryOptions(operation: string, query: mongoose.Query<any, SchemaVersionedDocument>): { sort: any, skip: number, session?: ClientSession | null } {
    // only for findOneAndUpdate
    let sort = {};
    const skip = 0;

    if (operation.startsWith('find')) {
        sort = query.getOptions().sort || {};
    }

    // get the transaction session
    const session = query.getOptions().session;
    return { sort, skip, session };
}

async function queryOne(operation: string, query: mongoose.Query<any, SchemaVersionedDocument>, next: mongoose.CallbackWithoutResultAndOptionalError) : Promise<SchemaVersionedDocument | null> {
    // load the base version
    const base = await query.model.findOne(query.getFilter(), null, getQueryOptions(operation, query));
    return base;
}

export function getCreateVersionedDocFunction(versionedModel: mongoose.Model<SchemaVersionedDocument, {}, {}, {}, any>): (value: SchemaVersionedDocument) => SchemaVersionedDocument & { _id: { _id: mongoose.Types.ObjectId, _version: number }} {
    return (d: SchemaVersionedDocument) => {
        const clone = fromJS(d);
        const versionedDoc = new versionedModel(clone);

        // Build Vermongo historical ID
        versionedDoc[VersionedFields.ID] = { [VersionedFields.ID]: d[VersionedFields.ID], [VersionedFields.VERSION]: d[VersionedFields.VERSION] };
        versionedDoc.isNew = true;

        return versionedDoc;
    };
}
