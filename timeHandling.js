class Time
{
  convertTo24 (s)
  {
    let hour = parseInt( s.substring(0,2) )

    if( s[s.length-2] === 'A' )
    { // AM
      if( hour !== 12 )
      {
        return s.substring(0,s.length-2)
      }
      else
      {
        return '00' + s.substring(2,s.length-2)
      }

    }
    else
    { // PM
      if( hour !== 12 )
      {
        hour += 12
      }

      return hour + s.substring(2,s.length-2)
    }
  }
};

module.exports = Time;