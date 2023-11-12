import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h3>Ошибка 404</h3>
      <Link to="/"> Main Page </Link>
    </div>
  );
};

export default ErrorPage;
