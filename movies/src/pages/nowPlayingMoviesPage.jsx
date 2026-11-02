
import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const NowPlayingMoviesPage = (props) => {
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['nowPlaying'],
    queryFn: getNowPlayingMovies,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data;

  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  return (
    <PageTemplate
      title='Now Playing Movies'
      movies={movies}
      action={(movie) => {
        return <AddToWatchListIcon movie={movie} />;
      }}
    />
  );
};

export default NowPlayingMoviesPage;
