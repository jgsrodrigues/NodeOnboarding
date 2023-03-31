const express = require('express');
const router = express.Router();
const UserModel = require('../models/model');

router.get(
  '/profile',
  async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.user.email });
    if (!user) {
      res.status(401);
      res.json({
        message: 'User not found',
      });
      return
    }

    res.json({
      email: user.email,
      favoriteMovies: user.favoriteMovies,
      favouriteTvShows: user.favouriteTvShows
    })
  }
);

router.post(
  '/addFavourite',
  async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.json({
        message: 'User not found',
      });
      res.status(401);
      return
    }

    if (req.body.type === 'movie') {
      const movieAlreadyAFavorite = user.favoriteMovies.find(movie => movie === req.body.id);
      if (!movieAlreadyAFavorite) {
        let newFavouritesList = user.favoriteMovies;
        newFavouritesList.push(req.body.id)
        user.favoriteMovies = newFavouritesList
        await user.save();
      }
    }
    if (req.body.type === 'show') {
      const tvShowAlreadyAFavorite = user.favouriteTvShows.find(show => show === req.body.id);
      if (!tvShowAlreadyAFavorite) {
        let newFavouritesList = user.favouriteTvShows;
        newFavouritesList.push(req.body.id);
        user.favouriteTvShows = newFavouritesList;
        await user.save();
      }
    }
    res.json({
      message: `Favourite ${req.body.type} added`,
    });
    res.status(200);
  }
);

router.post(
  '/removeFavourite',
  async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.json({
        message: 'User not found',
      });
      res.status(401);
      return
    }

    if (req.body.type === 'movie') {
      const movieToRemoveFavoriteIndex = user.favoriteMovies.findIndex(movie => movie === req.body.id);

      if (movieToRemoveFavoriteIndex > -1) {
        let newFavouritesList = user.favoriteMovies;
        newFavouritesList.splice(movieToRemoveFavoriteIndex, 1);
        user.favoriteMovies = newFavouritesList;
        await user.save();
      }
    }
    if (req.body.type === 'show') {
      const tvShowToRemoveFavoriteIndex = user.favouriteTvShows.findIndex(show => show === req.body.id);

      if (tvShowToRemoveFavoriteIndex > -1) {
        let newFavouritesList = user.favouriteTvShows;
        newFavouritesList.splice(tvShowToRemoveFavoriteIndex, 1);
        user.favouriteTvShows = newFavouritesList;
        await user.save();
      }
    }
    res.json({
      message: `Favourite ${req.body.type} removed`,
    });
    res.status(200);
  }
);

module.exports = router;
