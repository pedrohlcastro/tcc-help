import { Router } from 'express';
import passport from 'passport';

import CommentController from '../controllers/CommentController';

const router = new Router();

router.post('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  CommentController.create(req.body)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error ao criar comentário', status: 500 }));
});

router.get('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  CommentController.get({ tcc_id: req.params.id })
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

router.delete('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  CommentController.delete(req.params.id)
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
