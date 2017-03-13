var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Generate new Schema object
var beerSchema = new Schema({
  name: String,
  abv: Number,
  style: String,
  image : String,
  rating : {
    counter : Number,
    totalRanking : Number
  }
});

//creating a model of a schema object personSchema
var Beer = mongoose.model('Beer', beerSchema);
//in order to user Beer model in other files we need to export this
module.exports = Beer;
