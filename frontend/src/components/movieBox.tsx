import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material"
import { Link } from "react-router-dom"
import { Movie } from "../services/TMDB"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useQueryClient } from "react-query";
import { AddFavourite, GetUserFavourites, RemoveFavourite } from "../lib/queryWraper";

const MovieBox = ({ movie }: { movie: Movie }) => {

  const queryClient = useQueryClient();

  const { data } = GetUserFavourites();

  const favouriteIconClicked = (movieId: number) => {
    if (data?.favoriteMovies.includes(movieId)) {
      RemoveFavourite(movieId, 'movie').then(() => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
      });
    } else {
      AddFavourite(movieId, 'movie').then(() => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
      });
    }
  }

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
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => favouriteIconClicked(movie.id)}>
          {data?.favoriteMovies.includes(movie.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
      </CardActions>
    </Card>
  )
}

export default MovieBox
