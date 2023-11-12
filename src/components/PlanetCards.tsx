import { Link } from 'react-router-dom';

const PlanetCard = ({
  onClick,
  index,
  name,
  clickedPlanet,
}: {
  onClick: (index: number) => void;
  index: number;
  name: string;
  clickedPlanet: number;
}) => {
  const newSearch = new URLSearchParams(location.search);
  newSearch.set('planet', index.toString());

  return (
    <div
      className={`${index.toString()} ${
        clickedPlanet == index ? 'clicked' : ''
      } planet__card`}
    >
      <h3 className="planet__title">{name}</h3>

      <Link
        onClick={() => {
          onClick(index);
        }}
        className="planet__link button"
        to={{ pathname: window.location.pathname, search: newSearch.toString() }}
      >
        See Details
      </Link>
    </div>
  );
};

export default PlanetCard;
