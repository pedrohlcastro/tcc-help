import { Router } from 'express';
import passport from 'passport';

import UserController from '../controllers/UserController';

const router = new Router();

router.get('/checktoken', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  passport.authenticate('BasicBearer', { session: false }, (error, user) => {
    UserController.checkToken(user)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next({ err, msg: 'Unauthorized', status: 401 });
      });
  })(req, res, next);
});

router.get('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  UserController.getAll()
    .then(result => res.json(result))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.get('/getbytype/:type', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const data = {
    type: req.params.type,
    validate_professor: (req.params.type === '2') ? '1' : '0', // only valid teachers
  };
  UserController.getByType(data)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.post('/', ((req, res, next) => {
  UserController.create(req.body)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: err.message, status: 500 }));
}));

router.put('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  if (req.user.type !== '2' || req.user.id === req.params.id) {
    UserController.update(req.body, req.params)
      .then(result => res.json(result))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  } else { next({ msg: 'Unauthorized', status: 401 }); }
});

router.delete('/:id', passport.authenticate('AdminBearer', { session: false }), (req, res, next) => {
  UserController.delete(req.params)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', { session: false }, (error, user, info) => {
    UserController.signIn(error, user, info)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(err => next({ err, msg: 'Unauthorized', status: 401 }));
  })(req, res, next);
});

router.route('/forgot_password')
  .post((req, res, next) => {
    UserController.forgotPassword(req.body)
      .then(result => res.json(result))
      .catch((err) => {
        next({ err, msg: err.message, status: 412 });
      });
  });

router.route('/reset_password/')
  .post((req, res, next) => {
    UserController.resetPassword(req.body)
      .then(result => res.json(result))
      .catch(err => next({ err, msg: err.message, status: 500 }));
  });

router.get('/get_user', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  passport.authenticate('BasicBearer', { session: false }, (error, user) => {
    UserController.getById({ id: user.id })
      .then(result => res.json(result))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  })(req, res, next);
});


// DANGER
router.get('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  UserController.getById(req.params)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

export default router;
