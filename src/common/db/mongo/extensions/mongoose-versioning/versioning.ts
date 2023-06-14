
import mongoose from 'mongoose';
import { RESERVED_FIELDS, VersionedFields } from './constants';
import { VersionedPluginOptions } from './plugin-options';
import { getFindAllVersionsFunction } from './statics/find-all-versions';
import { cloneSchema } from './utils';
import { getFindVersionFunction } from './statics/find-version';
import { getFindValidVersionFunction } from './statics/find-valid-version';
import { getSetVersionedFieldsFunction } from './middlewares/set-versioned-fields';
import { getUpdatePrevDocFunction } from './middlewares/update-prev-doc';
import { SchemaVersionedDocument } from './schema-versioned-document';
import { filterAndModifyMany, filterAndModifyOne, getCreateVersionedDocFunction } from './helpers';
import { getFindManyVersionsFunction } from './statics/find-many-versions';


export const versioning = (schema: mongoose.Schema, baseOptions?: VersionedPluginOptions): void => {
    // Handling of the options (inherited from vermongo)
    if (typeof (baseOptions) === 'string') {
        baseOptions = {
            collection: baseOptions
        };
    }

    const options = baseOptions || {};
    options.collection = baseOptions?.collection || 'versions';
    options.logError = baseOptions?.logError || false;
    // options.ensureIndex = baseOptions?.ensureIndex ?? true;
    options.mongoose = baseOptions?.mongoose || mongoose;

    const mongooseModule = options.mongoose;
    const connection = baseOptions?.connection || mongooseModule;


    // Make sure there's no reserved paths
    RESERVED_FIELDS.map(
        key =>  { if (schema.path(key)) throw Error(`Schema can't have a path called "${key}"`); }
    );

    // create the versioned schema
    const versionedSchema = cloneSchema(schema, mongooseModule);

    // Copy schema options in the versioned schema
    versionedSchema.set('collection', options.collection);

    // Define Custom fields
    const validityField: mongoose.SchemaDefinition = {
        [VersionedFields.VALIDITY]: {
            start: { type: Date, required: true, default: Date.now },
            end: { type: Date, required: false }
        }
    };

    const versionedValidityField: mongoose.SchemaDefinition = {
        [VersionedFields.VALIDITY]: {
            start: { type: Date, required: true },
            end: { type: Date, required: false }
        }
    };

    const versionField: mongoose.SchemaDefinition = {
        [VersionedFields.VERSION]: {
            type: Number,
            required: true,
            default: 0,
            select: true
        }
    };

    const versionedIdField: mongoose.SchemaDefinition = {
        [VersionedFields.ID]: {
            [VersionedFields.ID]: mongoose.Schema.Types.Mixed,
            [VersionedFields.VERSION]: versionField[VersionedFields.VERSION]
        }
    };

    const editorField: mongoose.SchemaDefinition = {
        [VersionedFields.EDITOR]: {
            type: String,
            required: true,
            default: VersionedFields.DEFAULT_EDITOR
        }
    };

    const deleterField: mongoose.SchemaDefinition = {
        [VersionedFields.DELETER]: {
            type: String,
            required: false
        }
    };

    // Add Custom fields
    schema.add(validityField);
    schema.add(versionField);
    schema.add(editorField);
    schema.add(deleterField);

    versionedSchema.remove(VersionedFields.ID);
    versionedSchema.add(versionField);
    versionedSchema.add(versionedIdField);
    versionedSchema.add(versionedValidityField);
    versionedSchema.add(editorField);
    versionedSchema.add(deleterField);

    // add index to versioning (id, validity),
    const validityEnd = VersionedFields.VALIDITY + '.end';
    const validityStart = VersionedFields.VALIDITY + '.start';

    const versionedId = `${VersionedFields.ID}.${VersionedFields.ID}`;
    const versionedVersion = `${VersionedFields.ID}.${VersionedFields.VERSION}`;

    const versionedValidityIndex: mongoose.IndexDefinition = {
        [versionedId]: 1,
        [validityStart]: 1,
        [validityEnd]: 1,
    };
    const indexValidityName = { name: '_id_validity_start_validity_end'};
    versionedSchema.index(versionedValidityIndex, indexValidityName);

    const versionedVersionIndex: mongoose.IndexDefinition = {
        [versionedId]: 1,
        [versionedVersion]: 1,
    };

    const indexVersionName = { name: '_id_version'};
    versionedSchema.index(versionedVersionIndex, indexVersionName);

    const versionedIdIndex: mongoose.IndexDefinition = {
        [versionedId]: 1,
    };

    const indexIdName = { name: '_id'};
    versionedSchema.index(versionedIdIndex, indexIdName);


    // Turn off internal versioning, we don't need this since we version on everything
    schema.set('versionKey', false);
    versionedSchema.set('versionKey', false);

    const versionedModel = mongoose.model<SchemaVersionedDocument>(options.collection ?? '', versionedSchema);

    // Add special find by id and validity date that includes versioning.
    schema.statics.findValidVersion = getFindValidVersionFunction(versionedModel);

    // Add special find by id and version number that includes versioning
    schema.statics.findVersion = getFindVersionFunction(versionedModel);

    schema.statics.findManyVersions = getFindManyVersionsFunction(versionedModel);

    schema.statics.findAllVersions = getFindAllVersionsFunction(versionedModel);

    // Set current doc fields
    schema.pre('save', getSetVersionedFieldsFunction());

    // Update validity of previous version document
    schema.pre('save', getUpdatePrevDocFunction(versionedModel, versionedId));

    // Save current version document to history
    schema.post('save', async function (this: SchemaVersionedDocument, res: any, next) : Promise<void> {
        const versionedDoc = await versionedModel.findOne({ [versionedId]: this[VersionedFields.ID], [VersionedFields.VERSION]: this[VersionedFields.VERSION]});
        if (!versionedDoc) {
            const newVersionedDoc = getCreateVersionedDocFunction(versionedModel)(this);
            newVersionedDoc.save({
                session: this.$session()
            });
        }
        next();
    });

    // model level middleware
    schema.pre('insertMany', async (next: mongoose.CallbackWithoutResultAndOptionalError, docs: Array<SchemaVersionedDocument>) : Promise<void> => {
        docs.forEach(d => { d[VersionedFields.VERSION] = 1; });
        next();
    });

    // model level middleware
    schema.post('insertMany', async (docs: Array<SchemaVersionedDocument>, next: mongoose.CallbackWithoutResultAndOptionalError) : Promise<void> => {
        const versionedDocs = docs.map(getCreateVersionedDocFunction(versionedModel));
        await versionedModel.insertMany(versionedDocs);
        next();
    });

    // updateOne (includes document and model/query level)
    schema.post('updateOne', async function (res: any, next) : Promise<void> {
        if (this instanceof mongoose.Query) {
            await filterAndModifyOne('updateOne', this, next);
        }
    });

    // updateMany (query level)
    schema.post('updateMany', async function (res: any, next): Promise<void> {
        if (this instanceof mongoose.Query) {
            await filterAndModifyMany(this, next);
        }
    });

    // findOneAndUpdate (query level)
    schema.post('findOneAndUpdate', async function (res: any, next) : Promise<void> {
        if (this instanceof mongoose.Query) {
            await filterAndModifyOne('findOneAndUpdate', this, next);
        }
    });

    // findOneAndReplace (query level)
    schema.post('findOneAndReplace', async function (res: any, next) : Promise<void> {
        if (this instanceof mongoose.Query) {
            await filterAndModifyOne('findOneAndReplace', this, next);
        }
    });

    // findOneAndReplace (query level)
    schema.post('replaceOne', async function (res: any, next) : Promise<void> {
        if (this instanceof mongoose.Query) {
            await filterAndModifyOne('replaceOne', this, next);
        }
    });

    // deleteOne (includes document and model/query level)
    schema.post('deleteOne', async function (res: any, next) : Promise<void> {
        if (this instanceof mongoose.Query) {
            await filterAndModifyOne('deleteOne', this, next);
        }
    });

    // findOneAndRemove (query level)
    schema.post('findOneAndRemove', async function (res: any, next) : Promise<void> {
        if (this instanceof mongoose.Query) {
            await filterAndModifyOne('findOneAndRemove', this, next);
        }
    });

    // findOneAndRemove (query level)
    schema.post('findOneAndDelete', async function (res: any, next) : Promise<void> {
        if (this instanceof mongoose.Query) {
            await filterAndModifyOne('findOneAndDelete', this, next);
        }
    });

    // deleteMany (query level)
    schema.post('deleteMany', async function (res: any, next) : Promise<void> {
        if (this instanceof mongoose.Query) {
            await filterAndModifyMany(this, next);
        }
    });

};



