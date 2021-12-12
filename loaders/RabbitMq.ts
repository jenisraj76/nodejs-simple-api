import { intitiateSquareProcessor } from "../services/RabbitMQ/RabbitMQ";

export const intitiateQueueProcessors = async () => {
    await intitiateSquareProcessor();
} 