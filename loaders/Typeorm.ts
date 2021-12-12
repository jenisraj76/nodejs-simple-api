import { ConnectionOptions, createConnection } from "typeorm";
import { Database } from "../config/Database";

export const initiateTypeORMConnection = async () => {

    var dbconfig: ConnectionOptions =
    {
        type: Database.CONNECTION,
        host: Database.HOST,
        port: Database.PORT,
        username: Database.USERNAME,
        password: Database.PASSWORD,
        database: Database.DATABASE,
        schema: Database.SCHEMA,
        synchronize: Database.SYNCHRONIZE,
        logging: Database.LOGGING,
        entities: [Database.ENTITIES],
        migrationsRun: Database.MIGRATE,
    };
    await createConnection(dbconfig);
}


