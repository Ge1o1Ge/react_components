import { act, fireEvent, render, screen } from '@testing-library/react';
import Loader from './components/Loader';
import '@testing-library/jest-dom';
import ErrorPage from './components/ErrorPage';
import { BrowserRouter } from 'react-router-dom';
import PlanetDetails from './components/PlanetDetails';
import PlanetCard from './components/PlanetCards';
import BodyResults from './components/BodyResults';
import ErrorBoundry from './components/ErrorBoundry';

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
    const div = screen.getByTestId('Error__page');
    expect(div).toHaveClass('Error__page');
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

  it('renders planet text', () => {
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
    const div = screen.getByTestId('planet__details');
    expect(div).toHaveClass('planet__details');
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

describe('Detais Planet Component', () => {
  const testProps = {
    onClick: (index = 1) => {
      console.log(index);
    },
    name: 'test-name',
    index: 1,
  };

  it('renders planet text', () => {
    render(
      <BrowserRouter>
        <PlanetCard clickedPlanet={0} {...testProps} />
      </BrowserRouter>
    );

    expect(screen.getByText(/test-name/i)).toBeInTheDocument();
  });

  it('has the correct class names', () => {
    render(
      <BrowserRouter>
        <PlanetCard clickedPlanet={0} {...testProps} />
      </BrowserRouter>
    );
    const div = screen.getByTestId('planet__card');
    expect(div).toHaveClass('planet__card');
  });

  it('changes the route when Link is clicked', () => {
    render(
      <BrowserRouter>
        <PlanetCard clickedPlanet={0} {...testProps} />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole('link', { name: /See Details/i });

    act(() => {
      fireEvent.click(linkElement);
    });

    expect(window.location.pathname).toBe('/planets');
  });
});

describe('Results list', () => {
  it('renders Results container', () => {
    render(
      <BrowserRouter>
        <BodyResults />
      </BrowserRouter>
    );

    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });

  it('has the correct class names', () => {
    render(
      <BrowserRouter>
        <BodyResults />
      </BrowserRouter>
    );
    const div = screen.getByTestId('results');
    expect(div).toHaveClass('results');
  });

  it('changes the route when Pgination is clicked', () => {
    render(
      <BrowserRouter>
        <BodyResults />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole('button', { name: />/i });

    act(() => {
      fireEvent.click(linkElement);
    });

    expect(window.location.pathname).toBe('/planets');
  });
});

describe('Error boundry component', () => {
  it('renders normal ellement', () => {
    render(
      <BrowserRouter>
        <ErrorBoundry>
          <div>Works</div>
        </ErrorBoundry>
      </BrowserRouter>
    );

    expect(screen.getByText(/Works/i)).toBeInTheDocument();
  });

  // it('renders error ellement', () => {
  //   act(() => {
  //     const ErrorComponent = () => {
  //       throw new Error('Test error');
  //     };
  //     render(
  //       <ErrorBoundry>
  //         <ErrorComponent />
  //       </ErrorBoundry>
  //     );
  //   });

  //   expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  // });
});
