import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import './App.css';

import ErrorPage from './components/ErrorPage';
import MainPage from './components/mainPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/planets/*" element={<MainPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
