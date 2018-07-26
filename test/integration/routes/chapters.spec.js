import Chapters from '../../../src/models/chapters';

describe('Routes: Chapters', () => {
  let request;
  const defaultId = '56cb91bdc3464f14678934cb';
  const defaultVolumeId = '56cb91bdc3464f14678934cf';
  const defaultChapter = {
    name: 'Chapter 1',
    chapter_num: 1,
    content: 'Chapter content',
    translators: [ '56cb91bdc3464f14678934ca' ],
    reviewers: [ '56cb91bdc3464f14678934cc' ],
    volume: {
      name: 'Volume 1',
      volume_num: 1,
    },
    comments: [ '56cb91bdc3464f14678934ce' ],
  };
  const expectedChapter = {
    id: defaultId,
    name: 'Chapter 1',
    chapter_num: 1,
    content: 'Chapter content',
    translators: [ '56cb91bdc3464f14678934ca' ],
    reviewers: [ '56cb91bdc3464f14678934cc' ],
    volume: {
      _id: defaultVolumeId,
      name: 'Volume 1',
      volume_num: 1,
    },
    comments: [ '56cb91bdc3464f14678934ce' ],
  };

  before(() => setupApp().then((app) => {
    request = supertest(app);
  }));

  beforeEach(() => {
    const chapter = new Chapters(defaultChapter);
    /* eslint-disable-next-line no-underscore-dangle */
    chapter._id = '56cb91bdc3464f14678934cb';
    chapter.volume._id = '56cb91bdc3464f14678934cf';
    return Chapters.remove({})
      .then(() => chapter.save());
  });

  afterEach(() => Chapters.remove({}));

  describe('GET /chapters', () => {
    it('should return a list of chapters', (done) => {
      request
        .get('/chapters')
        .expect({ data: [expectedChapter] }, done);
    });

    context('when an id is specified', () => {
      it('should return 200 with one chapter', (done) => {
        request
          .get(`/chapters/${defaultId}`)
          .expect(200)
          .expect({ data: expectedChapter }, done);
      });
    });
  });

  describe('POST /chapters', () => {
    context('when chaptering a chapter', () => {
      it('should return a new chapter with status code 201', (done) => {
        const newChapter = {
          id: defaultId,
          name: 'Chapter 2',
          chapter_num: 1,
          content: 'Chapter content',
          translators: [ '56cb91bdc3464f14678934ca' ],
          reviewers: [ '56cb91bdc3464f14678934cc' ],
          volume: {
            _id: defaultVolumeId,
            name: 'Volume 1',
            volume_num: 1,
          },
          comments: [ '56cb91bdc3464f14678934ce' ],
        };

        request
          .post('/chapters')
          .send(newChapter)
          .expect(201)
          .end((err, res) => {           
            expect(res.body.data._id).to.be.eql(newChapter._id);
            done(err);
          });
      });
    });
  });

  describe('PUT /chapters/:id', () => {
    context('when editing a chapter', () => {
      it('should update the chapter and return 200 as status code', (done) => {
        const customChapter = {
          id: defaultId,
          name: 'Chapter 2',
          chapter_num: 1,
          content: 'Chapter content fix',
          translators: [ '56cb91bdc3464f14678934ca' ],
          reviewers: [ '56cb91bdc3464f14678934cc' ],
          volume: {
            name: 'Volume 1',
            volume_num: 1,
          },
          comments: [ '56cb91bdc3464f14678934ce' ],
        };
        const updatedChapter = Object.assign(
          {},
          { id: defaultId },
          customChapter,
          defaultChapter,
        );
        
        request
          .put(`/chapters/${defaultId}`)
          .send(customChapter)
          .expect(200)
          .expect({ data: updatedChapter }, done);
      });
    });
  });

  describe('DELETE /chapters/:id', () => {
    context('when deleting a chapter', () => {
      it('should delete a chapter and return 204 as status code', (done) => {
        request
          .delete(`/chapters/${defaultId}`)
          .expect(204, done);
      });
    });
  });
});
