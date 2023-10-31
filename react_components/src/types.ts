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
    loading: boolean
  }
