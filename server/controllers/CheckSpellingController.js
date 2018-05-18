import db from '../config/db';

class TccController {
  constructor() {
    this.CheckSpelling = db().models.CheckSpelling;
  }

  getAll(tccId) {
    return new Promise((resolve, reject) => {
      this.CheckSpelling.findAll({ where: { tcc_id: tccId } })
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
      this.CheckSpelling.update(data, { where: { id: body.id } })
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }
}

export default new TccController();
