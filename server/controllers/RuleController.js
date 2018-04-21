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

  get(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        this.Rule.findOne({ where: params })
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else {
        this.Rule.findAll({})
          .then(res => resolve(res))
          .catch(err => reject(err));
      }
    });
  }
}

export default new RuleController();
