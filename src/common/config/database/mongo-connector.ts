import * as configProvider from '@common/config-provider';
import pino from 'pino';
import mongoose from 'mongoose';

const logger = pino();

export class MongoConnector {
    public static mongoClient: mongoose.Connection;

    public static async connect(): Promise<void> {
        const connString = configProvider.getMongoConnString();
        const dbName = configProvider.getMongoDbName();
        mongoose.connect(connString, {
            dbName
        });
        this.mongoClient = mongoose.connection;
        return new Promise((resolve) => {
            this.mongoClient.once('open', async () => {
                logger.info('Mongo connection established.');

                // MongoConnector.initializeSchemas();
                resolve();
            });
            this.mongoClient.once('error', (err: any) => logger.error(err));
        });
    }


    public static async disconnect(): Promise<void> {
        return mongoose.disconnect();
    }

    // public static initializeSchemas(): void {
    //     for (const model of models) {
    //         MongoConnector.mongoClient.model(model.constructor.name, model.schema());
    //     }
    // }
}