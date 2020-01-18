const assert = require('assert');
const input = "  hello   world "
const out = "  olleh   dlrow "

// const result = reverseWithSameSpaces(input)
// console.log( result )
// assert( result === out )

function reverseWithSameSpaces( phrase )
{
    var result = ""

    for( var i = 0; i < phrase.length; i++)
    {
        // if characters for leaving in place
        if( phrase[i] === ' ' )
        {
            result += phrase[i]
        }
        else // reverse characters
        {
            var j = i

            while( j< phrase.length && phrase[j] !== ' ')
            {
                j++
            }
            j--
            const nextChar = j
            for( ; j >= i; j--)
            {
                result += phrase[j]
            }

            i = nextChar
        }
    }
    return result
}



// given an array representing a tree where -1 is an empty node, return whether
// left or right side is larger as a sum
const solution = (arr) => {
    if( arr.length < 2 )
    {
        return ""
    }

    let left = 0;
    let right = 0;
    let level = 1;
    let cursor = 1;

    while( cursor < arr.length )
    {
        let counted = 0;
        while( counted < level && cursor < arr.length ) {
            console.log( cursor + " | "+ arr[cursor]);
            if( arr[cursor] !== -1 ) {
                left += arr[cursor]
            }
            cursor++;
            counted++
        }

        while( counted < level*2 && cursor < arr.length ) {
            console.log( cursor + " | "+ arr[cursor]);
            if( arr[cursor] !== -1 ) {
                right += arr[cursor]
            }
            cursor++;
            counted++
        }
        console.log( left +" : "+ right);
        //cursor++
        // next level
        level++
    }

    if( left > right ) {
        return "Left"
    }
    else if( left < right ) {
        return "Right"
    }
    else {
        return ""
    }
};
// console.log( solution([1,10,5,1,0,6]))


// Return "Possible" (quotes for clarity) if there is a sequence of valid moves that will change initial into target. Otherwise, return "Impossible".
const canObtain= function( start, target )
{
    while( start.length < target.length )
    {
        const sub = target.substring( 0, start.length );
        const nextChar = target.substring( start.length, start.length+1 );

        if( target[target.length-1] === 'A')
        {
            target = target.substring(0, target.length-1)
        }
        else if( target[target.length-1] === 'B')
        {
            target = target.substring(0, target.length-1);
            target = target.split("").reverse().join("")
        }

        console.log( target )
    }

    if( start === target )
    {
        return "Possible"
    }

    return "Impossible"
};

// console.log( canObtain( "B", "ABBA" ) )
// console.log( canObtain( "AB", "ABB" ) )
// console.log( canObtain( "BBAB", "ABABABABB" ) )
// console.log( canObtain( "BBBBABABBBBBBA", "BBBBABABBABBBBBBABABBBBBBBBABAABBBAA" ) )
// console.log( canObtain( "A", "BB" ) )

// Given the head of a Singly LinkedList, write a function to determine if the LinkedList has a cycle in it or not.
// Given the head of a LinkedList with a cycle, find the length of the cycle.
// Given the head of a Singly LinkedList that contains a cycle, write a function to find the starting node of the cycle.

class Node {
    constructor(value, next=null){
        this.value = value;
        this.next = next;
    }
}

const find_cycle_start = function(head) {
    let slow = head;
    let fast = head;

    while( fast.next != undefined )
    {
        fast = fast.next;
        if( fast.next != undefined )
        {
            fast = fast.next
        }
        slow = slow.next;

        if( slow == fast )
        {
            let length = 1;
            fast = fast.next;
            while( slow != fast )
            {
                fast = fast.next;
                length++
            }

            slow = head;
            fast = head;
            for( let i=0; i< length; i++)
            {
                fast = fast.next
            }

            while( slow != fast )
            {
                fast = fast.next;
                slow = slow.next
            }

            return [true, length, slow.value]
        }
    }

    return false
};

//
// head = new Node(1)
// head.next = new Node(2)
// head.next.next = new Node(3)
// head.next.next.next = new Node(4)
// head.next.next.next.next = new Node(5)
// head.next.next.next.next.next = new Node(6)
//
// head.next.next.next.next.next.next = head.next.next
// console.log(`LinkedList cycle start: ${find_cycle_start(head)}`)
//
// head.next.next.next.next.next.next = head.next.next.next
// console.log(`LinkedList cycle start: ${find_cycle_start(head)}`)
//
// head.next.next.next.next.next.next = head
// console.log(`LinkedList cycle start: ${find_cycle_start(head)}`)


// Given a sorted array, create a new array containing squares of all the number
// of the input array in the sorted order.
const make_squares = function(arr) {
    squares = [];
    let max = -1;
    let min = Number.MAX_VALUE;
    let leftPtr = 0;

    while( arr[leftPtr] < 0 )
    {
        leftPtr++
    }

    let rightPtr = leftPtr+1;

    console.log( leftPtr +":"+rightPtr+":"+squares);
    while( leftPtr >= 0 || rightPtr < arr.length )
    {
        let left = arr[leftPtr];
        left = left*left;

        let right = arr[rightPtr];
        right = right*right;

        if( left > right )
        {
            if( rightPtr < arr.length )
            {
                squares.push( right );
                rightPtr++
            }
            else
            {
                squares.push( left );
                leftPtr--
            }
        }
        else
        {
            if( leftPtr >= 0 )
            {
                squares.push( left );
                leftPtr--
            }
            else
            {
                squares.push( right );
                rightPtr++
            }
        }

        console.log( leftPtr +":"+rightPtr+":"+squares)
    }

    return squares;
};

// console.log(`Squares: ${make_squares([-2, -1, 0, 1, 2, 3])}`);
// console.log(`Squares: ${make_squares([-3, -1, 0, 1, 2])}`);
// console.log(`Squares: ${make_squares([0, 1, 2, 3, 4])}`);

// Given a string and a pattern, find all anagrams of the pattern in the given string
const find_string_anagrams = function(str, pattern) {
    const result_indexes = [];
    const chars = pattern.split('').sort();
    const patLen = chars.length;

    for( let i = 0; i < str.length-patLen+1; i++ )
    {
        const subChars = str.substring( i, i+patLen ).split('').sort();
        if( chars.toString() === subChars.toString() )
        {
            result_indexes.push(i)
        }
    }

    return result_indexes;
};

// console.log(find_string_anagrams('ppqp', 'pq'));
// console.log(find_string_anagrams('abbcabc', 'abc'));

// Given an array containing 0s, 1s and 2s, sort the array in-place. You should treat numbers of the array as objects,
// hence, we can’t count 0s, 1s, and 2s to recreate the array.

const dutch_flag_sort = function(arr) {
    // all elements < low are 0, and all elements > high are 2
    // all elements from >= low < i are 1
    let low = 0,
        high = arr.length - 1,
        i = 0;
    while (i <= high) {
        if (arr[i] === 0) {
            [arr[i], arr[low]] = [arr[low], arr[i]]; // swap
            // increment 'i' and 'low'
            i += 1;
            low += 1;
        } else if (arr[i] === 1) {
            i += 1;
        } else { // the case for arr[i] === 2
            [arr[i], arr[high]] = [arr[high], arr[i]]; // swap
            // decrement 'high' only, after the swap the number at index 'i' could be 0, 1, or 2
            high -= 1;
        }
    }
};

// let arr = [1, 0, 2, 1, 0];
// dutch_flag_sort(arr);
// console.log(arr);
//
// arr = [2, 2, 0, 1, 2, 0];
// dutch_flag_sort(arr);
// console.log(arr);

/* Given an array of sorted numbers, remove all duplicates from it. You should not use any extra space; after removing the duplicates in-place return the new length of the array. */
const remove_duplicates = function(arr) {
    let prev = 0;
    let next = 1;

    let i = 1;
    while( i < arr.length )
    {
        if( arr[i] === arr[i-1] )
        {
            arr.splice(i-1, 1)
        }
        else
        {
            i++
        }
    }

    return arr.length
};

// console.log(remove_duplicates([2, 3, 3, 3, 6, 9, 9]));
// console.log(remove_duplicates([2, 2, 2, 11]));

// Given an array of sorted numbers and a target sum, find a pair in the array whose sum is equal to the given target.
const pair_with_target_sum = function(arr, target_sum) {
    let leftCursor = 0;
    let rightCursor = arr.length-1;

    if( target_sum < arr[leftCursor] )
    {
        return "sum too low"
    }

    let currentSum = arr[leftCursor] + arr[rightCursor];
    while( currentSum !== target_sum )
    {
        if( leftCursor >= rightCursor )
        {
            return [-1, -1]
        }

        if( currentSum > target_sum )
        {
            rightCursor--
        }
        else if( currentSum < target_sum )
        {
            leftCursor++
        }

        currentSum = arr[leftCursor] + arr[rightCursor]
    }

    return [leftCursor, rightCursor]
};

// console.log(pair_with_target_sum([1, 2, 3, 4, 6], 6));
// console.log(pair_with_target_sum([2, 5, 9, 11], 11));


// Given a string, find the length of the longest substring which has no repeating characters.
const non_repeat_substring = function(str) {

    if( str.length < 2 )
    {
        return 0
    }

    let max = 0;
    let leftCursor = 0;
    let charList = [];

    for( let i = 0; i < str.length; i++ )
    {
        if( charList.includes( str[i] ))
        {
            charList = [str[i]]
        }
        else
        {
            charList.push( str[i] );
            if( charList.length > max)
            {
                max = charList.length
            }
        }
    }


    return max;
};

// console.log( non_repeat_substring("aabccbb") )
// console.log( non_repeat_substring("abbbb") )
// console.log( non_repeat_substring("abccde") )

// Given a string, find the length of the longest substring in it with no more than K distinct characters.
const longest_substring_with_k_distinct = function(str, k) {

    if( str.length < 1 || str.length < k )
    {
        return -1
    }

    const chars = [];
    let max = 0;
    let leftCursor = 0;
    let substr = "";

    chars.push(str[0]);
    // move cursor right, check for new character
    for( let i = 1; i < str.length; i++ )
    {
        const char = str[i-1];
        if( chars.includes(char) === false )
        {
            chars.push( char )
        }
        substr = str.substring(leftCursor, i);

        if( chars.length === k )
        {
            if( substr.length > max )
            {
                console.log(substr);
                max = substr.length
            }
        }
        else if( chars.length > k )
        {
            while( chars.length > k )
            {
                const c = str[leftCursor];
                leftCursor++;
                if( str.substring(leftCursor, i).includes( c ) === false )
                {
                    chars.splice( chars.indexOf(c), 1)
                }
            }
        }
    }
    // if length of chars == K then we have a match
    // if length of substr > max then we have a new max

    return max
};

// console.log( longest_substring_with_k_distinct("araaci", 2) )
// console.log( longest_substring_with_k_distinct("araaci", 1) )
// console.log( longest_substring_with_k_distinct("cbbebi", 3) )


// given a list of strings, sort them naturally
function alphanumCase(a, b) {
    function chunkify(t) {
        let tz = [];
        let x = 0, y = -1, n = 0, i, j;

        while (i = (j = t.charAt(x++)).charCodeAt(0)) {
            let m = (i == 46 || (i >=48 && i <= 57));
            if (m !== n) {
                tz[++y] = "";
                n = m;
            }
            tz[y] += j;
        }
        return tz;
    }

    let aa = chunkify(a.toLowerCase());
    let bb = chunkify(b.toLowerCase());

    for (x = 0; aa[x] && bb[x]; x++) {
        console.log( aa[x] + ":" + bb[x]);
        if (aa[x] !== bb[x]) {
            var c = Number(aa[x]), d = Number(bb[x]);
            if (c == aa[x] && d == bb[x]) {
                return c - d;
            } else return (aa[x] > bb[x]) ? 1 : -1;
        }
    }
    return aa.length - bb.length;
}

const list = [ "z9","z1","z10","z18","z100","z7","z101","z102","z11","z12","z13","z14","z15","z16","z17","z19","z2","z20","z3","z4","z5","z6","z8" ];
// list.sort( alphanumCase )
// console.log( list )

// Given an infinite supply of ‘n’ coin denominations and a total money amount, we are asked to find the total number
// of distinct ways to make up that amount.

let countChange = function(denominations, total) {

    if (denominations.length === 0 || total < 1 )
    {
        return 0
    }

    const dp = [];
    // for each coin
    // if subtracting that coin to from total == 0 we have found a path
    // if not, recursive check if adding it will lead to the total
    function recursiveCount( denominations, total, currentIndex )
    {
        if( total === 0 )
        {
            return 1
        }
        else if( currentIndex > denominations.length )
        {
            return 0
        }

        dp[currentIndex] = dp[currentIndex] || [];
        if( typeof dp[currentIndex][total] !== 'undefined' )
        {
            return dp[currentIndex][total]
        }
        else // calculate
        {
            let sum1 = 0;
            if( denominations[currentIndex] <= total )
            {
                sum1 += recursiveCount( denominations, total - denominations[currentIndex], currentIndex )
            }

            const sum2 = recursiveCount( denominations, total, currentIndex + 1 );

            dp[currentIndex][total] = sum1 + sum2;
            return dp[currentIndex][total]
        }
    }

    return recursiveCount( denominations, total, 0 )
};

// console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);


let findLPSLength = function(st) {
    const dp = [];

    function findLPSLengthRecursive(st, startIndex, endIndex) {
       if( startIndex > endIndex )
       {
           return 0
       }
       else if( startIndex === endIndex )
       {
           return 1
       }

       dp[startIndex] = dp[startIndex] || [];
        if( typeof dp[startIndex][endIndex] === 'undefined' )
       {
           if( st[startIndex] === st[endIndex] )
           {
               const remaining = endIndex - startIndex - 1;
               if( remaining === findLPSLengthRecursive(st, startIndex+1, endIndex-1) )
               {
                   dp[startIndex][endIndex] = 2 + remaining;
                   return dp[startIndex][endIndex]
               }
           }
           //else
           //{
               const l1 = findLPSLengthRecursive(st, startIndex+1, endIndex);
               const l2 = findLPSLengthRecursive(st, startIndex, endIndex-1);
               dp[startIndex][endIndex] = Math.max( l1, l2 )
           //}
       }

       return dp[startIndex][endIndex]
    }

    return findLPSLengthRecursive(st, 0, st.length - 1);
};

// console.log("Length of LPS ---> " + findLPSLength("abdbca"));
// console.log("Length of LPS ---> " + findLPSLength("cddpd"));
// console.log("Length of LPS ---> " + findLPSLength("pqr"));


// Given a number ‘n’, implement a method to count how many possible ways there are to express ‘n’ as the sum of 1, 3, or 4.
const CountXWays = function(n)
{
    const dp = new Array(n+1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 1;
    dp[3] = 2;

    for( let i = 4; i <= n; i++ )
    {
        dp[i] = dp[i-1] + dp[i-3] + dp[i-4]
    }

    return dp[n]
};

// console.log(`Number of ways: ---> ${CountXWays(4)}`);
// console.log(`Number of ways: ---> ${CountXWays(5)}`);
// console.log(`Number of ways: ---> ${CountXWays(6)}`);


// Given a stair with ‘n’ steps, implement a method to count how many possible ways are there to reach the top of the
// staircase, given that, at every step you can either take 1 step, 2 steps, or 3 steps.

const CountWays = function(n)
{
    if( n < 2 )
    {
        return 1
    }
    else if( n == 2 )
    {
        return 2
    }
    let n1 = 1;
    let n2 = 1;
    let n3 = 2;
    let temp;

    for( let i = 3; i <= n; i++ )
    {
        temp = n1 + n2 + n3;
        n1 = n2;
        n2 = n3;
        n3 = temp

    }

    return n3
};

// console.log(`Number of ways: ---> ${CountWays(3)}`);
// console.log(`Number of ways: ---> ${CountWays(4)}`);
// console.log(`Number of ways: ---> ${CountWays(5)}`);

const calculateFibonacci = function(n) {
    if (n < 2) return n;

    let n1 = 0,
        n2 = 1,
        temp;
    for (let i = 2; i <= n; i++) {
        temp = n1 + n2;
        n1 = n2;
        n2 = temp;
    }
    return n2;
};
//
// console.log(`5th Fibonacci is ---> ${calculateFibonacci(5)}`);
// console.log(`6th Fibonacci is ---> ${calculateFibonacci(6)}`);
// console.log(`7th Fibonacci is ---> ${calculateFibonacci(7)}`)

// Given the weights and profits of ‘N’ items, we are asked to put these items in a knapsack which has a capacity ‘C’.
// The goal is to get the maximum profit from the items in the knapsack.

let solveKnapsack = function(profits, weights, capacity) {
    const dp = [];

    function knapsackRecursive(profits, weights, capacity, currentIndex) {
        // base checks
        if( capacity <= 0 || profits.length == 0 ||
                weights.length != profits.length || currentIndex >= profits.length )
        {
            return 0;
        }

        dp[currentIndex] = dp[currentIndex] || [];
        if( typeof dp[currentIndex][capacity] !== 'undefined' )
        {
            return dp[currentIndex][capacity]
        }
        // recursive call after choosing the items at the currentIndex, note that we recursive call on all
        // items as we did not increment currentIndex
        let profit1 = 0;
        if (weights[currentIndex] <= capacity) {
            profit1 =
                profits[currentIndex] +
                knapsackRecursive(profits, weights, capacity - weights[currentIndex], currentIndex);
        }

        // recursive call after excluding the element at the currentIndex
        const profit2 = knapsackRecursive(profits, weights, capacity, currentIndex + 1);

        dp[currentIndex][capacity] = Math.max(profit1, profit2);

        return dp[currentIndex][capacity]
    }

    return knapsackRecursive(profits, weights, capacity, 0);
};

var profits = [15, 50, 60, 90, 23, 100];
var weights = [1, 3, 4, 5, 2, 6];

// const performance = require('perf_hooks').performance;
// var start = performance.now();
// console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 17)}`);
// console.log( performance.now() - start )
// start = performance.now();
// console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 12)}`);
// console.log( performance.now() - start )



// Given a string, find all of its permutations preserving the character sequence but changing case.
const find_letter_case_string_permutations = function(str) {
    permutations = [];

    let i = 0;
    let start = "";
    while( str[i] >= '0' && str[i] <= '9' )
    {
        start += str[i];
        i++
    }

    permutate( start, str.substring(i, str.length) );

    function permutate( front, substr )
    {
        console.log( front );
        const char = substr.substring(0,1);
        if( (char >= '0' && char <= '9') === false )
        {
            const upper = char.toUpperCase();
            const lower = char.toLowerCase();
            if( substr.length > 1 )
            {
                permutate( front+upper, substr.substring(1, substr.length) );
                permutate( front+lower, substr.substring(1, substr.length) );
            }
            else
            {
                permutations.push( front+upper );
                permutations.push( front+lower );
            }
        }
        else // not a letter
        {
            if( substr.length > 1 )
            {
                permutate( front + char, substr.substring( 1, substr.length ) );
            }
            else
            {
                permutations.push( front+char )
            }
        }
    }

    return permutations;
};


//console.log(`String permutations are: ${find_letter_case_string_permutations("ad52")}`)
//console.log(`String permutations are: ${find_letter_case_string_permutations("ab7c")}`)

// There are ‘N’ tasks, labeled from ‘0’ to ‘N-1’. Each task can have some prerequisite tasks which need to be completed
// before it can be scheduled. Given the number of tasks and a list of prerequisite pairs, write a method to find the
// ordering of tasks we should pick to finish all tasks.
const find_order = function(tasks, prerequisites) {
    sortedOrder = [];
    const edgeCountList = Array(tasks).fill(0); // count of incoming edges
    //const graph = Array(tasks).fill(0).map(() => Array()) // adjacency list graph
    const graph = Array.from(Array(tasks), () => []);

    // build a graph
    // track how many prerequisites each task has
    prerequisites.forEach( (prereq) =>
    {
        const [parent, child] = prereq;
        edgeCountList[child] += 1;
        graph[parent].push(child)
    });

    console.log(graph);
    // find all tasks that have no prerequisites, perform them, check for tasks we can perform
    const sources = [];
    edgeCountList.forEach( (edgeCount, index) =>
    {
        if( edgeCount == 0 )
        {
            sources.push(index)
        }
    });

    while( sources.length > 0 )
    {

        const project = sources.shift();
        sortedOrder.push(project);
        graph[project].forEach( child =>
        {
            edgeCountList[child] -= 1;
            if( edgeCountList[child] == 0 )
            {
                sources.push(child)
            }
        })
    }

    // report if completion was not possible or possible task order
    if( sortedOrder.length === tasks )
    {
        return sortedOrder
    }
    else
    {
        return "Not possible, cyclic requirements"
    }
};


// console.log(`Is scheduling possible: ${find_order(3, [[0, 1], [1, 2]])}`);
// console.log(`Is scheduling possible: ${find_order(3, [[0, 1], [1, 2], [2, 0]])}`);
// console.log(`Is scheduling possible: ${find_order(6, [[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]])}`);
