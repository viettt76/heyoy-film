import { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';
import Popper from './Popper';
import styles from './AddMovie.module.scss';

export const AddMovieContext = createContext();

const addMenu = ['Add New Movie', 'Add New TV Show'];

function AddMovie({ userCurrent }) {
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(true);
    };

    return (
        <AddMovieContext.Provider value={[show, setShow]}>
            {userCurrent ? (
                <div>
                    <Popper options data={addMenu}>
                        <Button text>
                            <FontAwesomeIcon className={clsx(styles.addIcon)} icon={faPlus} onClick={handleClick} />
                        </Button>
                    </Popper>
                </div>
            ) : (
                <div>
                    <Popper addMessage data={[`Can't find a movie or TV show? Login to create it.`]}>
                        <Button text>
                            <FontAwesomeIcon className={clsx(styles.addIcon)} icon={faPlus} onClick={handleClick} />
                        </Button>
                    </Popper>
                </div>
            )}
        </AddMovieContext.Provider>
    );
}

AddMovie.propTypes = {
    userCurrent: PropTypes.bool.isRequired,
};

export default AddMovie;
