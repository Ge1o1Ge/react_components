import { Form } from 'react-router-dom';
import { setItemWithEvent } from './LocalStorageListener';

const HeadSearch = () => {
  let searchBox = localStorage.getItem('searchUrl') || '';

  return (
    <header className="header section">
      <h1 className="header__title">React components - SW Planets</h1>
      <Form className="header__form">
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
      </Form>
    </header>
  );
};

export default HeadSearch;
