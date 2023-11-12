import { useContext, useEffect, useRef, useState } from 'react';
import ReqvestApi from './RequestApi';
import { Planet } from '../types';
import PlanetCard from './PlanetCards';
import Loader from './Loader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PlanetDetails from './PlanetDetails';
import { AppContext } from './AppContext';

const BodyResults = () => {
  const { state, dispatch } = useContext(AppContext);
  const { data, searchQuery, mounted, page, loading, sucsess, pageError } =
    state;
  // const pageParams = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageURL = searchParams.get('page');
  const query = searchParams.get('search');
  const planet = searchParams.get('planet');

  const fetching = useRef<boolean>(false);

  const [clickedPlanet, setClicked] = useState<number>(-1);

  const navigate = useNavigate();

  const next = data?.next;
  const prev = data?.previous;

  const handlePageChange = (inc: number) => {
    const newPage = page + inc;
    setSearchParams({ page: newPage.toString(), query: query || '', planet: planet || ''});
    dispatch({ type: 'SetPage', payload: newPage });
  };

  useEffect(() => {
    if (fetching.current) {
      return;
    }
    fetching.current = true;
    dispatch({ type: 'SetSucsess', payload: true });
    dispatch({ type: 'SetLoading', payload: true });
    dispatch({ type: 'SetMounted', payload: true });
    async function loadData() {
      try {
        const response = await ReqvestApi.getResponse(searchQuery, page);
        dispatch({ type: 'SetItemList', payload: response || null });
      } catch (error) {
        dispatch({ type: 'SetSucsess', payload: false });
        dispatch({ type: 'SetPageError', payload: error as Error });
      } finally {
        dispatch({ type: 'SetLoading', payload: false });
        fetching.current = false;
      }
    }

    loadData();
  }, [dispatch, mounted, page, searchQuery]);

  useEffect(() => {
    dispatch({ type: 'SetSucsess', payload: true });
    dispatch({ type: 'SetItemList', payload: null });
    dispatch({ type: 'SetPage', payload: 1 });
  }, [dispatch, searchQuery]);

  useEffect(() => {
    dispatch({ type: 'SetPage', payload: Number(pageURL) || 1 });
    dispatch({ type: 'SetSearchValue', payload: query || '' });
    if (Number(planet) >= 0 && planet !== null) {
      setClicked(Number(planet));
    } else {
      setClicked(-1);
    }
    localStorage.setItem('searchUrl', query || '');
  }, [pageURL, query, planet, dispatch]);

  useEffect(() => {
    if (!sucsess) {
      throw pageError;
    }
  }, [pageError, sucsess]);

  const handleCardClick = (index: number) => {
    setClicked(index);
  };

  return (
    <main className="results section">
      <section
        className={clickedPlanet >= 0 ? 'detailed' : 'results__splitter'}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="planets">
            {data?.results?.map((item, index) => (
              <PlanetCard
                clickedPlanet={clickedPlanet}
                onClick={handleCardClick}
                key={item.name}
                index={index}
                {...item}
              />
            ))}
          </div>
        )}

        {clickedPlanet >= 0 && (
          <div
            className="hover"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                navigate(
                  `${
                    (window.location.pathname + window.location.search).split(
                      'planet='
                    )[0]
                  }`
                );
                setClicked(-1);
              }
            }}
          >
            <PlanetDetails
              onClick={handleCardClick}
              {...(data?.results[clickedPlanet] as Planet)}
            />
          </div>
        )}
      </section>

      <div className="buttons">
        <button
          className={`${prev ? '' : 'disabled'} button`}
          onClick={() => {
            if (prev) {
              handlePageChange(-1);
            }
          }}
        >{`<`}</button>
        <p className="disabled button">{page}</p>
        <button
          className={`${next ? '' : 'disabled'} button`}
          onClick={() => {
            if (next) {
              handlePageChange(1);
            }
          }}
        >{`>`}</button>
      </div>
    </main>
  );
};

export default BodyResults;
