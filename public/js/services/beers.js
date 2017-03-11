app.factory('beersService', function(){
var beerList = [
  {name : "Corona", style : "Pale Ale", abv : "6%", image : "http://i138.photobucket.com/albums/q248/mattsniz/Islamorada%202009/Coronas.jpg", rating : {counter:3,totalRanking:13, avg : 0}},
  {name : "Corona", style : "Pale Ale", abv : "6%", image : "http://i138.photobucket.com/albums/q248/mattsniz/Islamorada%202009/Coronas.jpg", rating : {counter:2,totalRanking:8, avg: 0}}
];
var deleteBeer = function(beerIndex){
  beerList.splice(beerIndex,1);
}

var addBeer = function(beer){
  beerList.push(beer);
};

  return {
    beerList : beerList,
    deleteBeer : deleteBeer,
    addBeer : addBeer
  };
});
