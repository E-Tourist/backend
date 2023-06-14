import { mongoMigrateCli } from 'mongo-migrate-ts';
import * as configProvider from '@common/config-provider';

mongoMigrateCli({
    uri: configProvider.getMongoConnString(),
    database: configProvider.getMongoDbName(),
    migrationsDir: __dirname,
    migrationsCollection: 'migrations_collection',
});
