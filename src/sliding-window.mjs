/*
Given an array of positive numbers and a positive number ‘k’, find the maximum sum of any contiguous subarray of size ‘k’.
Example 1:

Input: [2, 1, 5, 1, 3, 2], k=3
Output: 9
Explanation: Subarray with maximum sum is [5, 1, 3].
    Example 2:

Input: [2, 3, 4, 1, 5], k=2
Output: 7
Explanation: Subarray with maximum sum is [3, 4].
*/

// export {max_sub_array_of_size_k}

export const max_sub_array_of_size_k = function(k, arr) {
  if( arr.length < k ){
    return -1
  }
  let max = 0
  let stack = []
  let runningTotal = 0

  for( let i = 0; i < arr.length; i++ ){
    const currentVal = arr[i]
    runningTotal += currentVal
    stack.push( currentVal )

    if( stack.length > k ){
      const removedVal = stack.shift()
      runningTotal -= removedVal
    }

    max = Math.max(max, runningTotal)
  }

  return max
};

/*
Given an array of characters where each character represents a fruit tree, you are given two baskets and your goal is to put maximum number of fruits in each basket. The only restriction is that each basket can have only one type of fruit.

    You can start with any tree, but once you have started you can’t skip a tree. You will pick one fruit from each tree until you cannot, i.e., you will stop when you have to pick from a third fruit type.

    Write a function to return the maximum number of fruits in both the baskets.

    Example 1:

Input: Fruit=['A', 'B', 'C', 'A', 'C']
Output: 3
Explanation: We can put 2 'C' in one basket and one 'A' in the other from the subarray ['C', 'A', 'C']
Example 2:

Input: Fruit=['A', 'B', 'C', 'B', 'B', 'C']
Output: 5
Explanation: We can put 3 'B' in one basket and two 'C' in the other basket.
    This can be done if we start with the second letter: ['B', 'C', 'B', 'B', 'C']*/

export const fruits_into_baskets = function(fruit, basketCount) {
  // map fruits to current total
  // when keys > baskets then we reset to the previous fruit having 1 and add the new fruit
  // keep track of maximum quantity
  let max = 0
  let lastFruit = ''
  let currentTotal = 0
  const baskets = []

  for( let i = 0; i < fruit.length; i++ ){
    const nextFruit = fruit[i]
    if( baskets.includes(nextFruit) ){
      currentTotal += 1
      max = Math.max( max, currentTotal )
      lastFruit = nextFruit
    } // are the baskets already in use?
    else if( baskets.length === basketCount ){
      baskets.length = 0
      baskets.push( lastFruit )
      baskets.push( nextFruit )
      lastFruit = nextFruit
      currentTotal = 2
    }
    else { // add the fruit
      baskets.push( nextFruit )
      currentTotal += 1
      lastFruit = nextFruit
      max = Math.max( max, currentTotal )
    }

  }

  return max;
};

/*Given a string, find the length of the longest substring which has no repeating characters.

    Example 1:

Input: String="aabccbb"
Output: 3
Explanation: The longest substring without any repeating characters is "abc".
    Example 2:

Input: String="abbbb"
Output: 2
Explanation: The longest substring without any repeating characters is "ab".
    Example 3:

Input: String="abccde"
Output: 3
Explanation: Longest substrings without any repeating characters are "abc" & "cde".*/

export const non_repeat_substring = function(str) {
  let max = 0
  let substr = []

  for( let i = 0; i < str.length; i++ ){
    const nextChar = str[i]
    while( substr.includes(nextChar) ){
      substr.shift()
    }
    substr.push(nextChar)

    max = Math.max( substr.length, max )
  }

  return max
}