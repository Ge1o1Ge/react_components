import { Component } from 'react';
import ReqvestApi from './RequestApi';
import { ResponsePlanetsType } from '../types';

const PlanetCard = ({ index, name }: { index: number; name: string }) => {
  return <div className={index.toString()}>{name}</div>;
};

class BodyResults extends Component {
  data: null | ResponsePlanetsType = null;
  state: { data: null | ResponsePlanetsType } = {
    data: null,
  };

  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      data: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await ReqvestApi.getResponse();
      this.setState({ data: response });
    } catch (error) {
      console.error('Ошибка при загрузке данных', error);
    }
  }

  render() {
    const { data } = this.state;

    return (
      <main className="results section">
        {data?.results?.map((item, index) => (
          <PlanetCard key={item.name} index={index} {...item} />
        ))}
      </main>
    );
  }
}

export default BodyResults;
