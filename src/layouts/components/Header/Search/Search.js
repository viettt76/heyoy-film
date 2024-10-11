import { forwardRef, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

// import search from '~/services/searchService';
// import { useDebounced } from '~/hooks';
import styles from './Search.module.scss';
import Button from '~/components/Button';
import { ClearIcon, LoadIcon } from '~/components/Icons';
import { SearchIcon as SearchIconInput } from '~/components/Icons';
import { useNavigate } from 'react-router-dom';

const SearchIcon = forwardRef(({ onClick }, ref) => {
    return (
        <div ref={ref} onClick={onClick}>
            <FontAwesomeIcon className={clsx(styles.searchIcon)} icon={faMagnifyingGlass} />
        </div>
    );
});

function Search() {
    const navigate = useNavigate();

    const inputRef = useRef(null);

    const [showWrapperSearch, setShowWrapperSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    // const [searchResult, setSearchResult] = useState([]);
    // const [loading, setLoading] = useState(false);

    // const debounceValue = useDebounced(searchValue, 500).trim();

    // useEffect(() => {
    //     setLoading(true);
    //     const fetchApi = async () => {
    //         try {
    //             setLoading(true);
    //             const res = await search(debounceValue);
    //             if (res && res.results?.length > 0) {
    //                 setSearchResult(res.results);
    //             }
    //             setLoading(false);
    //         } catch (error) {
    //             setLoading(false);
    //         }
    //     };

    //     fetchApi();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [debounceValue]);

    const handleClearInput = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleShowWrapperSearch = () => {
        setShowWrapperSearch(!showWrapperSearch);
    };

    const handleSubmit = () => {
        navigate(`/keyword/${searchValue}/page/1`);
        setShowWrapperSearch(false);
        setSearchValue('');
    };

    return (
        <div>
            {!showWrapperSearch ? (
                <SearchIcon onClick={handleShowWrapperSearch} />
            ) : (
                <div>
                    <Tippy
                        visible={showWrapperSearch}
                        interactive
                        render={(attrs) => (
                            <div className={clsx(styles.wrapper)} tabIndex="-1" {...attrs}>
                                <div className={clsx(styles.wrapperInput)}>
                                    <SearchIconInput className={clsx(styles.searchIconInput)} />
                                    <input
                                        autoFocus
                                        ref={inputRef}
                                        value={searchValue}
                                        spellCheck="false"
                                        className={clsx(styles.searchInput)}
                                        placeholder="Search for a movie, tv show, person..."
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSubmit();
                                            }
                                        }}
                                    />
                                    {searchValue && (
                                        <Button onClick={handleClearInput}>
                                            <ClearIcon className={clsx(styles.clearIcon)} />
                                        </Button>
                                    )}
                                    {searchValue && <LoadIcon className={clsx(styles.loadIcon)} />}
                                </div>
                                {/* <SearchResult data={searchResult} /> */}
                            </div>
                        )}
                        onClickOutside={() => setShowWrapperSearch(false)}
                    >
                        <Button
                            onClick={() => {
                                setShowWrapperSearch(!showWrapperSearch);
                            }}
                        >
                            <FontAwesomeIcon className={clsx(styles.closeSearch)} icon={faXmark} />
                        </Button>
                    </Tippy>
                </div>
            )}
        </div>
    );
}

SearchIcon.propTypes = {
    onClick: PropTypes.func,
};

export default Search;
