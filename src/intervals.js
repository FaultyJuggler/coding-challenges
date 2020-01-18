'use strict'
const Heap = require('collections/heap');

class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  get_interval() {
    return "[" + this.start + ", " + this.end + "]";
  }
}

class IntervalHandler
{
  // Given a list of intervals representing the start and end time of ‘N’ meetings, find the minimum number of rooms required to hold all the meetings.
  minimumBuckets( intervals )
  {
    intervals.sort( (a,b) => a[0] - b[0] )
    let minBuckets = 0,
        minHeap = new Heap([], null, ((a, b) => b.end - a.end));

    intervals.forEach( (interval) =>
    {
      const nextInterval = new Interval( interval[0], interval[1] )
      while( minHeap.length > 0 && nextInterval.start >= minHeap.peek().end )
      {
        minHeap.pop()
      }
      minHeap.push( nextInterval )
      minBuckets = Math.max( minBuckets, minHeap.length )
    })

    return minBuckets
  }

  // Given an array of intervals representing ‘N’ appointments, find out if a person can attend all the appointments.
  hasNoOverlap( intervals )
  {
    intervals.sort( (a,b) => a[0] - b[0] )

    for( let i = 0; i < intervals.length-1; i++ )
    {
      if( intervals[i][1] > intervals[i+1][0] )
      {
        return false
      }
    }
    return true
  }

  //Given two lists of intervals, find the intersection of these two lists. Each list consists of disjoint intervals sorted on their start time.
  findIntersection (intervals_a, intervals_b)
  {
  const result = [];

  let aIndex = 0, bIndex = 0

  while( aIndex < intervals_a.length && bIndex < intervals_b.length )
  {
    const aStart = intervals_a[aIndex][0],
        aEnd = intervals_a[aIndex][1],
        bStart = intervals_b[bIndex][0],
        bEnd = intervals_b[bIndex][1]

    if( bStart <= aEnd && aStart <= bEnd )
    {
      result.push( [Math.max(aStart, bStart), Math.min(aEnd, bEnd)] )
      aIndex++
    }
    else if( aStart <= bEnd && bStart <= aEnd )
    {
      result.push( [Math.max(aStart, bStart), Math.min(aEnd, bEnd)] )
      bIndex++
    }

    if( aEnd < bStart )
    {
      aIndex++
    }
    else if( bEnd < aStart )
    {
      bIndex++
    }
  }

  return result;
};



// Given a list of non-overlapping intervals sorted by their start time, insert a given interval at the correct position and merge all necessary intervals to produce a list that has only mutually exclusive intervals.
  insertInterval (intervals, new_interval)
  {
    const merged = [];

    let newStart = new_interval[0]
    let newEnd = new_interval[1]

    let i = 0
    while( i < intervals.length && intervals[i][1] <= newStart )
    {
      merged.push( intervals[i] )
      i++
    }

    if( intervals[i][1] === newStart )
    {
      newStart = intervals[i][0]
    }

    while( i < intervals.length && intervals[i][0] <= newEnd )
    {
      newEnd = Math.max( newEnd, intervals[i][1] )
      i++
    }

    merged.push( [newStart, newEnd] )

    while( i < intervals.length )
    {
      merged.push( intervals[i] )
      i++
    }

    return merged;
  };

// intervals = insertInterval([[1, 3], [5, 7], [8, 12]], [4, 6]);
// result = "";
// for(i=0; i < intervals.length; i++)
//     result += "[" + intervals[i][0] + ", " + intervals[i][1] + "] ";
// console.log("Intervals after inserting the new interval: " + result);
//
// intervals = insertInterval([[1, 3], [5, 7], [8, 12]], [4, 10]);
// result = "";
// for(i=0; i < intervals.length; i++)
//     result += "[" + intervals[i][0] + ", " + intervals[i][1] + "] ";
// console.log("Intervals after inserting the new interval: " + result);
//
// intervals = insertInterval([[2, 3], [5, 7]], [1, 4]);
// result = "";
// for(i=0; i < intervals.length; i++)
//     result += "[" + intervals[i][0] + ", " + intervals[i][1] + "] ";
// console.log("Intervals after inserting the new interval: " + result);


// Given a list of intervals, mergeIntervals all the overlapping intervals to produce a list that has only mutually exclusive intervals.
  mergeIntervals (intervals)
  {
    if( intervals.length < 2 )
    {
      return intervals
    }

    intervals.sort((a, b) => a.start - b.start);

    const merged = [];

    let start = intervals[0].start,
        end = intervals[0].end;

    for (let i = 1; i < intervals.length; i++)
    {
      const interval = intervals[i];
      if (interval.start <= end)
      { // overlapping intervals, adjust the 'end'
        end = Math.max(interval.end, end);
      }
      else
      { // non-overlapping interval, add the previous interval and reset
        merged.push(new Interval(start, end));
        start = interval.start;
        end = interval.end;
      }
    }
    // add the last interval
    merged.push(new Interval(start, end));

    return merged;
  };
  //
  // merged_intervals = mergeIntervals([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]);
  // result = "";
  // for(i=0; i < merged_intervals.length; i++) {
  //     result += merged_intervals[i].get_interval() + " ";
  // }
  // console.log(`Merged intervals: ${result}`);
  //
  //
  // merged_intervals = mergeIntervals([new Interval(6, 7), new Interval(2, 4), new Interval(5, 9)]);
  // result = "";
  // for(i=0; i < merged_intervals.length; i++) {
  //     result += merged_intervals[i].get_interval() + " ";
  // }
  // console.log(`Merged intervals: ${result}`);
  //
  //
  // merged_intervals = mergeIntervals([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]);
  // result = "";
  // for(i=0; i < merged_intervals.length; i++) {
  //     result += merged_intervals[i].get_interval() + " ";
  // }
  // console.log(`Merged intervals: ${result}`);

}

module.exports = IntervalHandler;