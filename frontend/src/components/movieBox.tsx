import { Card, CardMedia, CardContent, Typography } from "@mui/material"
import { Movie } from "../services/TMDB"

const MovieBox = ({ movie }: { movie: Movie }) =>

  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{ height: 140 }}
      image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
      title={movie.title}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {movie.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {movie.overview}
      </Typography>
    </CardContent>
  </Card>

export default MovieBox
