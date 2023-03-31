import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material"
import { Link } from "react-router-dom"
import { TVShow } from "../services/TMDB"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const TVShowBox = ({ show }: { show: TVShow }) => {
  
  const favouriteIconClicked = () => {

  }

  return (
  <Card sx={{ maxWidth: 345 }}>
    <Link to={`/details/${show.id}`}>
      <CardMedia
        sx={{ height: 140 }}
        image={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
        title={show.name}
      />
    </Link>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {show.name}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={favouriteIconClicked}><FavoriteBorderIcon /></Button>
    </CardActions>
  </Card>
  )
}

export default TVShowBox;
