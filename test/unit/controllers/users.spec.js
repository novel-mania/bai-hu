import sinon from 'sinon';
import UsersController from '../../../src/controllers/users';
import Users from '../../../src/models/users';

describe('Controllers: Users', () => {
  const defaultUser = {
    id: '56cb91bdc3464f14678934ca',
    name: 'Rick',
    profile_photo: 'http://novelmania.com.br/pic.png',
    role: 'Admin',
    email: 'henriquectatagiba@gmail.com',
    books: ['1'],
    posts: ['1'],
  };
  let stub;

  describe('get()', () => {
    before(() => {
      stub = sinon.stub(Users, 'find');
    });

    after(() => {
      stub.restore();
    });

    it('should return a list with all users', () => {
      Users.find.withArgs({}).resolves([defaultUser]);

      const usersController = new UsersController(Users);
      return usersController.get()
        .then(users => expect(users.data).to.be.eql([defaultUser]));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        Users.find.withArgs({}).rejects({ message: 'Error' });

        const usersController = new UsersController(Users);
        return usersController.get()
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('getById()', () => {
    before(() => {
      stub = sinon.stub(Users, 'findOne');
    });

    after(() => {
      stub.restore();
    });

    it('should return a user by id', () => {
      const id = '1';
      Users.findOne.withArgs({ _id: id }).resolves(defaultUser);

      const usersController = new UsersController(Users);
      return usersController.getById(id)
        .then(user => expect(user.data).to.be.eql(defaultUser));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        const id = '1';
        Users.findOne.withArgs({ _id: id }).rejects({ message: 'Error' });

        const usersController = new UsersController(Users);
        return usersController.getById(id)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('create()', () => {
    before(() => {
      stub = sinon.stub(Users.prototype, 'save');
    });

    after(() => {
      stub.restore();
    });

    it('should create a new user', () => {
      stub.withArgs().resolves(defaultUser);

      const usersController = new UsersController(Users);
      return usersController.create(defaultUser)
        .then(user => expect(user.data).to.be.eql(defaultUser));
    });
    context('when an error ocurs', () => {
      it('should return 422', () => {
        stub.withArgs().rejects({ message: 'Error' });

        const usersController = new UsersController(Users);
        return usersController.create(defaultUser)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
  describe('put()', () => {
    before(() => {
      stub = sinon.stub(Users, 'findOneAndUpdate');
    });
    after(() => {
      stub.restore();
    });

    it('should update an existent user', () => {
      const id = '1';
      const updatedUser = {
        id: '56cb91bdc3464f14678934ca',
        name: 'Rick',
        profile_photo: 'http://novelmania.com.br/pic2.png',
        role: 'Admin',
        email: 'henriquectatagiba@gmail.com',
        books: ['1'],
        posts: ['1'],
      };

      stub.withArgs({ _id: id }, updatedUser).resolves(updatedUser);

      const usersController = new UsersController(Users);
      return usersController.update(id, updatedUser)
        .then(user => expect(user.data).to.be.eql(updatedUser));
    });

    context('when an error ocurs', () => {
      it('should return 422', () => {
        const id = '1';
        const updatedUser = {
          id: '56cb91bdc3464f14678934ca',
          name: 'Rick',
          profile_photo: 'http://novelmania.com.br/pic2.png',
          role: 'Admin',
          email: 'henriquectatagiba@gmail.com',
          books: ['1'],
          posts: ['1'],
        };

        stub.withArgs({ _id: id }, updatedUser).rejects({ message: 'Error' });

        const usersController = new UsersController(Users);
        return usersController.update(id, updatedUser)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
  describe('delete()', () => {
    before(() => {
      stub = sinon.stub(Users, 'remove');
    });

    after(() => {
      stub.restore();
    });

    it('should delete a existent user', () => {
      const id = '1';
      stub.withArgs({ _id: id }).resolves([1]);

      const usersController = new UsersController(Users);
      return usersController.remove(id)
        .then(user => expect(user).to.be.eql([1]));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        const id = '1';
        stub.withArgs({ _id: id }).rejects({ message: 'Error' });

        const usersController = new UsersController(Users);
        return usersController.remove(id)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
});
