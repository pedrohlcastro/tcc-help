import { Router } from 'express';
import passport from 'passport';
import path from 'path';

import TccController from '../controllers/TccController';

const router = new Router();

router.get('/spell/:language', (req, res, next) => {
  TccController.checkSpelling(req.params)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.get('/parseTxt/:fileName/:page', (req, res, next) => {
  TccController.pdf2Txt(path.join(__dirname, `../upload/${req.params.fileName}`))
    .then(data => res.json(data[req.params.page]))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.get('/runRule/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const userId = req.user.id;
  TccController.runProfessorRules(req.params.tccId, userId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.get('/file/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  return TccController.getFile(res, next, req.params.tccId);
});

export default router;
