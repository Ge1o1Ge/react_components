import { ReactNode, createContext, useReducer } from 'react';
import { Action, State } from '../types';

const initialState: State = {
  data: null,
  searchQuery: localStorage.getItem('searchUrl') || '',
  mounted: false,
  page: 1,
  loading: false,
  sucsess: true,
  pageError: undefined,
};

const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SetSearchValue':
      return { ...state, searchQuery: action.payload };
    case 'SetItemList':
      return { ...state, data: action.payload };
    case 'SetMounted':
      return { ...state, mounted: action.payload };
    case 'SetPage':
      return { ...state, page: action.payload };
    case 'SetLoading':
      return { ...state, loading: action.payload };
    case 'SetSucsess':
      if (action.payload === true) {
        return { ...state, sucsess: action.payload, pageError: undefined };
      } else {
        return { ...state, sucsess: action.payload };
      }
    case 'SetPageError':
      return { ...state, pageError: action.payload };

    default:
      return state;
  }
};

const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    appReducer,
    initialState
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
