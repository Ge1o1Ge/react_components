import BodyResults from './BodyResults';
import ErrorBoundry from './ErrorBoundry';
import HeadSearch from './HeadSearch';

const MainPage = () => {
  return (
    <main>
      <HeadSearch />
      <ErrorBoundry>
        <BodyResults />
      </ErrorBoundry>
    </main>
  );
};

export default MainPage;
