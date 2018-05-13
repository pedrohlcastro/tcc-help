import { Router } from 'express';
import path from 'path';

import TccController from '../controllers/TccController';

const router = new Router();

router.get('/spell/:language', (req, res, next) => {
  TccController.checkSpelling(req.params)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.get('/parseTxt/:fileName/:page', (req, res, next) => {
  TccController.dumpPdf2Txt(path.join(__dirname, `../upload/${req.params.fileName}`))
    .then(data => res.json(data[req.params.page]))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

export default router;
