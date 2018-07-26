import Posts from '../../../src/models/posts';

describe('Routes: Posts', () => {
  let request;
  const defaultId = '56cb91bdc3464f14678934cb';
  const defaultPost = {
    title: 'Post 1',
    content: 'Post content',
    author: '56cb91bdc3464f14678934cc',
    book: '56cb91bdc3464f14678934cd',
    tags: [ 'test' ],
  };
  const expectedPost = {
    id: defaultId,
    title: 'Post 1',
    content: 'Post content',
    author: '56cb91bdc3464f14678934cc',
    book: '56cb91bdc3464f14678934cd',
    tags: [ 'test' ],
  };

  before(() => setupApp().then((app) => {
    request = supertest(app);
  }));

  beforeEach(() => {
    const post = new Posts(defaultPost);
    /* eslint-disable-next-line no-underscore-dangle */
    post._id = '56cb91bdc3464f14678934cb';
    return Posts.remove({})
      .then(() => post.save());
  });

  afterEach(() => Posts.remove({}));

  describe('GET /posts', () => {
    it('should return a list of posts', (done) => {
      request
        .get('/posts')
        .expect({ data: [expectedPost] }, done);
    });

    context('when an id is specified', () => {
      it('should return 200 with one post', (done) => {
        request
          .get(`/posts/${defaultId}`)
          .expect(200)
          .expect({ data: expectedPost }, done);
      });
    });
  });

  describe('POST /posts', () => {
    context('when posting a post', () => {
      it('should return a new post with status code 201', (done) => {
        const newPost = {
          title: 'Post 2',
          content: 'Post content 2',
          author: '56cb91bdc3464f14678934cc',
          book: '56cb91bdc3464f14678934ce',
          tags: [ 'test', 'test 2' ],
        };

        request
          .post('/posts')
          .send(newPost)
          .expect(201)
          .end((err, res) => {           
            expect(res.body.data._id).to.be.eql(newPost._id);
            done(err);
          });
      });
    });
  });

  describe('PUT /posts/:id', () => {
    context('when editing a post', () => {
      it('should update the post and return 200 as status code', (done) => {
        const customPost = {
          title: 'Post 3',
          content: 'Post content 3',
          author: '56cb91bdc3464f14678934cc',
          book: '56cb91bdc3464f14678934ce',
          tags: [ 'test', 'test 2' ],
        };
        const updatedPost = Object.assign(
          {},
          { id: defaultId },
          customPost,
          defaultPost,
        );
        
        request
          .put(`/posts/${defaultId}`)
          .send(customPost)
          .expect(200)
          .expect({ data: updatedPost }, done);
      });
    });
  });

  describe('DELETE /posts/:id', () => {
    context('when deleting a post', () => {
      it('should delete a post and return 204 as status code', (done) => {
        request
          .delete(`/posts/${defaultId}`)
          .expect(204, done);
      });
    });
  });
});
