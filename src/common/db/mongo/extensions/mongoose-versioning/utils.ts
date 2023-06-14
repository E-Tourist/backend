import mongoose from 'mongoose';
import { RESERVED_FIELDS, VersionedFields } from './constants';

export function cloneSchema(schema: mongoose.Schema, mongooseModule: typeof mongoose): mongoose.Schema {
    const clonedSchema = new mongooseModule.Schema({autoIndex: false});
    schema.eachPath((path: string, type: mongoose.SchemaType): void => {
        if (path === VersionedFields.ID) {
            return;
        }
        // clone schema
        const clonedPath: Record<string, any> = {};
        clonedPath[path] = type.options;

        // shadowed props are not unique
        clonedPath[path].unique = false;

        // shadowed props are not all required
        if (path !== VersionedFields.VERSION) {
            clonedPath[path].required = false;
        }

        clonedSchema.add(clonedPath);
    });
    return clonedSchema;
}

export function isWritable(field: string): boolean {
    return !RESERVED_FIELDS.find(
        key => key === field
    );
}

export function isValidVersion(v: object): boolean {
    if (typeof v !== 'string') return false; // we only process strings!
    if (isNaN(v)) return false; // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    if (isNaN(parseInt(v, 10))) return false; // ...and ensure strings of whitespace fail
    if (parseInt(v, 10) < 1) return false;
    return true;
}
