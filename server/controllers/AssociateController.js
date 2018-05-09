import db from '../config/db';

class AssociateController {
  constructor() {
    this.Associate = db().models.StudentProfessor;
  }

  create(data) {
    return new Promise((resolve, reject) => {
      this.Associate.create(data)
        .then((result) => {
          /* eslint-disable */
          if (result._options.isNewRecord) { resolve({ msg: 'Association created', status: 200 }); } else { reject(new Error('Error running DB query')); }
          /* eslint-enable */
        }).catch(err => reject(err));
    });
  }

  get(params) {
    return new Promise((resolve, reject) => {
      console.log(params);
      if (params) {
        this.Associate.findOne({
          where: params,
        })
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else {
        this.Associate.findOne({})
          .then(res => resolve(res))
          .catch(err => reject(err));
      }
    });
  }
}

export default new AssociateController();
