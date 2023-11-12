const Loader = () => {
  return (
    <div className="loading-animation" data-testid="loading-animation">
      <img className="loading-animation__img" src="h2ff.gif" alt="loading" />
      <p className="loading-animation__text">loading...</p>
    </div>
  );
};

export default Loader;
