export function mergeSortedArrays( arr1, arr2 )
{
  const mergedArray = [];
  let pt1 = 0;
  let pt2 = 0;
  let num1 = arr1[pt1];
  let num2 = arr2[pt2];

  while( pt1 < arr1.length && pt2 < arr2.length )
  {
    if( num1 < num2 )
    {
      mergedArray.push( num1 );
      pt1++;
      if( pt1 >= arr1.length )
      {
        num1 = Number.MAX_VALUE;
      }
    } else
    {
      mergedArray.push( num2 );
      pt2++;
      if( pt2 >= arr2.length )
      {
        num2 = Number.MAX_VALUE;
      }
    }

    if( pt1 < arr1.length )
    {
      num1 = arr1[pt1];
    }
    if( pt2 < arr2.length )
    {
      num2 = arr2[pt2];
    }
  }

  return mergedArray;
}

export function reverseWordsInPlace( str )
{
  let chars = reverseCharArray( str ).split( '' );
  return reverseWordLettersInPlace( chars.join( '' ) );
}

export function reverseWordLettersInPlace( str )
{
  const chars = str.split( '' );
  let firstCharOfWord = -1;

  for( let i = 0; i < str.length; i++ )
  {
    const nextChar = chars[i];
    if( nextChar !== ' ' && firstCharOfWord < 0 )
    {
      firstCharOfWord = i;
    } else if( nextChar === ' ' && firstCharOfWord > -1 )
    {
      let left = firstCharOfWord;
      let right = i - 1;
      while( left < right )
      {
        const temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
        left++;
        right--;
      }
      firstCharOfWord = -1;
    }
  }

  if( firstCharOfWord !== -1 )
  {
    let left = firstCharOfWord;
    let right = str.length - 1;
    while( left < right )
    {
      const temp = chars[left];
      chars[left] = chars[right];
      chars[right] = temp;
      left++;
      right--;
    }
    firstCharOfWord = -1;
  }

  return chars.join( '' );
}

export function reverseCharArray( str )
{
  const chars = str.split( '' );
  let leftCursor = 0;
  let rightCursor = chars.length - 1;
  let temp = '';

  while( leftCursor < rightCursor )
  {
    temp = chars[leftCursor];
    chars[leftCursor] = chars[rightCursor];
    chars[rightCursor] = temp;
    leftCursor++;
    rightCursor--;
  }

  return chars.join( '' );
}

export function countPathsFromDenominationsBott( coins, total )
{
  const types = coins.length;

  const dpMap = new Array( coins.length ).fill( 0 ).
      map( () => Array( total + 1 ).fill( 0 ) );

  for( let i = 0; i < types; i++ )
  {
    dpMap[i][0] = 1;
  }

  for( let i = 0; i < types; i++ )
  {
    for( let t = 1; t <= total; t++ )
    {
      if( i > 0 )
      {
        dpMap[i][t] = dpMap[i - 1][t];
      }
      if( coins[i] <= t )
      {
        dpMap[i][t] += dpMap[i][t - coins[i]];
      }
    }
  }

  return dpMap[types - 1][total];
}

export function countPathsFromDenominations( coins, total )
{
  const memo = [];

  function addCoinRecursive( coins, total, index )
  {
    if( total === 0 )
    {
      return 1;
    }
    if( index >= coins.length )
    {
      return 0;
    }

    memo[index] = memo[index] || [];

    if( typeof memo[index][total] === 'undefined' )
    {
      let sum1 = 0;
      if( total >= coins[index] )
      {
        sum1 = addCoinRecursive( coins, total - coins[index], index );
      }
      const sum2 = addCoinRecursive( coins, total, index + 1 );
      memo[index][total] = sum1 + sum2;
      return memo[index][total];
    } else
    {
      return memo[index][total];
    }
  }

  return addCoinRecursive( coins, total, 0 );
}

export function mergeMeetings( times )
{
  let mergedList = [];

  times.forEach( ( meeting ) =>
  {
    const start = meeting.startTime;
    const end = meeting.endTime;

    let index = 0;
    // find where our current start time belongs
    while( start > mergedList[index].startTime && index < mergedList.length )
    {
      index++;
    }

    if( index >= mergedList.length && end > mergedList[index - 1].endTime )
    {
      mergedList.push( meeting );
    }
    // do we need to create a new slot?
    if( start < mergedList[index].startTime )
    {
      mergedList.splice( index, 0, meeting );
    }
    // start matches but end does not
    else if( end > mergedList[index].endTime )
    {
      mergedList[index].endTime = end;
    }

    // remove any future ranges that end sooner
    while( end >= mergedList[index + 1].endTime )
    {
      mergedList.splice( index + 1, 1 );
    }
  } );

  return mergedList;
  // foreach item
  // 	grab start and end
  // 	check merged list
  // 		while start >= mStart AND in range
  // 			next
  //
  // 		while end > mEnd AND in range
  // 			next
  //
  // 		if mStart <= start <= mEnd
  // 			mEnd = end
  // 		else
  // 			new start
  // 			while mEnd <= end
  // 			next.delete
  // 			new end
}

export function consolidateTimeSlots( timeRanges )
{
  let timeList = [];

  timeRanges.forEach( function( tuple )
  {
    const [start, end] = tuple;

    let i = 0;
    while( i < timeList.length )
    {
      let rangeStart = timeList[i][0];
      let rangeEnd = timeList[i][1];

      if( ( start <= rangeEnd && start >= rangeStart )
          || ( end >= rangeStart && end <= rangeEnd )
          || ( rangeStart >= start && rangeStart <= end )
          || ( rangeEnd >= start && rangeEnd <= end ) )
      {
        rangeStart = Math.min( rangeStart, start );
        rangeEnd = Math.max( rangeEnd, end );
        timeList[i][0] = rangeStart;
        timeList[i][1] = rangeEnd;

        timeList = consolidateTimeSlots( timeList );
        break;
      }

      i++;
    }
    if( i >= timeList.length )
    {
      timeList.push( [start, end] );
    }
  } );

  return timeList;
}
