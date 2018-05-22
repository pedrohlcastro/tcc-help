import { Router } from 'express';
import passport from 'passport';

import CommentController from '../controllers/CommentController';

const router = new Router();

router.post('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const userId = req.user.id;
  const tccId = req.body.tcc.id;
  const newComment = req.body.data;

  CommentController.create(userId, tccId, newComment)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao criar regra', status: 500 }));
});

router.get('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  CommentController.get()
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

router.get('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const CommentId = req.params.id;
  CommentController.get({ comment_id: CommentId })
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

router.delete('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const CommentId = req.params.id;
  CommentController.delete(CommentId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao deletar regra', status: 500 }));
});

router.put('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const CommentId = req.params.id;
  const newComment = req.body;
  CommentController.update(newComment, CommentId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao atualizar regra', status: 500 }));
});

export default router;
