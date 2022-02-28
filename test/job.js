process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../server');

chai.use(chaiHttp);
chai.should();
describe('admin login account', () => {
  let accessToken = '';
  before(function (done) {
    const authentication = {
        email: 'admin@fabatechnology.com',
        password: 'admin123'
      };
    chai.request('http://localhost:3000')
      .post('/api/sessions')
      .send(authentication)
      .end((err, response) => {
        response.should.have.status(200);
        accessToken = response.body.token;
        done();
      })
  });
  describe('admin create a new job', () => {
    it('POST /api/jobs', (done) => {
      const job = {
        title: 'Seinor Frontend Developer 999',
        salary_range: '$60k - $80k',
        description: 'We are looking for an ambitious to join our team',
        tags: ['Reactjs', 'Nodejs'],
        company_name: 'Faba technology',
        company_logo:
          'https://unsplash.com/photos/-zH2uIDz4dI'
      };
      chai.request('http://localhost:3000')
        .post('/api/jobs')
        .set('Authorization', 'Bearer ' + accessToken)
        .send(job)
        .end((err, response) => {
          response.should.have.status(201);
          done();
        });
    });
  });

  describe('admin can update a job', () => {
    it('PUT /api/jobs/:id', (done) => {
      const job = {
        title: 'Seinor Frontend Developer 1000',
        salary_range: '$10k - $80k',
        description: 'We are looking for an ambitious to join our team 1000',
        tags: ['Reactjs', 'Nodejs'],
        company_name: 'Faba technology 1000',
        company_logo:
          'https://unsplash.com/photos/-zH2uIDz4dI'
      };
      chai.request('http://localhost:3000')
        .put('/api/jobs/b9ff5411-c83b-4b63-9ce6-4e43e2d93810')
        .set('Authorization', 'Bearer ' + accessToken)
        .send(job)
        .end((err, response) => {
          response.should.have.status(201);
          done();
        });
    });
  });

});