const userController = require('../../src/server/user/userController.js');
const User = require('../../src/server/user/userModel.js');
const fs = require('fs');
const path = require('path');
const expect = require('expect');
const mongoose = require('mongoose');
const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/codiphanytest' : 'mongodb://localhost/codiphanydev';
mongoose.connect(mongoURI);
describe('User Model tests', () => {
  describe('#create', () => {
    after((done) => {
      if (process.env.NODE_ENV === 'test') mongoose.connection.db.dropDatabase();
      done();
    });

    it('Should create a user with no solutions', (done) => {
      User.create({ username: 'test', accessToken: 'asdf', solutions: [] }, (err, result) => {
        expect(result.username).toEqual('test');
        expect(result.accessToken).toEqual('asdf');
        expect(result.solutions.length).toEqual(0);
        done();
      })
    });

    it('We should be able to create a post', (done) => {
      let user = new User({ username: 'test2', accessToken: 'asdf' });
      user.createPost({
        title: 'title',
        description: 'desc',
        resources: 'http',
        code: '</code>'
      }, (err, result) => {
        if (err) console.log(err);
        expect(result.title).toEqual('title');
        expect(result.description).toEqual('desc');
        expect(result.resources).toEqual('http');
        expect(result.code).toEqual('</code>');
        done();
      });
    });

    it('Post id should be found on user', (done) => {
      let user = new User({ username: 'test3', accessToken: 'asdf' });
      user.save();
      user.createPost({
        title: 'title',
        description: 'desc',
        resources: 'http',
        code: '</code>'
      }, (err, post) => {
        if (err) console.log(err);
        User.findOne({ username: 'test3' }, (err, result) => {
          expect(result.solutions[0]).toEqual(post._id);
          done();
        })
      });
    });
  });
  describe('#getPosts', () => {
    after((done) => {
      if (process.env.NODE_ENV === 'test') mongoose.connection.db.dropDatabase();
      done();
    });
    it('Should retrieve all posts from user', (done) => {
      let user = new User({ username: 'test4', accessToken: 'asdf', solutions: [] });
      user.save((err) => {
        user.createPost({
          title: 'title1',
          description: 'desc',
          resources: 'http',
          code: '</code>'
        }, (err, post) => {
          user.createPost({
            title: 'title2',
            description: 'desc',
            resources: 'http',
            code: '</code>'
          }, (err, result) => {
            user.getSolutions((err, result) => {
              expect(result.length).toEqual(2);
              done();
            }) 
          });
        });
      });
    });
  });
});
