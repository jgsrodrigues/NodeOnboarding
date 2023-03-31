import { Card, CardMedia, CardContent, Typography, Accordion, AccordionDetails, AccordionSummary, Button, CardActions } from "@mui/material"
import React from "react";
import { Link } from "react-router-dom"
import { Movie, Person, TVShow } from "../services/TMDB"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PersonBox = ({ person }: { person: Person }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const movies = person.known_for.filter(item => item.media_type === 'movie') as Movie[];
  const tvShows = person.known_for.filter(item => item.media_type === 'tv') as TVShow[];

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/details/${person.id}`}>
        <CardMedia
          sx={{ height: 140 }}
          image={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
          title={person.name}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {person.name}
        </Typography>
        <Accordion expanded={expanded === 'moviesAccordion'} onChange={handleChange('moviesAccordion')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="moviesAccordion-content"
            id="moviesAccordion-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Movies
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {movies.map(movie => <li>{movie.title}</li>)}
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'tvShowsAccordion'} onChange={handleChange('tvShowsAccordion')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="tvShowsAccordion-content"
            id="tvShowsAccordion-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              TV Shows
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {tvShows.map(show => <li>{show.name}</li>)}
            </ul>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default PersonBox;
