import ListMoviesLayout from '~/layouts/ListMoviesLayout';
import HeaderFooterLayout from '~/layouts/HeaderFooterLayout';

import Home from '~/pages/Home';
import Watch from '~/pages/Watch';
import Query from '~/pages/Query';
import MovieList from '~/pages/MovieList';

import { paths } from '~/utils/constant';

// Khi đăng nhập
export const publicRoutes = [
    { path: paths.HOME, component: Home },
    { path: paths.MOVIE_LISTS, component: MovieList, layout: null },
    { path: paths.WATCH_MOVIE, component: Watch, layout: HeaderFooterLayout },
    { path: paths.QUERY, component: Query, layout: ListMoviesLayout },
];

// Khi không đăng nhập
export const privateRoutes = [];
