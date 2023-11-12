import { act, fireEvent, render, screen } from '@testing-library/react';
import Loader from './components/Loader';
import '@testing-library/jest-dom';
import ErrorPage from './components/ErrorPage';
import { BrowserRouter } from 'react-router-dom';
import PlanetDetails from './components/PlanetDetails';

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

  it('changes the route when Link is clicked', () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole('link', { name: /Main page/i });

    act(() => {
      fireEvent.click(linkElement);
    });

    expect(window.location.pathname).toBe('/planets');
  });
});

describe('Detais Planet Component', () => {
  const testProps = {
    onClick: (index = 1) => {
      console.log(index);
    },
    name: 'test-name',
    climate: 'test-climate',
    diameter: 'test-diametr',
    gravity: 'test-gravity',
    terrain: 'test-terrain',
    rotation_period: 'test-rotation',
    orbital_period: 'test-orbital',
  };

  it('renders loading text', () => {
    render(
      <BrowserRouter>
        <PlanetDetails {...testProps} />
      </BrowserRouter>
    );

    expect(screen.getByText(/test-name/i)).toBeInTheDocument();
    expect(screen.getByText(/test-climate/i)).toBeInTheDocument();
    expect(screen.getByText(/test-diametr/i)).toBeInTheDocument();
    expect(screen.getByText(/test-gravity/i)).toBeInTheDocument();
    expect(screen.getByText(/test-terrain/i)).toBeInTheDocument();
    expect(screen.getByText(/test-rotation/i)).toBeInTheDocument();
    expect(screen.getByText(/test-orbital/i)).toBeInTheDocument();
  });

  it('has the correct class names', () => {
    render(
      <BrowserRouter>
        <PlanetDetails {...testProps} />
      </BrowserRouter>
    );
    const loadingDiv = screen.getByTestId('planet__details');
    expect(loadingDiv).toHaveClass('planet__details');
  });

  it('changes the route when Link is clicked', () => {
    render(
      <BrowserRouter>
        <PlanetDetails {...testProps} />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole('link', { name: /X/i });

    act(() => {
      fireEvent.click(linkElement);
    });

    expect(window.location.pathname).toBe('/planets');
  });
});
