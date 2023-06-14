import { ClientSession } from 'mongodb';
import mongoose from 'mongoose';
import { SchemaVersionedValidityDocumentField } from './schema-versioned-validity-document-field';


export interface SchemaVersionedDocument extends mongoose.Document{
    _version: number;
    _editor: string;
    _validity: SchemaVersionedValidityDocumentField;
    _deleter?: string;
    _deletion?: {
        _deleter: string;
    };
    _edition?: string;
    _session?: ClientSession | null;
}
