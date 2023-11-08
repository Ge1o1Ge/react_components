import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import './App.css';

import MainPage from './components/mainPage';

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<MainPage />} />)
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
