// run with > mocha
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/crime_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Crime = require(__dirname + '/../models/crime');

describe('crime routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to get all crimes', function(done) {
      chai.request('localhost:3000')
        .get('/api/crimes')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          done();
        });
    });

    it('should be able to get all distinct crimetypes in the database', function(done) {
        chai.request('localhost:3000')
          .get('/api/internal/crimetypes')
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body)).to.eql(true);
            done();
          });
      });

      describe('routes that need a crime in the db', function(done) {
          beforeEach(function(done) {
            (new Crime({properties: {
              summarized_offense_description: 'testcrime',
              occurred_date_or_date_range_start: '2015-11-11T12:00:00.000',
              occurred_date_range_end: '2015-11-11T12:00:00.000',
              rms_cdw_id: '1138'}
            })).save(function(err, data) {
                expect(err).to.eql(null);
                this.cryptid = data;
                done();
            }.bind(this));
          });

          it('should be able to get all crimes of a specific type in a date range', function(done) {
            chai.request('localhost:3000')
              .get('/api/internal/crimetypes/testcrime/Nov 01 2015 00:00:00 GMT-0800 (PST)/Nov 30 2015 00:00:00 GMT-0800 (PST)')
              .end(function(err, res) {
                expect(err).to.eql(null);
                expect(Array.isArray(res.body)).to.eql(true);
                done();
              });
            });
          });

}); // end of describe crime routes
