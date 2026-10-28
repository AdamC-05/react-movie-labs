
import React from "react";
import { useParams } from 'react-router';
import { getActor } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ActorMovies from "../components/actorMovies";

const ActorPage = (props) => {
  const { id } = useParams();
  const { data: actor, error, isPending, isError } = useQuery({
    queryKey: ['actor', {id: id}],
    queryFn: getActor,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Grid container spacing={3} sx={{padding: "20px"}}>
      <Grid size={{xs: 12, md: 4}}>
        {actor.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
            alt={actor.name}
            style={{width: "100%"}}
          />
        )}
      </Grid>

      <Grid size={{xs: 12, md: 8}}>
        <Typography variant="h4">
          {actor.name}
        </Typography>

        <Typography variant="h6">
          Birthday: {actor.birthday}
        </Typography>

        <Typography variant="h6">
          Place of Birth: {actor.place_of_birth}
        </Typography>

        <Typography variant="h5">
          Biography
        </Typography>

        <Typography>
          {actor.biography}
        </Typography>
      </Grid>
    <Grid size={12}>
        <ActorMovies actor={actor} />
    </Grid>  
    </Grid>
  );
};

export default ActorPage;
