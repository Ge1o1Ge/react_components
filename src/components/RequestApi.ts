import { ResponsePlanetsType } from '../types';

export default class ReqvestApi {
  static Response: ResponsePlanetsType;
  static SearchKey = localStorage.getItem('searchUrl') || '';
  static url = `https://swapi.dev/api/planets${
    ReqvestApi.SearchKey ? `?search=${ReqvestApi.SearchKey}` : ''
  }`;

  static async getResponse(searchQuery = '', page = 1, limit = 10) {
    ReqvestApi.SearchKey = localStorage.getItem('searchUrl') || '';
    ReqvestApi.url = `https://swapi.dev/api/planets?limit=${limit}&page=${page}${
      searchQuery ? `&search=${searchQuery}` : ''
    }`;

    if (ReqvestApi.url.indexOf('ErrorCatch') !== -1) {
      return fetch('https://swapi.dev/api/plaff')
        .then((response) => response.json())
        .then(() => {})
        .catch((error) => {
          console.error(error);
          throw error;
        });
    }
    // localStorage.setItem('searchUrl', searchKey);
    return fetch(ReqvestApi.url)
      .then((response) => response.json())
      .then((data: ResponsePlanetsType) => {
        this.Response = data;
        return this.Response;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}
