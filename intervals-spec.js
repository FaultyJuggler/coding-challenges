
// merged_intervals = findIntersection(, );
// result = "";
// for(i=0; i < merged_intervals.length; i++)
//   result += "[" + merged_intervals[i][0] + ", " + merged_intervals[i][1] + "] ";
// console.log("Intervals Intersection: " + result);

const expect = require('chai').expect;

const IntervalHandler = require('./intervals.js');
const IH = new IntervalHandler()

describe('interval handler object', function() {
  it('should exist', function() {

    expect(IH).to.not.be.undefined;
  });
});

describe('findIntersection()', function() {
  it('Given two lists of intervals, find the intersection of these two lists', function() {
    let inputa = [[1, 3], [5, 6], [7, 9]]
    let inputb = [[2, 3], [5, 7]]
    let expected = [[2, 3], [5, 6], [7, 7]]
    let actual = IH.findIntersection(inputa, inputb)
    expect(actual).to.eql(expected);

    inputa = [[1, 3], [5, 7], [9, 12]]
    inputb = [[5, 10]]
    expected = [[5, 7], [9, 10]]
    actual = IH.findIntersection(inputa, inputb)
    expect(actual).to.eql(expected);
  });
});

describe('hasNoOverlap()', function() {
  it('Given an array of intervals representing ‘N’ appointments, find out if a person can attend all the appointments', function() {
    let input = [[1,4], [2,5], [7,9]]
    let expected = false
    let actual = IH.hasNoOverlap(input)
    expect(actual).to.eql(expected);

    input = [[6,7], [2,4], [8,12]]
    expected = true
    actual = IH.hasNoOverlap(input)
    expect(actual).to.eql(expected);

    input = [[4,5], [2,3], [3,6]]
    expected = false
    actual = IH.hasNoOverlap(input)
    expect(actual).to.eql(expected);

    input = [[2,3], [2,4], [4,6]]
    expected = false
    actual = IH.hasNoOverlap(input)
    expect(actual).to.eql(expected);
  });
});

describe('minimumBuckets()', function() {
  it('[1,4], [2,5], [7,9] needs 2 rooms', function() {
    let input = [[1,4], [2,5], [7,9]]
    let expected = 2
    let actual = IH.minimumBuckets(input)
    expect(actual).to.eql(expected);
  });

  it('[6,7], [2,4], [8,12] can use 1 room', function() {
    let input = [[6,7], [2,4], [8,12]]
    let expected = 1
    let actual = IH.minimumBuckets(input)
    expect(actual).to.eql(expected);
  });
  it('[1,4], [2,3], [3,6] needs 2 rooms', function() {
    let input = [[1,4], [2,3], [3,6]]
    let expected = 2
    let actual = IH.minimumBuckets(input)
    expect(actual).to.eql(expected);
  });
  it('[4,5], [2,3], [2,4], [3,5] needs 3 rooms', function() {
    let input = [[1,5], [2,3], [2,4], [3,5]]
    let expected = 3
    let actual = IH.minimumBuckets(input)
    expect(actual).to.eql(expected);
  });

});