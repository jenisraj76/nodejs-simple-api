import AesRoutes from './AESEncryption';
import Async_AwaitRoutes from './Async_Await';
import Callback_HellRoutes from './Callback_Hell';
import FirebaseRoutes from './Firebase';
import MongooseRoutes from './Mongoose';
import RabbitMqRoutes from './RabbitMq';
import express = require('express')
let router = express.Router();

router.get('/api', [(req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(200).send('Api in On');
}]);

router.use('/aes', AesRoutes);
router.use('/async_await', Async_AwaitRoutes);
router.use('/callback_hell', Callback_HellRoutes);
router.use('/firebase', FirebaseRoutes);
router.use('/mongoose', MongooseRoutes);
router.use('/rabbitmq', RabbitMqRoutes);
export default router;