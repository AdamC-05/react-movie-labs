
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import AddToWatchListIcon from "../cardIcons/addToWatchList";
import { getActorMovies } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'


const ActorMovies = ({ actor }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['actorMovies', { id: actor.id }],
    queryFn: getActorMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.cast;

  return (
    <>
      <Typography variant="h5" component="h3">
        Actor Filmography
      </Typography>

      <Grid container>
        <MovieList
          movies={movies}
          action={(movie) => {
            return <AddToWatchListIcon movie={movie} />;
          }}
        />
      </Grid>
    </>
  );
};

export default ActorMovies;
