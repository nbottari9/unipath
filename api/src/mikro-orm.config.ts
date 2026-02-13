import { Migrator } from '@mikro-orm/migrations';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import path from 'path';

const config: Options = {
    driver: PostgreSqlDriver,
    dbName: "unipath",
    user: "unipath_user",
    // folder-based discovery setup, using common filename suffix
    entities: [path.join(__dirname, "./entities/*.js")],
    entitiesTs: [path.join(__dirname, "./entities/*.ts")],
    // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
    // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
    metadataProvider: TsMorphMetadataProvider,
    extensions: [Migrator],
    populateAfterFlush: true,
    // enable debug mode to log SQL queries and discovery information
    debug: true,
};



export default config;