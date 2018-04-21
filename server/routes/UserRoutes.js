import { Router } from 'express';
import passport from 'passport';

import UserController from '../controllers/UserController';

const router = new Router();

router.route('/')
  .get(passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
    UserController.getAll()
      .then(result => res.json(result))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  })
  .post(passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
    UserController.create(req.body)
      .then(result => res.json(result))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  });

router.route('/:id')
  .get(passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
    UserController.getById(req.params)
      .then(result => res.json(result))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  })
  .put(passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
    if (req.user.type !== '2' || req.user.id === req.params.id) {
      UserController.update(req.body, req.params)
        .then(result => res.json(result))
        .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
    }
    return next({ msg: 'Unauthorized', status: 401 });
  })
  .delete(passport.authenticate('AdminBearer', { session: false }), (req, res, next) => {
    UserController.delete(req.params)
      .then(() => res.sendStatus(204))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  });

router.route('/signin')
  .post((req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => UserController.signIn(err, user, info)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(er => next({ er, msg: 'Unauthorized', status: 401 })))(req, res, next);
  });


router.get('/checktoken', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  passport.authenticate('BasicBearer', { session: false }, (err, user) => UserController.checkToken(user)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(er => next({ er, msg: 'Unauthorized', status: 401 })))(req, res, next);
});

router.route('/forgot_password')
  .post((req, res, next) => {
    UserController.forgotPassword(req.body)
      .then(result => res.json(result))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  });

router.route('/reset_password/:token')
  .post((req, res, next) => {
    UserController.resetPassword(req.body, req.params)
      .then(result => res.json(result))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  });

export default router;
