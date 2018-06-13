import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
import db from '../config/db';
import config from '../config/config.json';

class ProfessorListController {
  constructor() {
    this.StudentProfessor = db().models.StudentProfessor;
    this.User = db().models.User;
    this.smtpTransport = nodemailer.createTransport({
      service: config.email_service,
      auth: {
        user: config.email,
        pass: config.email_password,
      },
    });

    this.handlebarsOptions = {
      viewEngine: 'handlebars',
      viewPath: path.resolve('./server/templates/'),
      extName: '.html',
    };
  }

  alreadyAssociate(params) {
    return new Promise((resolve, reject) => {
      this.StudentProfessor.findOne({ where: { student_id: params.student_id, activate: 1 } })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  create(data) {
    return new Promise((resolve, reject) => {
      this.StudentProfessor.create(data)
        .then((result) => {
          /* eslint-disable */
          if (result._options.isNewRecord) { resolve({ msg: 'Association created', status: 200 }); } else { reject(new Error('Error running DB query')); }
          /* eslint-enable */
        }).catch((err) => {
          // try update
          this.StudentProfessor.update({ activate: 1 }, {
            where: { student_id: data.student_id, professor_id: data.professor_id },
          })
            .then((result) => {
              if (result) { resolve({ msg: 'Association activated', status: 200 }); } else { reject(new Error('Error running DB query')); }
            })
            .catch((error) => {
              console.log(err);
              console.log(error);
              reject(error);
            });
        });
    });
  }

  getByUser(id) {
    const queryParams = {
      where: { type: 2, validate_professor: 1 },
      attributes: ['id', 'name', 'email', 'type'],
      include: [{
        model: this.User,
        as: 'UserProfessor',
        attributes: ['id'],
        required: false,
        where: { id, type: 1 },
      }],
      raw: true,
    };

    return new Promise((resolve, reject) => {
      this.User.findAll(queryParams)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  getAll() {
    const queryParams = {
      where: { type: 2 }
    };

    return new Promise((resolve, reject) => {
      this.User.findAll(queryParams)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  inviteProfessor(req) {
    return new Promise((resolve, reject) => {
      this.smtpTransport.use('compile', hbs(this.handlebarsOptions));

      const data = {
        to: req.email,
        from: `"${config.project_name}" <${config.email}>`,
        template: 'invite-professor',
        subject: 'TCC Help - Invitation',
        context: {
          url: 'http://localhost:4200/sign-up',
          name: req.nameStudent,
        },
      };
      this.smtpTransport.sendMail(data)
        .then(() => resolve({ msg: 'Email sent', status: 200 }))
        .catch(er => reject(er));
    });
  }

  remove(data, params) {
    return new Promise((resolve, reject) => {
      this.StudentProfessor.update(data, {
        where: params,
      })
        .then((result) => {
          if (result) { resolve({ msg: 'Association desactivated', status: 200 }); } else { reject(new Error('Error running DB query')); }
        })
        .catch(err => reject(err));
    });
  }
}

export default new ProfessorListController();
