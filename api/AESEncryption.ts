import express = require('express')
import { AESEncryption } from '../services/AES_Encryption/AESEncryption';
let router = express.Router();

router.post('/encrypt', [async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    let result = new AESEncryption().encrypt(req.body.plaintext);
    res.status(200).send(result);
}]);

router.post('/decrypt', [(req: express.Request, res: express.Response, next: express.NextFunction) => {
    let result = new AESEncryption().decrypt(req.body.encryptedText)
    res.status(200).send(result);
}]);

export default router;

