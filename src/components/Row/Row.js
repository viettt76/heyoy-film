import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import styles from './Row.module.scss';
import Movie from '~/components/Movie';
import { getMovieByGenres } from '~/services/movieServices';

function Row({ title, id }) {
  const [listMovies, setListMovies] = useState([]);
  const [numberMoviesInSlide, setNumberMoviesInSlide] = useState(7);

  const isMobile = useMediaQuery({ maxWidth: 739 });
  const isTablet = useMediaQuery({ minWidth: 740, maxWidth: 1023 });

  useEffect(() => {
    if (isMobile) {
      setNumberMoviesInSlide(3);
    } else if (isTablet) {
      setNumberMoviesInSlide(5);
    } else {
      setNumberMoviesInSlide(7);
    }
  }, [isMobile, isTablet]);

  useEffect(() => {
    const fetchMovieByGenres = async () => {
      try {
        const res = await getMovieByGenres(id);
        setListMovies(res?.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieByGenres();
  }, [id]);

  const numberOfSlides = Math.ceil(listMovies?.length / numberMoviesInSlide);

  const slides = [];
  for (let i = 0; i < numberOfSlides; i++) {
    const startIdx = i * numberMoviesInSlide;

    // Nếu muốn hiển thị 1 nửa video đầu tiên ở slide movie tiếp theo thì
    // set endIdx = startIdx + 8 và set CSS
    const endIdx = startIdx + numberMoviesInSlide;
    const moviesInSlide = listMovies.slice(startIdx, endIdx);

    slides.push(
      <Carousel.Item key={`slide-${i}`}>
        <div className={clsx(styles.rowPoster)}>
          {moviesInSlide.map((movie, index) => {
            return (
              <Movie
                key={`movie-${index}`}
                movieInfo={movie}
                indexMovieInSlide={index}
                numberMoviesInSlide={numberMoviesInSlide}
              />
            );
          })}
        </div>
      </Carousel.Item>
    );
  }

  return (
    <div className={clsx(styles.row)}>
      <div className='d-flex justify-content-between align-items-center'>
        <h4 className={clsx(styles.rowTitle)}>{title}</h4>
        <Link
          to={`/movie/list/genres/${id}&page/1`}
          state={{ title }}
          className={clsx('btn btn-primary', styles['btn-see-all'])}
        >
          Xem tất cả
        </Link>
      </div>
      <Carousel interval={null}>{slides}</Carousel>
    </div>
  );
}

Row.propTypes = {
  title: PropTypes.string.isRequired,
  genres: PropTypes.string,
};

export default Row;
