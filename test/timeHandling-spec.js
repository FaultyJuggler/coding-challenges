let expect = require('chai').expect;

const TimeHandler = require('../src/timeHandling.js');
const time = new TimeHandler()

describe('time object', function() {
  it('should exist', function() {

    expect(time).to.not.be.undefined;
  });
});

describe('#convertTo24()', function() {
  it('convert 07:05:45PM to 24 hour format', function() {
    let input = '07:05:45PM';
    let expected = '19:05:45';
    let actual = time.convertTo24(input);
    expect(actual).to.eql(expected);
  });

  it('convert 07:05:45AM to 24 hour format', function() {
    let input = '07:05:45AM'
    let expected = '07:05:45';
    let actual = time.convertTo24(input);
    expect(actual).to.eql(expected);
  });

  it('convert 11:05:45AM to 24 hour format', function() {
    let input = '11:05:45AM'
    let expected = '11:05:45';
    let actual = time.convertTo24(input);
    expect(actual).to.eql(expected);
  });

  it('convert 11:05:45PM to 24 hour format', function() {
    let input = '11:05:45PM'
    let expected = '23:05:45';
    let actual = time.convertTo24(input);
    expect(actual).to.eql(expected);
  });

  it('convert 12:05:45PM to 24 hour format', function() {
    let input = '12:05:45PM'
    let expected = '12:05:45';
    let actual = time.convertTo24(input);
    expect(actual).to.eql(expected);
  });

  it('convert 12:05:45AM to 24 hour format', function() {
    let input = '12:05:45AM'
    let expected = '00:05:45';
    let actual = time.convertTo24(input);
    expect(actual).to.eql(expected);
  });

});