/*
A string is said to be a child of a another string if it can be formed by deleting 0 or more characters from the other string. Given two strings of equal length, what's the longest string that can be constructed such that it is a child of both?

For example, ABCD and ABDC have two children with maximum length 3, ABC and ABD. They can be formed by eliminating either the D or C from both strings. Note that we will not consider ABCD as a common child because we can't rearrange characters and ABCD  ABDC.
*/

export function commonChild(s1, s2)
{ // dynamic programming to figure out longest path from one string to other
  let max = 0
  let substr = ""
  for( let i = 0; i < s2.length; i++ ){
    const nextChar = s2[i]
    const temp = substr + nextChar
    if( s1.includes( temp ) ){
      substr += nextChar
      max = Math.max( max, substr.length )
    }
  }
  return max;
}

/*A string is said to be a special string if either of two conditions is met:

    All of the characters are the same, e.g. aaa.
    All characters except the middle one are the same, e.g. aadaa.
    A special substring is any substring of a string which meets one of those criteria. Given a string, determine how many special substrings can be formed from it.

Function Description

The countSpecialSubstr function in the editor below. It should return an integer representing the number of special substrings that can be formed from the given string.*/

export function countSpecialSubstr(s)
{
  let count = 0

  for( let i = 0; i < s.length; i++ ){
    const currentChar = s[i]
    // each character is a substring
    count++
    // for repeating characters, count each additional as a longer substring
    let forwardCursor = 1
    while( s[i+forwardCursor] === currentChar ){
      count++
      forwardCursor++
    }
    // check for if we're in the middle of a special substring
    // outer characters must match, but must not be the same as middle char
    // and they must all be the same
    let doubleCursor = 1
    const outerChar = s[i+doubleCursor]
    while( s[i+doubleCursor] === s[i-doubleCursor]
              && currentChar !== s[i+doubleCursor]
                && outerChar === s[i+doubleCursor]  ){
      console.log( s[i+doubleCursor] + currentChar + s[i-doubleCursor] )
      count++
      doubleCursor++
    }
  }

  return count;
}

/*
You are given a string containing characters  and  only. Your task is to change it into a string such that there are no matching adjacent characters. To do this, you are allowed to delete zero or more characters in the string.

    Your task is to find the minimum number of required deletions.

    For example, given the string , remove an  at positions  and  to make  in  deletions.
*/

export const alternatingCharacters = function(s) {
  let deletes = 0
  let prevChar = ""
  for( let i = 0; i < s.length; i++ ){
    const currentChar = s[i]
    if( prevChar === currentChar ){
      deletes++
    }
    prevChar = currentChar
  }

  return deletes
}


// need to ensure that for each character seen, the quantity of each type is no more than 2 different numbers, and only one of those can have a count of 1
// for each character we see, we use indexof to count that character
// we track previously seen characters
export const validSherlockString = function(s) {
  const charSet = new Set()
  const countMap = {}
  const allowedMultiples = 2

  for( let i = 0; i < s.length; i++ ) {
    const nextChar = s[i]
    if( charSet.has(nextChar) === false ){
      charSet.add( nextChar ) // save that we've seen it
      // count how many times this character is in the string
      let count = 1
      let cursor = s.indexOf(nextChar,i+1)
      while( cursor > -1 )
      {
        count++
        cursor = s.indexOf(nextChar,cursor+1)
      }
      // check if we've seen this count before
      if( countMap[count] != null ){
        for( const [key, value] of Object.entries(countMap) ) {
          if( parseInt(key) !== count && value > 1 ){
            return "NO"
          }
        else if( Math.abs(parseInt(key) - count) > 1 ){
            return "NO"
          }
        }
        countMap[count] += 1
      }
      else{
        if( Object.keys(countMap).length === allowedMultiples ){
          return "NO"
        }
        else{ // add this count to the map
          for( const [key, value] of Object.entries(countMap) ) {
            if( Math.abs(parseInt(key) - count) > 1 && count > 1 ){
              return "NO"
            }
          }
          countMap[count] = 1
        }
      }
    }
  }

  return "YES"
}