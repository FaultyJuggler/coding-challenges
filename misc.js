function roadsAndLibraries(n, c_lib, c_road, cities) {
  if( c_lib < c_road )
  {
    return n*c_lib
  }

  class City
  {
    constructor( n )
    {
      this.loc = n
      this.paths = {}
      this.untouched = true
    }

    dfsNeighbors(mapLink)
    {
      this.untouched = false
      let neighbors = 0

      for( const [road,built] in this.paths )
      {
        if( mapLink[road].untouched )
        {
          neighbors += mapLink[road].dfsNeighbors(mapLink)
          neighbors++
        }
        else
        {
          console.log( road+" was touched before"+this.loc )
        }
      }

      return neighbors
    }
  }// City

  const map = {}
  for( let i = 1; i<=n; i++)
  {
    map[i] = new City(i)
  }

  cities.forEach( (c) =>
  {
    const loc = c[0]
    const neighbor = c[1]

    map[loc].paths[neighbor] = false
    map[neighbor].paths[loc] = false
  })
  //console.log( map )

  let cost = 0
  for( const loc in map )
  {
    const city = map[loc]
    if( city.untouched )
    {
      const roads = city.dfsNeighbors(map)
      cost += c_lib
      cost += roads*c_road
    }
  }

  for( const loc in map )
  {
    delete map[loc]
  }

  console.log( "lib:"+lib_cost+" + road:"+road_cost )

  return cost
}