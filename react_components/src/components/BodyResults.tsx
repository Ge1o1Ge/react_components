import { Component } from 'react';
import ReqvestApi from './RequestApi';
import { ResponsePlanetsType, State } from '../types';
import PlanetCard from './PlanetCards';

class BodyResults extends Component<React.PropsWithChildren<object>, State> {
  state: State = {
    data: null,
    searchQuery: '',
    mounted: false,
    page: 1,
    loading: true,
    sucsess: true,
    pageError: undefined,
  };

  constructor(props: React.PropsWithChildren<object>) {
    super(props);

    this.state = {
      data: null,
      searchQuery: localStorage.getItem('searchUrl') || '',
      mounted: false,
      page: 1,
      loading: true,
      sucsess: true,
      pageError: undefined,
    };

    window.addEventListener('storageChanged', () => {
      if (this.state.mounted) {
        this.loadData(true);
      }
    });
  }

  componentDidMount() {
    this.setState({ mounted: true });
    this.loadData(true);
  }

  componentDidUpdate(
    _prevProps: Record<string, never>,
    prevState: {
      data: null | ResponsePlanetsType;
      searchQuery: string;
      mounted: boolean;
      page: number;
    }
  ) {
    if (this.state.page !== prevState.page) {
      this.loadData();
    }
  }

  async loadData(dropPages = false) {
    this.setState({ sucsess: true, pageError: undefined });
    if (dropPages) {
      await this.setState({ page: 1 });
    }
    try {
      this.setState({ loading: true });
      const newSearchQuery = localStorage.getItem('searchUrl') || '';
      this.setState({ searchQuery: newSearchQuery });

      const { page } = this.state;
      const response = await ReqvestApi.getResponse(newSearchQuery, page);

      this.setState({ data: response ? response : null });
    } catch (error) {
      this.setState({ sucsess: false, pageError: error as Error });
    } finally {
      this.setState({ loading: false });
    }
  }

  handlePageChange = (inc: number) => {
    this.setState((prevState) => ({ page: prevState.page + inc }));
  };

  render() {
    const { data, loading, sucsess } = this.state;
    const next = data?.next;
    const prev = data?.previous;
    if (!sucsess) {
      throw this.state.pageError;
    }

    return (
      <main className="results section">
        {loading ? (
          <div className="loading-animation">
            <img
              className="loading-animation__img"
              src="h2ff.gif"
              alt="loading"
            />
            <p className="loading-animation__text">loading...</p>
          </div>
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
                this.handlePageChange(-1);
              }
            }}
          >{`<`}</button>
          <p className="disabled button">{this.state.page}</p>
          <button
            className={`${next ? '' : 'disabled'} button`}
            onClick={() => {
              if (next) {
                this.handlePageChange(1);
              }
            }}
          >{`>`}</button>
        </div>
      </main>
    );
  }
}

export default BodyResults;
