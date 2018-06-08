import { Strategy as LocalStrategy } from 'passport-local';
import db from '../db';

const { User } = db().models;

const configPassportLocalStrategy = (passport) => {
  passport.use('local', new LocalStrategy((username, password, done) => {
    User.findOne({ where: { email: username } })
      .then((result) => {
        if (result) {
          if (User.comparePassword(result.password, password)) { return done(null, result); }
          return done(null, false, { message: 'Password does not match' });
        } return done(null, false, { message: 'User not found' });
      })
      .catch(err => done(err));
  }));
};

export default configPassportLocalStrategy;
