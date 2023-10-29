import { ResponsePlanetsType } from '../types';

export default class ReqvestApi {
  static Response: ResponsePlanetsType;
  static SearchKey = localStorage.getItem('searchUrl') || '';
  static url = `https://swapi.dev/api/planets${ReqvestApi.SearchKey ?`?search=${ReqvestApi.SearchKey}`:''}`;

  static async getResponse() {

    console.log(ReqvestApi.url)
    // localStorage.setItem('searchUrl', searchKey);
    return fetch(ReqvestApi.url)
      .then((response) => response.json())
      .then((data: ResponsePlanetsType) => {
        console.log(data);
        this.Response = data;
        return this.Response;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
