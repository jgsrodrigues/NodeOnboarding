import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material"
import { Link } from "react-router-dom"
import { Movie } from "../services/TMDB"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AddFavourite, useUserData, RemoveFavourite, AddRating } from "../lib/queryWraper";
import RatingDialog from "./rating";
import queryClient from "../lib/queryClient";

const MovieBox = ({ movie }: { movie: Movie }) => {

  const { data } = useUserData();

  const favouriteIconClicked = async () => {
    if (data?.ratings?.find(m => m.ID === movie.id)) {
      await RemoveFavourite(movie.id, 'movie')
    } else {
      await AddFavourite(movie.id, 'movie')
    }
    queryClient.invalidateQueries('user');
  }

  const onNewRating = (rating: number) => {
    AddRating(movie.id, 'movie', rating);
  };

  const currentUserRating = data?.ratings?.find(rating => rating.ID === movie.id && rating.type === 'movie');

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/details/${movie.id}`}>
        <CardMedia
          sx={{ height: 140 }}
          image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          title={movie.title}
        />
      </Link>
      <CardContent>
        <RatingDialog watchable={movie} onRating={onNewRating} currentRating={currentUserRating?.rating || 0} />
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={favouriteIconClicked}>
          {currentUserRating?.isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
      </CardActions>
    </Card>
  )
}

export default MovieBox
