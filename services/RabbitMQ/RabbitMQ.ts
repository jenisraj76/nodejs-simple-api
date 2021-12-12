import rabbit = require('amqplib');
const QUEUE_NAME = 'square';
const EXCHANGE_TYPE = 'direct';
const EXCHANGE_NAME = 'main';
const KEY = 'myKey';
export async function addTaskIntoQueue(number: number) {
    let connection = await rabbit.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    await channel.assertQueue(QUEUE_NAME);
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(number.toString()));

}

let consumeChannel: rabbit.Channel | null = null;
export async function intitiateSquareProcessor() {
    if (consumeChannel) throw new Error('consumeChannel already defined');
    let connection = await rabbit.connect('amqp://localhost');
    const channel = await connection.createChannel();
    channel.consume(QUEUE_NAME, (m) => {
        if (!m) return;
        const number = parseInt(m.content.toString());
        const square = number * number;
        console.log(square);
        channel.ack(m);

    });
    consumeChannel = channel;
}
