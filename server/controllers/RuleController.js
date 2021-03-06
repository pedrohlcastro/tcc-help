import db from '../config/db';

class RuleController {
  constructor() {
    this.Rule = db().models.Rule;
  }
  create(userId, data) {
    const newRule = data;
    newRule.professor_id = userId;
    return new Promise((resolve, reject) => {
      this.Rule.create(newRule)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  get(userId, params) {
    return new Promise((resolve, reject) => {
      if (params) {
        const options = params;
        options.professor_id = userId;
        this.Rule.findOne({ where: options, raw: true })
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else {
        this.Rule.findAll({ where: { professor_id: userId } })
          .then(res => resolve(res))
          .catch(err => reject(err));
      }
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.Rule.destroy({ where: { id } })
        .then((result) => {
          if (result) {
            resolve({ status: 'Success' });
          } else {
            reject(new Error('Error DB query'));
          }
        })
        .catch(err => reject(err));
    });
  }

  update(data, id) {
    return new Promise((resolve, reject) => {
      this.Rule.update(data, { where: { id } })
        .then((result) => {
          if (result) {
            resolve({ status: 'Success' });
          } else {
            reject(new Error('Error DB query'));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new RuleController();
