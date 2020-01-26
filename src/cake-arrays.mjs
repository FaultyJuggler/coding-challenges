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
