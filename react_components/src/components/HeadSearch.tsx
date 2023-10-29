const HeadSearch = () => {
  let searchBox = localStorage.getItem('searchUrl') || '';

  return (
    <header className="header section">
      <form className="header__form">
        <h1 className="header__title">React components</h1>
        <input
          type="text"
          placeholder="Search"
          className="header__input"
          defaultValue={searchBox}
          onChange={(ev) => {
            searchBox = ev.target.value || "";
          }}
        />
        <button
          className="header__btn"
          type="submit"
          onClick={(ev) => {
            ev.preventDefault();
            console.log(`pressed search = ${searchBox}`);
            localStorage.setItem('searchUrl', searchBox);
          }}
        >
          Find
        </button>
      </form>
    </header>
  );
};

export default HeadSearch;
