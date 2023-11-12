
import { AppProvider } from './AppContext';
import BodyResults from './BodyResults';
import ErrorBoundry from './ErrorBoundry';
import HeadSearch from './HeadSearch';

const MainPage = () => {
  return (
    <main>
      <AppProvider>
        <HeadSearch />
        <ErrorBoundry>
          <BodyResults />
        </ErrorBoundry>
      </AppProvider>
    </main>
  );
};

export default MainPage;
