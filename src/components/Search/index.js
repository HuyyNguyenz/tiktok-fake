import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import useDebounce from '~/hooks/useDebounce';
import * as SearchService from '~/services/searchService';

const cx = classNames.bind(styles);
function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  const debounced = useDebounce(searchValue, 600);
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);

      const result = await SearchService.search(debounced);

      setSearchResult(result);
      setLoading(false);
    };
    fetchApi();
  }, [debounced]);

  const handleSpaceText = (searchValue) => {
    setSearchValue((prev) => (prev !== '' ? searchValue : searchValue.trim()));
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    // Using a wrapper <div> or <span> tag around
    // the reference element solves this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => {
          return (
            <div className={cx('search-result')} tabIndex={-1} {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                {searchResult.map((result) => {
                  return <AccountItem key={result.id} data={result} />;
                })}
              </PopperWrapper>
            </div>
          );
        }}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search')}>
          <input
            value={searchValue}
            ref={inputRef}
            placeholder="Search accounts and videos"
            spellCheck={false}
            onChange={(e) => handleSpaceText(e.target.value)}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <SearchIcon width="2.4rem" height="2.4rem" className="search-icon" />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
