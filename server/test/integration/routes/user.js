import UserController from '../../../controllers/UserController';

describe('Routes User', () => {
  const defaultUser = {
    id: 1,
    name: 'admin',
    email: 'admin@admin.br',
    password: '12345',
    type: 0,
    validate_professor: 0,
    profile_image_path: 'path',
  };

  beforeEach((done) => {
    UserController.User
      .destroy({ where: {} })
      .then(() => {
        UserController.User.create(defaultUser)
          .then(() => {
            done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  describe('Route GET /users', () => {
    it('should return a list of users', (done) => {
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return the user', (done) => {
      request
        .get('/users/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id);
          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      const newUser = {
        id: 2,
        name: 'user',
        email: 'user@admin.br',
        password: '12345',
        type: 1,
        validate_professor: 0,
        profile_image_path: 'path',
      };
      request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newUser.id);
          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'updateduser',
        email: 'user@admin.br',
        password: '12345',
        type: 1,
        validate_professor: 0,
        profile_image_path: 'path',
      };
      request
        .put('/users/1')
        .send(updatedUser)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('should delete a user', (done) => {
      request
        .delete('/users/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
