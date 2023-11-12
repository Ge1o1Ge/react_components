import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';

const HeadSearch = () => {
  const { dispatch } = useContext(AppContext);

  const [searchBox, setSearchBox] = useState(
    localStorage.getItem('searchUrl') || ''
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search');

  const performSearch = (searchQuery: string) => {
    dispatch({ type: "SetSucsess", payload: true });
    dispatch({ type: "SetSearchValue", payload: searchQuery });
    localStorage.setItem('searchUrl', searchQuery)
  };

  const handleSearch = () => {
    setSearchParams({search: searchBox})
  };

  useEffect(() => {
    setSearchBox(query || '');
  }, [query]);

  return (
    <header className="header section">
      <h1 className="header__title">React components - SW Planets</h1>
      <form className="header__form">
        <input
          type="text"
          placeholder="Search"
          className="header__input"
          value={searchBox}
          onChange={(ev) => {
            setSearchBox(ev.target.value || '');
          }}
        />
        <button
          className="header__btn"
          type="submit"
          onClick={(ev) => {
            ev.preventDefault();
            handleSearch();
            performSearch(searchBox);
          }}
        >
          Find
        </button>

        <button
          className="header__btn header__btn_error"
          type="submit"
          onClick={(ev) => {
            ev.preventDefault();
            performSearch('ErrorCatch');
          }}
        >
          Get Error
        </button>
      </form>
    </header>
  );
};

export default HeadSearch;
