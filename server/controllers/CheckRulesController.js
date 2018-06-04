import db from '../config/db';


class CheckRulesController {
  constructor() {
    this.CheckRule = db().models.CheckRule;
    this.Rule = db().models.Rule;
  }

  getAll(tccId) {
    return new Promise((resolve, reject) => {
      const opts = {
        where: { tcc_id: tccId },
        include: [{
          model: this.Rule,
          as: 'CheckRuleRule',
          attributes: ['message'],
        }],
        raw: true,
      };
      this.CheckRule.findAll(opts)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  choose(body) {
    return new Promise((resolve, reject) => {
      const data = {
        accept: body.choice,
        justification: body.justification,
      };
      this.CheckRule.update(data, { where: { id: body.id } })
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }
}

export default new CheckRulesController();
