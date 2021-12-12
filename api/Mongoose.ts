import express = require('express')
import { getUserDetail } from '../services/Mongoose/Mongoose';
let router = express.Router();

router.get('/user', [async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let result = await getUserDetail().catch(next);
    res.status(200).send(result);
}]);
export default router;