import Marks from '../../../src/models/marks';

describe('Routes: Marks', () => {
  let request;
  const defaultId = '56cb91bdc3464f14678934ca';
  const defaultMark = {
    chapters: [ '56cb91bdc3464f14678123ca' ],
    users: [ '56cb91bdc3464f14678124ca' ],
  };
  const expectedMark = {
    id: defaultId,
    chapters: [ '56cb91bdc3464f14678123ca' ],
    users: [ '56cb91bdc3464f14678124ca' ],
  };

  before(() => setupApp().then((app) => {
    request = supertest(app);
  }));

  beforeEach(() => {
    const mark = new Marks(defaultMark);
    /* eslint-disable-next-line no-underscore-dangle */
    mark._id = '56cb91bdc3464f14678934ca';
    return Marks.remove({})
      .then(() => mark.save());
  });

  afterEach(() => Marks.remove({}));

  describe('GET /marks', () => {
    it('should return a list of marks', (done) => {
      request
        .get('/marks')
        .expect({ data: [expectedMark] }, done);
    });

    context('when an id is specified', () => {
      it('should return 200 with one mark', (done) => {
        request
          .get(`/marks/${defaultId}`)
          .expect(200)
          .expect({ data: expectedMark }, done);
      });
    });
  });

  describe('POST /marks', () => {
    context('when posting a mark', () => {
      it('should return a new mark with status code 201', (done) => {
        const newMark = { 
          chapters: [ '56cb91bdc3464f14678123cd' ],
          users: [ '56cb91bdc3464f14678124cb' ], 
        };

        request
          .post('/marks')
          .send(newMark)
          .expect(201)
          .end((err, res) => {
            expect(res.body.data._id).to.be.eql(newMark._id);
            done(err);
          });
      });
    });
  });

  describe('PUT /marks/:id', () => {
    context('when editing a mark', () => {
      it('should update the mark and return 200 as status code', (done) => {
        const customMark = {
          chapters: [ '56cb91bdc3464f14678123cc' ],
          users: [ '56cb91bdc3464f14678124dd' ],
        };
        const updatedMark = Object.assign(
          {},
          { id: defaultId },
          customMark,
          defaultMark,
        );
        
        request
          .put(`/marks/${defaultId}`)
          .send(customMark)
          .expect(200)
          .expect({ data: updatedMark }, done);
      });
    });
  });

  describe('DELETE /marks/:id', () => {
    context('when deleting a mark', () => {
      it('should delete a mark and return 204 as status code', (done) => {
        request
          .delete(`/marks/${defaultId}`)
          .expect(204, done);
      });
    });
  });
});
