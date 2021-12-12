import express = require('express')
import { validateFireBaseJwt, firebaseSignIn } from '../services/Gmail_Auth/Auth_Controller';
let router = express.Router();

router.post('/signin', [async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let result = await firebaseSignIn(req.headers['authorization'] as string).catch(next);
    res.status(200).send(result);
}]);

router.get('/verify', [async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let result = await validateFireBaseJwt(req.headers['authorization'] as string).catch(next);
    res.status(200).send(result);
}]);
export default router;