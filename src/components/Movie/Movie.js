import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import styles from './Movie.module.scss';
import MoviePopup from './MoviePopup';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';

function Movie({ movieInfo, indexMovieInSlide, numberMoviesInSlide }) {
    const navigate = useNavigate();

    const [movieId, setMovieId] = useState('');

    const handleSwitchPath = (movieId) => {
        navigate(`/watch/id/${movieId}`);
    };

    return (
        <div>
            <Tippy
                delay={[500, 0]}
                interactive
                placement="bottom"
                render={(attrs) => {
                    return (
                        <div
                            className={clsx(styles.popupMovie, {
                                [styles.firstChild]: indexMovieInSlide === 0,
                                [styles.lastChild]: indexMovieInSlide === numberMoviesInSlide - 1,
                            })}
                            tabIndex={-1}
                            {...attrs}
                        >
                            <MoviePopup movieId={movieId} movieType={movieInfo?.media_type} />
                        </div>
                    );
                }}
            >
                <Button onClick={() => handleSwitchPath(movieId)}>
                    <div className={clsx(styles.moviePoster)} onMouseEnter={() => setMovieId(movieInfo.id)}>
                        <img src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`} alt="" />
                    </div>
                </Button>
            </Tippy>
        </div>
    );
}

export default Movie;
