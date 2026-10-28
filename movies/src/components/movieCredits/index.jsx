import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { getMovieCredits } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

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
      {cast.slice(0, 10).map((actor) => (
        <Grid key={actor.id} size={{xs: 12, sm: 6, md: 4}} sx={{padding: "15px"}}>
          <Card sx={{height: "100%"}}>
            {actor.profile_path && (
              <CardMedia
                sx={{height: 300}}
                image={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              />
            )}

            <CardContent>
              <Link to={`/actors/${actor.id}`}>
                <Typography variant="h6">
                  {actor.name}
                </Typography>
              </Link>

              <Typography>
                Character: {actor.character}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
);

};

export default MovieCredits;
