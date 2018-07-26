import Users from '../../../src/models/users';

describe('Routes: Users', () => {
  let request;
  const defaultId = '56cb91bdc3464f14678934cb';
  const defaultUser = {
    name: 'user name',
    profile_photo: 'user photo',
    email: 'user@email.com',
    password: 'userpassword',
    books: [ '56cb91bdc3464f14678934cd' ],
    posts: [ '56cb91bdc3464f14678934ce' ],
    marks: [ '56cb91bdc3464f14678934cf' ],
    role: '56cb91bdc3464f14678934dd',
  };
  const expectedUser = {
    id: defaultId,
    name: 'user name',
    profile_photo: 'user photo',
    email: 'user@email.com',
    password: 'userpassword',
    books: [ '56cb91bdc3464f14678934cd' ],
    posts: [ '56cb91bdc3464f14678934ce' ],
    marks: [ '56cb91bdc3464f14678934cf' ],
    role: '56cb91bdc3464f14678934dd',
  };

  before(() => setupApp().then((app) => {
    request = supertest(app);
  }));

  beforeEach(() => {
    const user = new Users(defaultUser);
    /* eslint-disable-next-line no-underscore-dangle */
    user._id = '56cb91bdc3464f14678934cb';
    return Users.remove({})
      .then(() => user.save());
  });

  afterEach(() => Users.remove({}));

  describe('GET /users', () => {
    it('should return a list of users', (done) => {
      request
        .get('/users')
        .expect({ data: [expectedUser] }, done);
    });

    context('when an id is specified', () => {
      it('should return 200 with one user', (done) => {
        request
          .get(`/users/${defaultId}`)
          .expect(200)
          .expect({ data: expectedUser }, done);
      });
    });
  });

  describe('POST /users', () => {
    context('when usering a user', () => {
      it('should return a new user with status code 201', (done) => {
        const newUser = {
          title: 'User 2',
          content: 'User content 2',
          author: '56cb91bdc3464f14678934cc',
          book: '56cb91bdc3464f14678934ce',
          tags: [ 'test', 'test 2' ],
        };

        request
          .post('/users')
          .send(newUser)
          .expect(201)
          .end((err, res) => {           
            expect(res.body.data._id).to.be.eql(newUser._id);
            done(err);
          });
      });
    });
  });

  describe('PUT /users/:id', () => {
    context('when editing a user', () => {
      it('should update the user and return 200 as status code', (done) => {
        const customUser = {
          title: 'User 3',
          content: 'User content 3',
          author: '56cb91bdc3464f14678934cc',
          book: '56cb91bdc3464f14678934ce',
          tags: [ 'test', 'test 2' ],
        };
        const updatedUser = Object.assign(
          {},
          { id: defaultId },
          customUser,
          defaultUser,
        );
        
        request
          .put(`/users/${defaultId}`)
          .send(customUser)
          .expect(200)
          .expect({ data: updatedUser }, done);
      });
    });
  });

  describe('DELETE /users/:id', () => {
    context('when deleting a user', () => {
      it('should delete a user and return 204 as status code', (done) => {
        request
          .delete(`/users/${defaultId}`)
          .expect(204, done);
      });
    });
  });
});
