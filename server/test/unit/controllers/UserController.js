import RuleController from '../../../controllers/RuleController';
import UserController from '../../../controllers/UserController';

describe('Controller: User', () => {
  const defaultUser = {
    id: 1,
    name: 'admin',
    email: 'gustavo.marques2011@gmail.com',
    password: '123456',
    type: 0,
    validate_professor: 0,
    profile_image_path: 'path',
  };
  before(async () => {
    try {
      await RuleController.Rule.destroy({ where: {} });
      await UserController.User.destroy({ where: {} });
      await UserController.User.create(defaultUser);
      // done();
    } catch (err) {
      /*eslint-disable */
      console.log(err);
      /* eslint-enable */
    }
  });

  it('should create a user', () => {
    UserController.create(defaultUser)
      .then((response) => {
        expect(response.status).to.be.eql(200);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  it('should return a list of users', () => {
    UserController.getAll()
      .then((response) => {
        expect(response.status).to.be.eql(2);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  it('should return a user', () => {
    UserController.getById({ id: 1 })
      .then((response) => {
        expect(response).to.be.eql(defaultUser);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  it('should update a user', () => {
    UserController.update(defaultUser, { id: 1 })
      .then((response) => {
        expect(response.status).to.be.eql(200);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  it('should delete a user', () => {
    UserController.delete({ id: 2 })
      .then((response) => {
        expect(response.status).to.be.eql(200);
        UserController.getById({id: 2})
          .then((user) => {
            expect(user).to.be.eql(null);
            done();
          })
          .catch((err) => {
            done(`Catch was called: ${err}`);
          });
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  it('should return a token', () => {
    UserController.signIn(null, defaultUser, null)
      .then((response) => {
        expect(response.result).to.be.eql('Success');
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  it('should check the token', () => {
    UserController.checkToken(defaultUser)
      .then((response) => {
        expect(response.result).to.be.eql('Success');
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

/*it('should send an email', () => {
    UserController.forgotPassword(defaultUser)
      .then((response) => {
        expect(response.status).to.be.eql(200);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });*/

  it('should reset the password', () => {
    let data = {
      password: '654321',
      confirmPassword: '654321'
    }
    UserController.forgotPassword(data)
      .then((response) => {
        expect(response.status).to.be.eql(200);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });
});
