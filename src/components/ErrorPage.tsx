import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="Error__page" data-testid="Error__page">
      <h3 className="Error__title">Error 404</h3>
      <h5 className="Error__title">{'Page not found ('}</h5>
      <Link className="Error__link" to="/planets">
        {' '}
        Main Page{' '}
      </Link>
    </div>
  );
};

export default ErrorPage;
