app.factory('beersService', function(){
var beerList = [
  {name : "Corona", style : "Pale Ale", abv : "6%", image : "http://i138.photobucket.com/albums/q248/mattsniz/Islamorada%202009/Coronas.jpg", rating : {counter:3,totalRanking:13,avgRank: function(){return this.totalRanking/this.counter} }},
  {name : "Corona", style : "Pale Ale", abv : "6%", image : "http://i138.photobucket.com/albums/q248/mattsniz/Islamorada%202009/Coronas.jpg", rating : {counter:2,totalRanking:8,avgRank: function(){return this.totalRanking/this.counter} }}
];
  return {
    beerList : beerList
  };
});
