import { Router } from 'express';
import passport from 'passport';

import TopicController from '../controllers/TopicController';

const router = new Router();

router.post('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const userId = req.user.id;
  const newTopic = req.body;
  TopicController.create(userId, newTopic)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao criar regra', status: 500 }));
});

router.get('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  TopicController.get()
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

router.get('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const TopicId = req.params.id;
  TopicController.get({ id: TopicId })
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

router.delete('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const TopicId = req.params.id;
  TopicController.delete(TopicId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao deletar regra', status: 500 }));
});

router.put('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const TopicId = req.params.id;
  const newTopic = req.body;
  TopicController.update(newTopic, TopicId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao atualizar regra', status: 500 }));
});

export default router;
