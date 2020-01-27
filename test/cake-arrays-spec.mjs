import test from 'tape';
import * as cake from '../src/cake-arrays.mjs';

test( 'return consolidated time ranges', ( assert ) =>
{
  let input = [[0, 1], [3, 5], [4, 8], [10, 12], [9, 10]];
  let expected = [[0, 1], [3, 8], [9, 12]];

  let actual = cake.consolidateTimeSlots( input );
  assert.equal( actual.toString(), expected.toString(),
      input + ' => ' + expected );

  input = [[1, 2], [2, 3]];
  expected = [[1, 3]];

  actual = cake.consolidateTimeSlots( input );
  assert.equal( actual.toString(), expected.toString(),
      input + ' => ' + expected );

  input = [[7, 9], [2, 6], [3, 5], [1, 10]];
  expected = [[1, 10]];

  actual = cake.consolidateTimeSlots( input );
  assert.equal( actual.toString(), expected.toString(),
      input + ' => ' + expected );

  assert.end();
} );

test( 'return how many ways total can be reached', ( assert ) =>
{
  const input = [
    [1, 2, 3]
    , [1, 2, 3],
  ];
  const totals = [4, 5];
  const expected = [4, 5];

  input.forEach( function( item, i )
  {
    let actual = cake.countPathsFromDenominations( item, totals[i] );
    assert.equal( actual, expected[i],
        item + ' => ' + expected[i] );

    actual = cake.countPathsFromDenominationsBott( item, totals[i] );
    assert.equal( actual, expected[i],
        item + ' => ' + expected[i] );
  } );

  assert.end();
} );