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
        to={`${
          (window.location.pathname + window.location.search).split(
            '&planet='
          )[0]
        }&planet=${index}`}
      >
        See Details
      </Link>
    </div>
  );
};

export default PlanetCard;
