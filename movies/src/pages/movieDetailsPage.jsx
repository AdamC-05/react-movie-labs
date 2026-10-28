import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
//import useMovie from "../hooks/useMovie";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import { getMovieRecommendations } from '../api/tmdb-api';
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";
import MovieRecommendations from "../components/movieRecommendations";
import MovieCredits from "../components/movieCredits";


const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })
  const { data: recommendations, error: recommendationsError, isPending: recommendationsPending,isError: recommendationsIsError } = useQuery({
    queryKey: ['recommendations', { id: id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <MovieCredits movie={movie} />
            <MovieRecommendations movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
