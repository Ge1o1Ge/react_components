const PlanetCard = ({
  index,
  name,
  climate,
  diameter,
  gravity,
  terrain,
  rotation_period,
  orbital_period,
}: {
  index: number;
  name: string;
  climate: string;
  diameter: string;
  gravity: string;
  terrain: string;
  rotation_period: string;
  orbital_period: string;
}) => {
  return (
    <div className={`${index.toString()} planet__card`}>
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
    </div>
  );
};

export default PlanetCard;
