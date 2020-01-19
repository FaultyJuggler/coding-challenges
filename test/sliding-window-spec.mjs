import test from 'tape'
import * as window from '../src/sliding-window.mjs'

test("Given an array of positive numbers find the maximum sum of any contiguous subarray of size k", (assert) => {
  let expected = 9
  let actual = window.max_sub_array_of_size_k(3, [2,1,5,1,3,2])
  assert.equal(actual, expected,
      'k = 3 | [2,1,5,1,3,2] => 9');

  expected = 7
  actual = window.max_sub_array_of_size_k(2, [2,3,4,1,5])
  assert.equal(actual, expected,
      'k = 2 | [2,3,4,1,5] => 7');

  assert.end();
});

test("Each character represents a fruit tree put maximum number of fruits in 2 baskets", (assert) => {
  let expected = 3
  let actual = window.fruits_into_baskets(['A', 'B', 'C', 'A', 'C'], 2 )
  assert.equal(actual, expected,
      '[\'A\', \'B\', \'C\', \'A\', \'C\'] => 3');

  expected = 5
  actual = window.fruits_into_baskets(['A', 'B', 'C', 'B', 'B', 'C'], 2 )
  assert.equal(actual, expected,
      '[\'A\', \'B\', \'C\', \'B\', \'B\', \'C\'] => 5');

  assert.end();
});

test("find the length of the longest substring which has no repeating characters", (assert) => {
  let expected = 3
  let actual = window.non_repeat_substring("aabccbb" )
  assert.equal(actual, expected,
      'aabccbb => 3');

  expected = 2
  actual = window.non_repeat_substring("abbbb" )
  assert.equal(actual, expected,
      'abbbb => 2');

  expected = 3
  actual = window.non_repeat_substring("abccde" )
  assert.equal(actual, expected,
      'abccde => 3');

  assert.end();
});