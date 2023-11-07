import { useEffect, useRef, useState } from 'react';
import ReqvestApi from './RequestApi';
import { ResponsePlanetsType } from '../types';
import PlanetCard from './PlanetCards';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const BodyResults = () => {
  const [data, setData] = useState<ResponsePlanetsType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem('searchUrl') || ''
  );
  const [mounted, setMounted] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(true);
  // const [ofset, setOfset] = useState<number>(10);
  const [pageError, setPageError] = useState<Error | undefined>(undefined);
  const fetching = useRef<boolean>(false);
  const navigate = useNavigate();

  const pageParams = new URLSearchParams(location.search);
  const pageURL = pageParams.get('page');
  const query = pageParams.get('search');

  useEffect(() => {
    if (fetching.current) {
      return;
    }
    fetching.current = true;
    setSuccess(true);
    setLoading(true);
    setMounted(true);
    console.log(1);
    async function loadData() {
      try {
        const response = await ReqvestApi.getResponse(searchQuery, page);
        setData(response || null);
      } catch (error) {
        setSuccess(false);
        setPageError(error as Error);
      } finally {
        setLoading(false);
        fetching.current = false;
      }
    }

    loadData();
  }, [mounted, page, searchQuery]);

  useEffect(() => {
    // setMounted(true);

    const storageChangedHandler = () => {
      const newQuery = localStorage.getItem('searchUrl') || '';

      if (newQuery !== searchQuery) {
        setSearchQuery(localStorage.getItem('searchUrl') || '');
        setPageError(undefined);
        setData(null);
        setPage(1);
      }
    };

    window.addEventListener('storageChanged', storageChangedHandler);

    return () => {
      window.removeEventListener('storageChanged', storageChangedHandler);
    };
  });

  const handlePageChange = (inc: number) => {
    const newPage = page + inc;

    const currentUrl = (
      window.location.pathname + window.location.search
    ).split('&page')[0];
    const newUrl = `${currentUrl}&page=${newPage}`;

    navigate(newUrl);

    setPage(newPage);
  };

  useEffect(() => {
    setPage(Number(pageURL) || 1);
    console.log('поиск', query);
    setSearchQuery(query || '');
    localStorage.setItem('searchUrl', query || '');
  }, [pageURL, query]);

  const next = data?.next;
  const prev = data?.previous;

  if (!success) {
    throw pageError;
  }

  return (
    <main className="results section">
      {loading ? (
        <Loader />
      ) : (
        <div className="planets">
          {data?.results?.map((item, index) => (
            <PlanetCard key={item.name} index={index} {...item} />
          ))}
        </div>
      )}

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
