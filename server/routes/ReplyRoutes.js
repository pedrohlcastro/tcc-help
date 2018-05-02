import { Router } from 'express';
import passport from 'passport';

import ReplyController from '../controllers/ReplyController';

const router = new Router();

router.post('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const userId = req.user.id;
  const topicId = req.body.topic.id;
  const newReply = req.body.data;
  ReplyController.create(userId, topicId, newReply)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao criar regra', status: 500 }));
});

router.get('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  ReplyController.get()
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

router.get('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const TopicId = req.params.id;
  ReplyController.get({ topic_id: TopicId })
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

router.delete('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const ReplyId = req.params.id;
  ReplyController.delete(ReplyId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao deletar regra', status: 500 }));
});

router.put('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const ReplyId = req.params.id;
  const newReply = req.body;
  ReplyController.update(newReply, ReplyId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao atualizar regra', status: 500 }));
});

export default router;
