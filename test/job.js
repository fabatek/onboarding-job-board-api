// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
// Test POST method
describe('/POST new jobs', () => {
  it('it should POST a job', (done) => {
    const job = JSON.stringify({
      title: 'Dev59',
      salaryrange: '$450-$700',
      description: 'Work with customers and dev team',
      tags: ['English', 'Communicate', 'Technical knowledge'],
      company: 'Faba',
      logoURL: 'https://unsplash.com/photos/g2E2NQ5SWSU'
    });
    chai
      .request(server)
      .post('/api/job')
      .send(job)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have
          .property('message')
          .eql('Pet successfully added!');
        response.body.pet.should.have.property('id');
        response.body.pet.should.have.property('name').eql(job.name);
        response.body.pet.should.have.property('status').eql(job.status);
        done();
      });

    done();
  });
});
