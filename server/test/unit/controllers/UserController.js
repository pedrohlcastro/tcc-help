// import UserController from '../../../controllers/UserController';

// describe('Controllers: User', () => {
//   const defaultUser = {
//     id: 1,
//     name: 'admin',
//     email: 'admin@admin.com',
//     password: '12345',
//     type: 0,
//     validate_professor: 0,
//     profile_image_path: 'path',
//   };
//   beforeEach((done) => {
//     UserController.User
//       .destroy({ where: {} })
//       .then(() => {
//         UserController.User.create(defaultUser)
//           .then(() => {
//             done();
//           })
//           .catch(err => done(err));
//       })
//       .catch(err => done(err));
//   });
//   describe('Get all users: getAll()', () => {
//     it('should return a list of users', () => UserController.getAll()
//       .then(response => Array.isArray(response)));
//   });

//   describe('Get a user: getById()', () => {
//     it('should return a user', () => UserController.getById({ id: 1 })
//       .then(response => expect(response).to.be.eql(defaultUser)));
//   });

//   describe('Create a user: create()', () => {
//     it('should create a user', () => {
//       const requestUser = {
//         id: 2,
//         name: 'Test user',
//         email: 'admin@admin.com',
//         password: '12345',
//         type: 0,
//         validate_professor: 0,
//         profile_image_path: 'path',
//       };

//       return UserController.create(requestUser)
//         .then(response => expect(response.dataValues).to.be.eql(requestUser));
//     });
//   });

//   describe('Update a user: update()', () => {
//     it('should update a user', () => {
//       const requestUser = {
//         id: 1,
//         name: 'Test user updated',
//       };

//       return UserController.update(requestUser, { id: 1 })
//         .then(response => expect(parseInt(response, 10)).to.be.above(0));
//     });
//   });

//   describe('Delete a user: delete()', () => {
//     it('should delete a user', () => UserController.delete({ id: 1 })
//       .then(response => expect(parseInt(response, 10)).to.be.above(0)));
//   });
// });
