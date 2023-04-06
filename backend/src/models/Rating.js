const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  rating: Number,
  ID: Number, // Movie ID or TV Show ID
  type: String,
  isFavourite: Boolean,
});

const RatingModel = mongoose.model('rating', RatingSchema);

module.exports = RatingModel;
