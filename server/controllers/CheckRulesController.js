import db from '../config/db';


class CheckRulesController {
  constructor() {
    this.CheckRule = db().models.CheckRule;
  }

  getAll(tccId) {
    return new Promise((resolve, reject) => {
      this.CheckRule.findAll({ where: { tcc_id: tccId } })
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  choose(body) {
    return new Promise((resolve, reject) => {
      const data = {
        accept: body.choice,
      };
      this.CheckRule.update(data, { where: { id: body.id } })
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }
}

export default new CheckRulesController();
