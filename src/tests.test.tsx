import { render, screen } from '@testing-library/react';
import Loader from './components/Loader';
import '@testing-library/jest-dom';
import ErrorPage from './components/ErrorPage';
import { BrowserRouter } from 'react-router-dom';

describe('emptyTest', () => {
  it('tests is worling', () => {
    expect('true').toEqual('true');
  });
});

describe('Loader Component', () => {
  it('renders loading text', () => {
    render(<Loader />);
    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
  });

  it('renders loading image', () => {
    render(<Loader />);
    const loadingImage = screen.getByAltText(/loading/i);
    expect(loadingImage).toBeInTheDocument();
  });

  it('has the correct class names', () => {
    render(<Loader />);
    const loadingDiv = screen.getByTestId('loading-animation');
    expect(loadingDiv).toHaveClass('loading-animation');
  });
});

describe('ErrorPage Component', () => {
  it('renders Page not found text', () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );
    const loadingText = screen.getByText(/Page not found/i);
    expect(loadingText).toBeInTheDocument();
  });

  it('renders Error 404 text', () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );
    const loadingText = screen.getByText(/Error 404/i);
    expect(loadingText).toBeInTheDocument();
  });

  it('has the correct class names', () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );
    const loadingDiv = screen.getByTestId('Error__page');
    expect(loadingDiv).toHaveClass('Error__page');
  });

  it('renders Link component', () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );
    const linkElement = screen.getByRole('link', { name: /Main Page/i });
    expect(linkElement).toBeInTheDocument();
  });
});
