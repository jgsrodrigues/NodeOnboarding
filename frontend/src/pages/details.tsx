import { Container, CircularProgress, Box } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import TMDBAPI from "../services/TMDB";

const MovieDetails = () => {
  let { id } = useParams();

  const { isLoading, data } = useQuery(['movieDetails', id], () => {
    if (id && id.length > 0) {
      return TMDBAPI.getMovieDetails(id);
    }
  });

  console.log(data);

  return (
    <Container>
      {isLoading ? <CircularProgress /> :
        <Box>
          <p>{data?.title}</p>
        </Box>
      }
    </Container>
  )
};

export default MovieDetails;
