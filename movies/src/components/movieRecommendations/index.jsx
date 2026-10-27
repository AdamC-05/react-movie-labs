
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import AddToWatchListIcon from "../cardIcons/addToWatchList";
import { getMovieRecommendations } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'


const MovieRecommendations = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['recommendations', { id: movie.id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const recommendations = data.results;

  return (
    <>
      <Typography variant="h5" component="h3">
        Recommended Movies
      </Typography>

      <Grid container>
        <MovieList
          movies={recommendations}
          action={(movie) => {
            return <AddToWatchListIcon movie={movie} />;
          }}
        />
      </Grid>
    </>
  );
};

export default MovieRecommendations;
