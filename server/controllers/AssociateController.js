import db from '../config/db';

class AssociateController {
  constructor() {
    this.Associate = db().models.StudentProfessor;
    this.User = db().models.User;
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
    const queryParams = {
      where: params,
      //include: [{
      //  model: this.User,
      //  as: 'UserProfessor',
      //  required: true,
       // attributes: ['id', 'name', 'email', 'type'],
      //}],
    };

    return new Promise((resolve, reject) => {
      if (params) {
        this.Associate.findOne(queryParams)
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else {
        this.Associate.findOne(queryParams)
          .then(res => resolve(res))
          .catch(err => reject(err));
      }
    });
  }
}

export default new AssociateController();
