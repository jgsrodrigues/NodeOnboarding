import { Container, CircularProgress, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { GetMovieDetails } from "../lib/queryWraper";

const MovieDetails = () => {
  let { id } = useParams();

  const { isLoading, data } = GetMovieDetails(id);

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
