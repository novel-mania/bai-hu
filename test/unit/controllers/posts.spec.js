import sinon from 'sinon';
import PostsController from '../../../src/controllers/posts';
import Posts from '../../../src/models/posts';

describe('Controllers: Posts', () => {
  const defaultPost = {
    id: '56cb91bdc3464f14678934ca',
    title: 'Novo website da novelmania!',
    content: 'Esse é o novo site.',
    author: '56cb91bdc3464f14678934ca',
    book: '56cb91bdc3464f14678934ca',
    tags: 'Novidades',
  };
  let stub;

  describe('get()', () => {
    before(() => {
      stub = sinon.stub(Posts, 'find');
    });

    after(() => {
      stub.restore();
    });

    it('should return a list with all posts', () => {
      Posts.find.withArgs({}).resolves([defaultPost]);

      const postsController = new PostsController(Posts);
      return postsController.get()
        .then(posts => expect(posts.data).to.be.eql([defaultPost]));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        Posts.find.withArgs({}).rejects({ message: 'Error' });

        const postsController = new PostsController(Posts);
        return postsController.get()
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('getById()', () => {
    before(() => {
      stub = sinon.stub(Posts, 'findOne');
    });

    after(() => {
      stub.restore();
    });

    it('should return a post by id', () => {
      const id = '1';
      Posts.findOne.withArgs({ _id: id }).resolves(defaultPost);

      const postsController = new PostsController(Posts);
      return postsController.getById(id)
        .then(post => expect(post.data).to.be.eql(defaultPost));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        const id = '1';
        Posts.findOne.withArgs({ _id: id }).rejects({ message: 'Error' });

        const postsController = new PostsController(Posts);
        return postsController.getById(id)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('create()', () => {
    before(() => {
      stub = sinon.stub(Posts, 'create');
    });

    after(() => {
      stub.restore();
    });

    it('should create a new post', () => {
      stub.withArgs().resolves(defaultPost);

      const postsController = new PostsController(Posts);
      return postsController.create(defaultPost)
        .then(post => expect(post.data).to.be.eql(defaultPost));
    });
    context('when an error ocurs', () => {
      it('should return 422', () => {
        stub.withArgs().rejects({ message: 'Error' });

        const postsController = new PostsController(Posts);
        return postsController.create(defaultPost)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
  describe('put()', () => {
    before(() => {
      stub = sinon.stub(Posts, 'findOneAndUpdate');
    });
    after(() => {
      stub.restore();
    });

    it('should update an existent post', () => {
      const id = '1';
      const updatedPost = {
        id,
        title: 'Novo website da novelmania!',
        content: 'Esse é o novo site, post atualizado.',
        author: '56cb91bdc3464f14678934ca',
        book: '56cb91bdc3464f14678934ca',
        tags: 'Novidades',
      };

      stub.withArgs({ _id: id }, updatedPost).resolves(updatedPost);

      const postsController = new PostsController(Posts);
      return postsController.update(id, updatedPost)
        .then(post => expect(post.data).to.be.eql(updatedPost));
    });

    context('when an error ocurs', () => {
      it('should return 422', () => {
        const id = '1';
        const updatedPost = {
          id,
          title: 'Novo website da novelmania!',
          content: 'Esse é o novo site, post atualizado.',
          author: '56cb91bdc3464f14678934ca',
          book: '56cb91bdc3464f14678934ca',
          tags: 'Novidades',
        };

        stub.withArgs({ _id: id }, updatedPost).rejects({ message: 'Error' });

        const postsController = new PostsController(Posts);
        return postsController.update(id, updatedPost)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
  describe('delete()', () => {
    before(() => {
      stub = sinon.stub(Posts, 'remove');
    });

    after(() => {
      stub.restore();
    });

    it('should delete a existent post', () => {
      const id = '1';
      stub.withArgs({ _id: id }).resolves([1]);

      const postsController = new PostsController(Posts);
      return postsController.remove(id)
        .then(post => expect(post).to.be.eql([1]));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        const id = '1';
        stub.withArgs({ _id: id }).rejects({ message: 'Error' });

        const postsController = new PostsController(Posts);
        return postsController.remove(id)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
});
