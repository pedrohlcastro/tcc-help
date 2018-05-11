import { Router } from 'express';

import TccController from '../controllers/TccController';

const router = new Router();

router.get('/spell/:language', (req, res, next) => {
  TccController.checkSpelling(req.params)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

export default router;
