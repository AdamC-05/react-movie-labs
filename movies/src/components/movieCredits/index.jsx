import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { getMovieCredits } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'

const MovieCredits = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['credits', { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast;

  return (
    <>
      <Typography variant="h5" component="h3">
        Movie Cast
      </Typography>

      <Grid container>
        {cast.slice(0, 10).map((actor) => ( // selects the first 10 entries without changing the original array
          <Grid key={actor.id} size={{xs: 12, sm: 6, md: 4}} sx={{padding: "20px"}}>
            {actor.profile_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                    alt={actor.name}
                />
            )}
            <Typography variant="h6">
              {actor.name}
            </Typography>
            <Typography>
              Character: {actor.character}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MovieCredits;
