import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
import db from '../config/db';
import config from '../config/config.json';

class ProfessorListController {
  constructor() {
    this.ProfessorList = db().models.StudentProfessor;
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

  create(data) {
    return new Promise((resolve, reject) => {
      this.ProfessorList.create(data)
        .then((result) => {
          /* eslint-disable */
          if (result._options.isNewRecord) { resolve({ msg: 'Association created', status: 200 }); } else { reject(new Error('Error running DB query')); }
          /* eslint-enable */
        }).catch(err => reject(err));
    });
  }

  get() {
    const queryParams = {
      where: { type: 2, validate_professor: 1 },
      attributes: ['id', 'name', 'email', 'type'],
      include: [{
        model: this.User,
        as: 'UserProfessor',
        attributes: ['id'],
      }],
      raw: true,
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
}

export default new ProfessorListController();
