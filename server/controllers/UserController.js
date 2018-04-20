import jwt from 'jsonwebtoken';
import db from '../config/db';
import config from '../config/config.json';

class UserController {
  constructor() {
    this.User = db().models.User;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.User.findAll({})
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  getById(params) {
    return new Promise((resolve, reject) => {
      this.User.findOne({ where: params })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  create(data) {
    return new Promise((resolve, reject) => {
      this.User.create(data)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  update(data, params) {
    return new Promise((resolve, reject) => {
      this.User.update(data, {
        where: params,
      })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  delete(params) {
    return new Promise((resolve, reject) => {
      this.User.destroy({
        where: params,
      })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
/* eslint-disable */
  signIn(err, users, info) {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      }
      if (!users) {
        reject(new Error(info));
      }
      const payload = {
        id: users.id,
      };
      const options = {
        expiresIn: '1d',
      };
      let token = 'Bearer ';
      token += jwt.sign(payload, config.jwtSecret, options);
      resolve({ result: 'Success', token, type: users.type });
    });
  }

  checkToken(users) {
    return new Promise((resolve, reject) => {
      if (users) {
        const resJSON = {
          result: 'Success',
          type: users.type,
        };
        resolve(resJSON);
      }
      reject(new Error('Unauthorized'));
    });
  }
/* eslint-enable */
}

export default new UserController();
