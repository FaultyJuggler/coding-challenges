/*
0/1knapsack
Given the weights and profits of ‘N’ items, we are asked to put these items in a knapsack which has a capacity ‘C’. The goal is to get the maximum profit from the items in the knapsack. Each item can only be selected once, as we don’t have multiple quantities of any item.
 */

export function solveKnapsack(capacity, profits, weights)
{
  const memo = []
  function knapsackRecursive(profits, weights, capacity, currentIndex) {
    // base checks
    if (capacity <= 0 || currentIndex >= profits.length) return 0;

    // have we seen this before?
    memo[currentIndex] = memo[currentIndex] || [];
    if (typeof memo[currentIndex][capacity] !== 'undefined') {
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
    const profit2 = knapsackRecursive(profits, weights, capacity, currentIndex + 1);

    memo[currentIndex][capacity] = Math.max(profit1, profit2);
    return memo[currentIndex][capacity];
  }

  return knapsackRecursive(profits, weights, capacity, 0);
}