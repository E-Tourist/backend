import mongoose from 'mongoose';

export type VersionedPluginOptions = {
    collection?: string;
    logError?: boolean;
    // ensureIndex?: boolean;
    mongoose?: typeof mongoose;
    connection?: mongoose.Connection;
} | string;