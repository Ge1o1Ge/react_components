import { useNavigate } from 'react-router-dom';
import { setItemWithEvent } from './LocalStorageListener';
import { useEffect, useState } from 'react';

const HeadSearch = () => {
  const history = useNavigate();
  const [searchBox, setSearchBox] = useState(localStorage.getItem('searchUrl') || '');
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const performSearch = (searchQuery: string) => {
    console.log(`pressed search = ${searchQuery}`);
    setItemWithEvent('searchUrl', searchQuery);
  };

  const handleSearch = () => {
    history(`/search?query=${searchBox}`);
  };

  useEffect(() => {
    setSearchBox(query || '')
    performSearch(query || '');
  }, [query]);

  return (
    <header className="header section">
      <h1 className="header__title">React components - SW Planets</h1>
      <form className="header__form">
        <input
          type="text"
          placeholder="Search"
          className="header__input"
          defaultValue={searchBox}
          onChange={(ev) => {
            setSearchBox(ev.target.value || '');
          }}
        />
        <button
          className="header__btn"
          type="submit"
          onClick={(ev) => {
            ev.preventDefault();
            handleSearch()
            performSearch(searchBox)
          }}
        >
          Find
        </button>

        <button
          className="header__btn header__btn_error"
          type="submit"
          onClick={(ev) => {
            ev.preventDefault();
            setItemWithEvent('searchUrl', 'ErrorCatch');
          }}
        >
          Get Error
        </button>
      </form>
    </header>
  );
};

export default HeadSearch;
