import { Link } from 'react-router-dom';

const PlanetDetails = ({
  onClick,
  name,
  climate,
  diameter,
  gravity,
  terrain,
  rotation_period,
  orbital_period,
}: {
  onClick: (index: number) => void;
  name: string;
  climate: string;
  diameter: string;
  gravity: string;
  terrain: string;
  rotation_period: string;
  orbital_period: string;
}) => {
  // const parts = url.split("/");
  // const urlNum = Number(parts[parts.indexOf("planets") + 1]);;

  return (
    <div className="planet__details" data-testid="planet__details">
      <h3 className="planet__title">{name}</h3>
      <div className="planet__size">
        <p className="planet__text">diameter: {diameter} km</p>
        <p className="planet__text">gravity: {gravity}</p>
      </div>
      <div className="planet__climate">
        <p className="planet__text">terrain: {terrain}</p>
        <p className="planet__text">climate: {climate}</p>
      </div>
      <div className="planet__time">
        <p className="planet__text">day: {rotation_period}h</p>
        <p className="planet__text">year: {orbital_period} ED</p>
      </div>
      <Link
        onClick={() => {
          onClick(-1);
        }}
        className="close__buton button"
        to={`${
          (window.location.pathname + window.location.search).split(
            '&planet='
          )[0]
        }`}
      >
        X
      </Link>
    </div>
  );
};

export default PlanetDetails;
