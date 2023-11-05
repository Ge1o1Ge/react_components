import React from 'react';
import { CatchError } from '../types';

class ErrorBoundry extends React.Component<
  React.PropsWithChildren<object>,
  CatchError
> {
  constructor(props: React.PropsWithChildren<object>) {
    super(props);
    this.state = { catchError: false, mounted: false };

    window.addEventListener('storageChanged', () => {
      if (this.state.mounted) {
        this.resetError();
      }
    });
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Ошибка при загрузке данных 2', error);
    return { catchError: true };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  componentDidCatch(error: Error) {
    // Метод вызывается при возникновении ошибки
    console.error('Ошибка при загрузке данных NEN:', error);
    this.setState({ catchError: true }); // Сбрасываем состояние ошибки
  }

  resetError = () => {
    this.setState({ catchError: false });
  };

  render() {
    const { catchError } = this.state;
    const { children } = this.props;
    if (catchError) {
      return (
        <div className="error">
          <img className="loading-animation__img" src="404.gif" alt="error" />
          <p className="loading-animation__text">
            {`Error :(`} <span>Something went wrong</span>
          </p>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundry;
