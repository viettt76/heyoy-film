import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Accordion, Dropdown } from 'react-bootstrap';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import clsx from 'clsx';
import styles from './MovieListLayout.module.scss';
import Header from '~/layouts/components/Header';
import Movie from '~/components/Movie';
import {
  getMovieByGenres,
  moviesNowPlayingService,
  moviesPopularService,
  moviesTopRatedService,
  moviesUpcomingService,
} from '~/services/movieServices';

const sorts = [
  { name: 'Popularity Descending', sortField: 'popularity', sortBy: 'desc' },
  { name: 'Popularity Ascending', sortField: 'popularity', sortBy: 'asc' },
  { name: 'Rating Descending', sortField: 'vote_average', sortBy: 'desc' },
  { name: 'Rating Ascending', sortField: 'vote_average', sortBy: 'asc' },
];

function MovieListLayout() {
  const navigate = useNavigate();
  const { genresId, genres, page } = useParams();
  const location = useLocation();
  const { title } = location.state;

  const [listMovies, setListMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [sortListMovies, setSortListMovies] = useState('Popularity Descending');

  useEffect(() => {
    if (genresId && genres) {
      const fetchMovieByGenres = async () => {
        try {
          const res = await getMovieByGenres(genresId, page);
          if (res?.results?.length > 0) {
            setListMovies(res?.results);
          } else {
            navigate(-1);
          }
          if (res?.total_pages < 500) {
            setTotalPage(res?.total_pages);
          } else {
            setTotalPage(500);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchMovieByGenres();
    } else {
      const fetchApiMoviesPopular = async () => {
        try {
          let res;
          switch (title) {
            case 'Popular Movies':
              res = await moviesPopularService(page);
              break;
            case 'Now Playing Movies':
              res = await moviesNowPlayingService(page);
              break;
            case 'Upcoming Movies':
              res = await moviesUpcomingService(page);
              break;
            case 'Top Rated Movies':
              res = await moviesTopRatedService(page);
              break;
            default:
              res = await moviesPopularService(page);
          }
          if (res?.results?.length > 0) {
            setListMovies(res?.results);
          } else {
            navigate(-1);
          }
          if (res?.total_pages < 500) {
            setTotalPage(res?.total_pages);
          } else {
            setTotalPage(500);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchApiMoviesPopular();
    }
  }, [page, title, genres, genresId, navigate]);

  const handleSort = (sort) => {
    setSortListMovies(sort.name);
    let cloneListMovies = _.cloneDeep(listMovies);
    cloneListMovies = _.orderBy(cloneListMovies, sort.sortField, sort.sortBy);
    setListMovies(cloneListMovies);
  };

  const handlePageClick = (e) => {
    if (genres && genresId) {
      navigate(`/movie/list/genres/${genresId}&page/${e.selected + 1}`, {
        state: { title },
      });
    } else {
      navigate(`/movie/popular/page/${e.selected + 1}`, { state: { title } });
    }
  };

  return (
    <div>
      <Header />
      <div className={clsx(styles.wrapper)}>
        <h3 className={clsx(styles['title'])}>{title}</h3>
        <div className={clsx(styles.sidebar, 'col-sm-2')}>
          <Accordion className={clsx(styles.selects)}>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Sort Results By</Accordion.Header>
              <Accordion.Body>
                <Dropdown>
                  <Dropdown.Toggle
                    className={clsx(styles['dropdown-toggle'])}
                    variant='secondary'
                    id='dropdown-basic'
                  >
                    {sortListMovies}
                    <Dropdown.Menu>
                      {sorts.map((sort, index) => {
                        return (
                          <Dropdown.Item
                            key={`sort-${index}`}
                            onClick={() => handleSort(sort)}
                          >
                            {sort.name}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown.Toggle>
                </Dropdown>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className={clsx(styles.listMovies)}>
          {listMovies.map((movie, index) => {
            return (
              <div key={`movie-${index}`} className={clsx(styles.movie)}>
                <Movie movieInfo={movie} />
              </div>
            );
          })}
        </div>
        <ReactPaginate
          className={clsx(
            'd-flex justify-content-center pagination fz-16',
            styles['page-wrapper']
          )}
          breakLabel='...'
          nextLabel='next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={totalPage}
          previousLabel='< previous'
          marginPagesDisplayed={3}
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
        />
      </div>
    </div>
  );
}

export default MovieListLayout;
