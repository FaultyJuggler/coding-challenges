import test from 'tape'
import * as dp from '../src/dynamic-programming.mjs'

test("return maximum profits given weights, profits, and capacity", (assert) => {
  let profits = [1, 6, 10, 16]
  let weights = [1, 2, 3, 5]
  let capacities = [7, 6]
  let expected = [22,17]

  capacities.forEach(function( item, i){
    const actual = dp.solveKnapsack( item, profits, weights )
    assert.equal(actual, expected[i],
        item + ' => ' + expected[i]);
  });

  profits = [4, 5, 3, 7]
  weights = [2, 3, 1, 4]
  capacities = [5]
  expected = [10]

  capacities.forEach(function( item, i){
    const actual = dp.solveKnapsack( item, profits, weights )
    assert.equal(actual, expected[i],
        item + ' => ' + expected[i]);
  });

  assert.end();
});