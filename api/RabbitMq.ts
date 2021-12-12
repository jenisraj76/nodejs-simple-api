import express = require('express');
import { addTaskIntoQueue } from '../services/RabbitMQ/RabbitMQ';
let router = express.Router();

router.post('/', [async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let result = await addTaskIntoQueue(Number(req.body['number'])).catch(next);
    res.status(200).send(result);
}]);
export default router;