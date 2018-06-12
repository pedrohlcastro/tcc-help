import { Router } from 'express';
import passport from 'passport';

import CheckSpellingController from '../controllers/CheckSpellingController';

const router = new Router();

router.get('/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  CheckSpellingController.getAll(req.params.tccId)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.put('/choose', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  CheckSpellingController.choose(req.body)
    .then(() => res.json({ msg: 'Success', status: 200 }))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

export default router;
