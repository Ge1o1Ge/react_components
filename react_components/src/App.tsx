import './App.css';
import BodyResults from './components/BodyResults';
import ErrorBoundry from './components/ErrorBoundry';
import HeadSearch from './components/HeadSearch';

function App() {
  return (
    <>
      <HeadSearch />
      <ErrorBoundry >
        <BodyResults />
      </ErrorBoundry>
    </>
  );
}

export default App;
