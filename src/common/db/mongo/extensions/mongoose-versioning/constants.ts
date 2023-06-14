
// Constants

export enum VersionedFields{
    VERSION = '_version',
    ID = '_id',
    VALIDITY = '_validity',
    EDITOR = '_editor',
    DELETER = '_deleter',
    DEFAULT_EDITOR = 'default',
    DELETION = '_deletion',
    DEFAULT_DELETER = 'deleter',
    EDITION = '_edition',
    SESSION = '_session',
}

export const RESERVED_FIELDS = [
    VersionedFields.VERSION,
    VersionedFields.VALIDITY,
    VersionedFields.EDITOR,
    VersionedFields.DELETER,
    VersionedFields.DELETION,
    VersionedFields.EDITION
];