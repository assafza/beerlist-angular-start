app.factory('beersService', function(){
var beerList = [
  {name : "beerExample", style : "cool Style", abv : "12%", image : "http://i138.photobucket.com/albums/q248/mattsniz/Islamorada%202009/Coronas.jpg"},
  {name : "beerExample", style : "cool Style", abv : "12%", image : "http://i138.photobucket.com/albums/q248/mattsniz/Islamorada%202009/Coronas.jpg"}
];
  return {
    beerList : beerList
  };
});
