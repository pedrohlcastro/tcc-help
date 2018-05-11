import db from '../config/db';

class StudentProfessorController {
  constructor() {
    this.Union = db().models.StudentProfessor;
    this.User = db().models.User;
  }

  // get(params) {
  //   return new Promise((resolve, reject) => {
  //     if (params) {
  //       this.User.findOne({ where: params })
  //         .then(res => resolve(res))
  //         .catch(err => reject(err));
  //     } else {
  //       this.User.findAll({})
  //         .then(res => resolve(res))
  //         .catch(err => reject(err));
  //     }
  //   });
  // }

  get(params) {
    console.log(params);
    const queryParams = {
      where: params,
      attributes: ['id','name','email','type'],
      include: [{
        model: this.User,
        as: 'UserProfessor',
        required: true,
        attributes: ['id','name','email'],
      }],
      raw: true,
    };

    return new Promise ((resolve, reject) =>{
      this.User.findAll(queryParams)
      .then(res =>{
        console.log(res);
        resolve(res);
      })
      .catch(err => reject(err));
    })
  }
}

export default new StudentProfessorController();
