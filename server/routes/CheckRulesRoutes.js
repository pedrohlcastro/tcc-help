import { Router } from 'express';
import passport from 'passport';

import CheckRulesController from '../controllers/CheckRulesController';

const router = new Router();

router.get('/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  CheckRulesController.getAll(req.params.tccId)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.put('/choose', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  CheckRulesController.choose(req.body)
    .then(() => res.json({ status: 'Success' }))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

export default router;
