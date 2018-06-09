import jwt from 'jsonwebtoken';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

import config from '../config.json';
import db from '../db';

const { User } = db().models;

const configBearerStrategy = (passport) => {
  // anyone can access
  passport.use('BasicBearer', new BearerStrategy((token, done) => {
    /* eslint-disable */
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) { return done({ status: 401, msg: 'Unauthorized', err }); }
      User.findById(decoded.id)
        .then((result) => {
          const reqUser = {
            id: result.id,
            type: result.type,
          };
          return done(null, reqUser);
        })
        .catch(er => done({ status: 401, msg: 'Unauthorized', er }));
    });
    /* eslint-enable */
  }));

  // only  ADMIN users can access
  passport.use('AdminBearer', new BearerStrategy((token, done) => {
    /* eslint-disable */
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) { return done({ status: 401, msg: 'Unauthorized', err }); }
      User.findById(decoded.id)
        .then((result) => {
          const reqUser = {
            id: result.id,
            type: result.type,
          };
          if (reqUser.type === 0) { return done(null, reqUser); }
          else done({ status: 401, msg: 'Unauthorized', err });
        })
        .catch(er => done({ status: 401, msg: 'Unauthorized', er }));
    });
    /* eslint-enable */
  }));

  // only Professor users can access
  passport.use('ProfessorBearer', new BearerStrategy((token, done) => {
    /* eslint-disable */
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) { return done({ status: 401, msg: 'Unauthorized', err }); }
      User.findById(decoded.id)
        .then((result) => {
          const reqUser = {
            id: result.id,
            type: result.type,
          };
          if (reqUser.type === 2 && reqUser.validate_professor === 1) { return done(null, reqUser); }
          return done({ status: 401, msg: 'Unauthorized', err });
        })
        .catch(er => done({ status: 401, msg: 'Unauthorized', er }));
    });
    /* eslint-enable */
  }));
};

export default configBearerStrategy;
