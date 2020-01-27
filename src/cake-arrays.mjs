export function countPathsFromDenominationsBott( coins, total )
{
  // if( total < 1 || coins.length < 1 ){
  //   return 0
  // }
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

  console.log( dpMap );

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
