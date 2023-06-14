import mongoose from 'mongoose';


export interface SchemaVersionedModel<T extends mongoose.Model<TD>, TD extends mongoose.Document = any> extends mongoose.Model<TD>{
    VersionedModel<D extends mongoose.Document>(): mongoose.Model<D>;
    findVersion<D extends mongoose.Document>(id: string, version: number): Promise<D>;
    findValidVersion<D extends mongoose.Document>(id: string, date: number): Promise<D>;
    findManyVersions<D extends mongoose.Document>(versions: Array<{ id: string, version: number }>): Promise<Array<D>>;
    findAllVersions<D extends mongoose.Document>(id: string): Promise<Array<D>>;
}