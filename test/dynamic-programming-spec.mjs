import test from 'tape'
import * as dp from '../src/dynamic-programming.mjs'

test("return maximum profits given weights, profits, and capacity", (assert) => {
  let profits = [1, 6, 10, 16];
  let weights = [1, 2, 3, 5];
  let capacities = [7, 6];
  let expected = [22, 17];

  capacities.forEach(function(item, i)
  {
    const actual = dp.solveKnapsackMemo(item, profits, weights);
    assert.equal(actual, expected[i],
        item + ' => ' + expected[i]);
  });

  capacities.forEach(function(item, i)
  {
    const actual = dp.solveKnapsackBott(item, profits, weights);
    assert.equal(actual, expected[i],
        item + ' => ' + expected[i]);
  });

  profits = [4, 5, 3, 7];
  weights = [2, 3, 1, 4];
  capacities = [5];
  expected = [10];

  capacities.forEach(function(item, i)
  {
    const actual = dp.solveKnapsackMemo(item, profits, weights);
    assert.equal(actual, expected[i],
        item + ' => ' + expected[i]);
  });

  capacities.forEach(function(item, i)
  {
    const actual = dp.solveKnapsackBott(item, profits, weights);
    assert.equal(actual, expected[i],
        item + ' => ' + expected[i]);
  });

  assert.end();
});

test('check if two subsets can be created that have equal sums', (assert) =>
{
  const input = [
    [1, 2, 3, 4]
    , [1, 1, 3, 4, 7]
    , [2, 3, 4, 6],
  ];
  const expected = [true, true, false];

  input.forEach(function(item, i)
  {
    let actual = dp.equalSubsetSumMemo( item );
    assert.equal( actual, expected[i],
        item + ' => ' + expected[i] );
    actual = dp.equalSubsetSumBott( item );
    assert.equal( actual, expected[i],
        item + ' => ' + expected[i] );
  });

  assert.end();
});