/*
Given a set of positive numbers, find if we can partition it into two subsets such that the sum of elements in both the subsets is equal.
 */
export function equalSubsetSum(arr)
{
  let sum = 0;
  arr.forEach(function(num)
  {
    sum += num;
  });

  if (sum % 2 !== 0)
  {
    return false;
  }

  const memo = [];

  function subsetRecursive(sum, arr, currentIndex)
  {
    if (sum === 0)
    {
      return true;
    } else if (currentIndex >= arr.length)
    {
      return false;
    }

    // have we seen this before?
    memo[currentIndex] = memo[currentIndex] || [];
    if (typeof memo[currentIndex][sum] !== 'undefined')
    {
      return memo[currentIndex][sum];
    }

    // check if we can use current value
    if (arr[currentIndex] <= sum)
    {
      if (subsetRecursive(sum - arr[currentIndex], arr, currentIndex + 1))
      {
        return true;
      }
    }
    // check without current value
    memo[currentIndex][sum] = subsetRecursive(sum, arr, currentIndex + 1);
    return memo[currentIndex][sum];
  }

  // because each partition must equal half the total sum, we only need to find possibility of half the sum
  return subsetRecursive(sum / 2, arr, 0);
}

/*
0/1knapsack
Given the weights and profits of ‘N’ items, we are asked to put these items in a knapsack which has a capacity ‘C’. The goal is to get the maximum profit from the items in the knapsack. Each item can only be selected once, as we don’t have multiple quantities of any item.
 */
export function solveKnapsackMemo(capacity, profits, weights)
{
  const memo = [];

  function knapsackRecursive(profits, weights, capacity, currentIndex)
  {
    // base checks
    if (capacity <= 0 || currentIndex >= profits.length) return 0;

    // have we seen this before?
    memo[currentIndex] = memo[currentIndex] || [];
    if (typeof memo[currentIndex][capacity] !== 'undefined')
    {
      return memo[currentIndex][capacity];
    }
    // recursive call after choosing the element at the currentIndex
    // if the weight of the element at currentIndex exceeds the capacity, we shouldn't process this
    let profit1 = 0;
    if (weights[currentIndex] <= capacity) {
      profit1 =
          profits[currentIndex] +
          knapsackRecursive(profits, weights, capacity - weights[currentIndex], currentIndex + 1);
    }

    // recursive call after excluding the element at the currentIndex
    const profit2 = knapsackRecursive(profits, weights, capacity,
        currentIndex + 1);

    memo[currentIndex][capacity] = Math.max(profit1, profit2);
    return memo[currentIndex][capacity];
  }

  return knapsackRecursive(profits, weights, capacity, 0);
}

export function solveKnapsackBott(capacity, profits, weights)
{
  const n = profits.length;
  if (capacity <= 0 || n === 0 || weights.length !== n) return 0;

  const dp = Array(profits.length).
      fill(0).
      map(() => Array(capacity + 1).fill(0));

  // populate the capacity=0 columns; with '0' capacity we have '0' profit
  for (let i = 0; i < n; i++) dp[i][0] = 0;

  // if we have only one weight, we will take it if it is not more than the capacity
  for (let c = 0; c <= capacity; c++)
  {
    if (weights[0] <= c) dp[0][c] = profits[0];
  }

  // process all sub-arrays for all the capacities
  for (let i = 1; i < n; i++)
  {
    for (let c = 1; c <= capacity; c++)
    {
      let profit1 = 0,
          profit2 = 0;
      // include the item, if it is not more than the capacity
      if (weights[i] <= c) profit1 = profits[i] + dp[i - 1][c - weights[i]];
      // exclude the item
      profit2 = dp[i - 1][c];
      // take maximum
      dp[i][c] = Math.max(profit1, profit2);
    }
  }

  let selectedWeights = '';
  let totalProfit = dp[weights.length - 1][capacity];
  let remainingCapacity = capacity;
  for (let i = weights.length - 1; i > 0; i--)
  {
    if (totalProfit !== dp[i - 1][remainingCapacity])
    {
      selectedWeights = `${ weights[i] } ${ selectedWeights }`;
      remainingCapacity -= weights[i];
      totalProfit -= profits[i];
    }
  }

  if (totalProfit !==
      0) selectedWeights = `${ weights[0] } ${ selectedWeights }`;

  console.log(`Selected weights: ${ selectedWeights }`);

  // maximum profit will be at the bottom-right corner.
  return dp[n - 1][capacity];
}