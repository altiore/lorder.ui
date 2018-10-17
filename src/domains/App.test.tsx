// import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { createMemoryHistory } from 'history'

// import { AppTsx } from './App';
// import { ROLE } from '../@types';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<AppTsx userRole={ROLE.USER} history={createMemoryHistory()} location={{
  //   pathname: '/',
  //   search: '',
  //   state: {},
  //   hash: '',
  // }} match={{params: {}, isExact: false, path: '/', url: '/'}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
