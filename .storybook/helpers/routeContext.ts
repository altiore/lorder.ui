import { createMemoryHistory } from 'history';

export const routeContext = {
  history: createMemoryHistory(),
  location: { hash: '', pathname: '', search: '', state: {} },
  match: { params: [], isExact: false, path: '', url: '' },
  staticContext: undefined,
};
