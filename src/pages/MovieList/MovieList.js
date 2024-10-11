import { Route, Routes } from 'react-router-dom';
import MovieListLayout from '~/layouts/MovieListLayout';
import { paths } from '~/utils/constant';

const MovieList = () => {
    return (
        <Routes>
            <Route path={paths.MOVIES_POPULAR} element={<MovieListLayout />} />
            <Route path={paths.MOVIES_NOW_PLAYING} element={<MovieListLayout />} />
            <Route path={paths.MOVIES_UPCOMING} element={<MovieListLayout />} />
            <Route path={paths.MOVIES_TOP_RATED} element={<MovieListLayout />} />
            <Route path={paths.MOVIE_LIST_BY_GENRES} element={<MovieListLayout />} />
        </Routes>
    );
};

export default MovieList;
