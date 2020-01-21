import test from 'tape'
import * as window from '../src/strings-hackerrank.mjs'

test("return deletes needed to remove repeated characters", (assert) => {
  let expected = [3,4,0,0,4]
  let input = ["AAAA","BBBBB","ABABABAB","BABABA","AAABBB"]

  input.forEach(function( item, i){
    const actual = window.alternatingCharacters( item )
    assert.equal(actual, expected[i],
        item + ' => ' + expected[i]);
  });

  assert.end();
});

test("return if string is a valid Sherlock", (assert) => {
  let input = ["aabbcd","aabbccddeefghi","abcdefghhgfedecba","aaaaabc"]
  let expected = ["NO","NO","YES","NO"]

  input.forEach(function( item, i){
    const actual = window.validSherlockString( item )
    assert.equal(actual, expected[i],
        item + ' => ' + expected[i]);
  });

  assert.end();
});

test("return # of special substrings", (assert) => {
  let input = ["aaaa","abcbaba","asasd","mnonopoo"]
  let expected = [10,10,7,12]

  input.forEach(function( item, i){
    const actual = window.countSpecialSubstr( item )
    assert.equal(actual, expected[i],
        item + ' => ' + expected[i]);
  });

  assert.end();
});

test("return max length of common child", (assert) => {
  let input = [
      ["ABCD","ABDC"]
      ,["AA","BB"]
      ,["SHINCHAN","NOHARAAA"]
      ,["ABCDEF","FBDAMN"]
      ]
  let expected = [3,0,3,2]

  input.forEach(function( item, i){
    const s1 = item[0]
    const s2 = item[1]
    const actual = window.commonChild(s1, s2)
    assert.equal(actual, expected[i],
        item + ' => ' + expected[i]);
  });

  assert.end();
});