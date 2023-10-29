import { Component } from 'react';
import ReqvestApi from './RequestApi';
import { ResponsePlanetsType, State } from '../types';
import PlanetCard from './PlanetCards';

class BodyResults extends Component<Record<string, never>, State> {
  state: State = {
    data: null,
    searchQuery: '',
    mounted: false,
    page: 1,
  };

  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      data: null,
      searchQuery: localStorage.getItem('searchUrl') || '',
      mounted: false,
      page: 1,
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
    if (dropPages) {
      await this.setState({ page: 1 });
    }
    try {
      const newSearchQuery = localStorage.getItem('searchUrl') || '';
      this.setState({ searchQuery: newSearchQuery });

      const { page } = this.state;
      const response = await ReqvestApi.getResponse(newSearchQuery, page);

      this.setState({ data: response ? response : null });
    } catch (error) {
      console.error('Ошибка при загрузке данных', error);
    }
  }

  handlePageChange = (inc: number) => {
    this.setState((prevState) => ({ page: prevState.page + inc }));
  };

  render() {
    const { data } = this.state;
    const next = data?.next;
    const prev = data?.previous;

    return (
      <main className="results section">
        <div className="planets">
          {data?.results?.map((item, index) => (
            <PlanetCard key={item.name} index={index} {...item} />
          ))}
        </div>
        <div className="buttons">
          <button
            className={`${prev ? '' : 'disabled'} button`}
            onClick={() => {
              if (prev) {
                // this.setState((prevState) => ({ count: prevState.count + 1 }));
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
