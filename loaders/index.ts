import { initiateMongooseConnection } from "./Mongoose";
import { initiateTypeORMConnection } from "./Typeorm";
import { initializeFirebaseApp } from "./Firebase";
import { intitiateQueueProcessors } from "./RabbitMq";

export default async () => {
    let promises: Promise<void>[] = [
        initiateMongooseConnection(),
        initiateTypeORMConnection(),
        initializeFirebaseApp(),
        intitiateQueueProcessors()
    ];
    return await Promise.all(promises);
}