const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const RatingModel = require('../models/Rating');
const multer = require('multer')
const fs = require('fs')
const path = require('path')

router.get(
  '/profile',
  async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.user.email }).populate('ratings');
    if (!user) {
      res.status(401);
      res.json({
        message: 'User not found',
      });
      return
    }

    res.json({
      email: user.email,
      name: user.name,
      picture: user.picture,
      ratings: user.ratings,
    });
  }
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = path.join('uploads', req.user._id)
    fs.mkdirSync(filePath, { recursive: true })
    cb(null, filePath)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

router.post('/updateProfile', upload.single('image'), async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.user.email });
  if (!user) {
    res.json({
      message: 'User not found',
    });
    res.status(401);
    return
  }

  user.name = req.body.name || user.name;
  user.picture = req.file?.path || user.picture;

  user.save();
  res.json({
    message: 'User profile updated',
  });
  res.status(200);
});

router.post('/pictureUpdate', async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.user.email });
  if (!user) {
    res.json({
      message: 'User not found',
    });
    res.status(401);
    return
  }

  // save image

  user.picture = ''

  user.save();
  res.json({
    message: 'User picture updated',
  });
  res.status(200);
});

router.post(
  '/addFavourite',
  async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email }).populate('ratings');
    if (!user) {
      res.json({
        message: 'User not found',
      });
      res.status(401);
      return
    }

    const alreadyAFavorite = user.ratings.find(movie => movie.ID === req.body.id && movie.type === req.body.type);
    if (!alreadyAFavorite) {
      let newRatingObject = await RatingModel.create({
        ID: req.body.id,
        type: req.body.type,
        isFavourite: true,
      })
      user.ratings.push(newRatingObject);
      await user.save()
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
    const user = await UserModel.findOne({ email: req.body.email }).populate('ratings');
    if (!user) {
      res.json({
        message: 'User not found',
      });
      res.status(401);
      return
    }

    const toRemoveFavorite = user.ratings.find(movie => movie.ID === req.body.id && movie.type === req.body.type);
    if (toRemoveFavorite) {
      await RatingModel.deleteOne(toRemoveFavorite)
    }

    res.json({
      message: `Favourite ${req.body.type} removed`,
    });
    res.status(200);
  }
);

router.post(
  '/addRating',
  async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email }).populate('ratings');
    if (!user) {
      res.json({
        message: 'User not found',
      });
      res.status(401);
      return
    }

    const rating = user.ratings.find(movie => movie.ID === req.body.id && movie.type === req.body.type);
    if (rating) {
      rating.rating = req.body.rating;
      rating.save();
    } else {
      let newRatingObject = await RatingModel.create({
        ID: req.body.id,
        type: req.body.type,
        rating: req.body.rating
      })
      user.ratings.push(newRatingObject);
      await user.save();
    }

    res.json({
      message: `Rating for ${req.body.type} ${req.body.id} updated`,
    });
    res.status(200);
  }
);

module.exports = router;
