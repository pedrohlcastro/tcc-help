import db from '../config/db';

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
}

export default new UserController();
