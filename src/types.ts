export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type ResponsePlanetsType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

export interface State {
  data: null | ResponsePlanetsType;
  searchQuery: string;
  mounted: boolean;
  page: number;
  loading: boolean;
  sucsess: boolean;
  pageError: undefined | Error;
}

export type CatchError = {
  catchError: boolean;
  mounted: boolean;
};

// export type ContextState = {
//   searchValue: string;
//   itemList: Planet[];
//   isLoading: boolean;
// };

export type Action =
  | { type: 'SetSearchValue'; payload: string }
  | { type: 'SetItemList'; payload: null | ResponsePlanetsType }
  | { type: 'SetLoading'; payload: boolean }
  | { type: 'SetPage'; payload: number }
  | { type: 'SetLoading'; payload: boolean }
  | { type: 'SetSucsess'; payload: boolean }
  | { type: 'SetPageError'; payload: undefined | Error }
  | { type: 'SetMounted'; payload: boolean };
