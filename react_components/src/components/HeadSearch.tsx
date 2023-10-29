import { setItemWithEvent } from './LocalStorageListener';

const HeadSearch = () => {
  let searchBox = localStorage.getItem('searchUrl') || '';

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
            searchBox = ev.target.value || '';
          }}
        />
        <button
          className="header__btn"
          type="submit"
          onClick={(ev) => {
            ev.preventDefault();
            console.log(`pressed search = ${searchBox}`);
            setItemWithEvent('searchUrl', searchBox);
          }}
        >
          Find
        </button>
      </form>
    </header>
  );
};

export default HeadSearch;
