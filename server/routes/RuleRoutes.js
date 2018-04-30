import { Router } from 'express';
import passport from 'passport';

import RuleController from '../controllers/RuleController';

const router = new Router();

router.post('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const userId = req.user.id;
  const newRule = req.body;
  RuleController.create(userId, newRule)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao criar regra', status: 500 }));
});

router.get('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  RuleController.get()
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

router.get('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const ruleId = req.params.id;
  RuleController.get({ id: ruleId })
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

router.delete('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const ruleId = req.params.id;
  RuleController.delete(ruleId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao deletar regra', status: 500 }));
});

router.put('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const ruleId = req.params.id;
  const newRule = req.body;
  RuleController.update(newRule, ruleId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao atualizar regra', status: 500 }));
});

export default router;
