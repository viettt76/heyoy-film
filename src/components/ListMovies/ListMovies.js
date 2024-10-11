import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import Movie from '~/components/Movie';
import styles from './ListMovies.module.scss';
import { searchService } from '~/services/searchService';

function ListMovies({ keyword }) {
  const { currentPage } = useParams();
  const navigate = useNavigate();

  const [listMovies, setListMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    window.scrollTo = (0, 0);

    document.getElementById('root').scrollIntoView();
  });

  useEffect(() => {
    const fetchQuerySearch = async () => {
      try {
        const res = await searchService(keyword, currentPage);
        if (res?.results?.length > 0) {
          const results = res?.results?.filter((value) => {
            return value?.poster_path;
          });
          setListMovies(results);
        } else {
          setListMovies([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuerySearch();
  }, [keyword, currentPage]);

  useEffect(() => {
    const fetchQuerySearch = async () => {
      try {
        const res = await searchService(keyword);
        setPageCount(res?.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuerySearch();
  }, [keyword]);

  const numberMoviesInSlide = 7;

  const numberOfSlides = Math.ceil(listMovies?.length / numberMoviesInSlide);

  const slides = [];
  for (let i = 0; i < numberOfSlides; i++) {
    const startIdx = i * numberMoviesInSlide;

    // Nếu muốn hiển thị 1 nửa video đầu tiên ở slide movie tiếp theo thì
    // set endIdx = startIdx + 8 và set CSS
    const endIdx = startIdx + numberMoviesInSlide;
    const moviesInSlide = listMovies.slice(startIdx, endIdx);

    slides.push(
      <div key={`slide-${i}`}>
        <div className={clsx(styles.poster)}>
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
      </div>
    );
  }

  const handlePageClick = (e) => {
    navigate(`/keyword/${keyword}/page/${e.selected + 1}`);
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div>{slides}</div>
      <ReactPaginate
        breakLabel='...'
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
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
        forcePage={currentPage - 1}
      />
    </div>
  );
}

export default ListMovies;
