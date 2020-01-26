import test from 'tape'
import * as dp from '../src/dynamic-programming.mjs'

test( 'return maximum profits given weights, profits, and capacity, 0/1',
    ( assert ) =>
    {
      let profits = [1, 6, 10, 16];
      let weights = [1, 2, 3, 5];
      let capacities = [7, 6];
      let expected = [22, 17];

      capacities.forEach( function( item, i )
      {
        const actual = dp.solveKnapsackMemo( item, profits, weights );
        assert.equal( actual, expected[i],
            item + ' => ' + expected[i] );
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
  } );

  assert.end();
} );

test( 'return maximum profits given weights, profits, and capacity, unbounded',
( assert ) =>
{
  let profits = [15, 20, 50];
  let weights = [1, 2, 3];
  let capacities = [5];
  let expected = [80];

  capacities.forEach( function( item, i )
  {
    const actual = dp.solveKnapsackUnboundedMemo( item, profits, weights );
    assert.equal( actual, expected[i],
        item + ' => ' + expected[i] );
  } );

  capacities.forEach( function( item, i )
  {
    const actual = dp.solveKnapsackUnboundedBott( item, profits, weights );
    assert.equal( actual, expected[i],
        item + ' => ' + expected[i] );
  } );

  profits = [15, 50, 60, 90];
  weights = [1, 3, 4, 5];
  capacities = [8, 6];
  expected = [140, 105];

  capacities.forEach( function( item, i )
  {
    const actual = dp.solveKnapsackUnboundedMemo( item, profits, weights );
    assert.equal( actual, expected[i],
        item + ' => ' + expected[i] );
  } );

  capacities.forEach( function( item, i )
  {
    const actual = dp.solveKnapsackUnboundedBott( item, profits, weights );
    assert.equal( actual, expected[i],
        item + ' => ' + expected[i] );
  } );

  assert.end();
} );

test( 'longest palindrome subsequence',
    ( assert ) =>
    {
      let input = [
        'abdbca'
        , 'cddpd'
        , 'pqr'
        , 'lpaspal'];
      let expected = [5, 3, 1, 5];

      input.forEach( function( item, i )
      {
        let actual = dp.palindromeSubMemo( item );
        assert.equal( actual, expected[i],
            item + ' => ' + expected[i] );

        actual = dp.palindromeSubBott( item );
        assert.equal( actual, expected[i],
            item + ' => ' + expected[i] );
      } );

      assert.end();
    } );