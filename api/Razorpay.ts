import express = require('express');
import { intiatePayment, verifyPayment } from '../services/Razorpay/Razorpay';
let router = express.Router();

router.get('/init', [async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let result = await intiatePayment(req.query['id'] as string).catch(next);
    res.status(200).send(result);
}]);

router.post('/verify', [async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let result = await verifyPayment(req.body).catch(next);
    res.status(200).send(result);
}]);
export default router;